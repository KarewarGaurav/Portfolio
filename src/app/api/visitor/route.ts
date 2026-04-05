import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const VISITOR_FILE_PATH = path.join(process.cwd(), '.visitors.json');

type VisitorStore = {
  count: number;
  ips: string[];
};

// Helper to sanitize environment variables once
const getEnvVar = (name: string) => process.env[name]?.replace(/^"|"$/g, '').trim();

const FIREBASE_CONFIG = {
  projectId: getEnvVar('FIREBASE_PROJECT_ID'),
  clientEmail: getEnvVar('FIREBASE_CLIENT_EMAIL'),
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

async function getFirebaseDbOrNull() {
  const { projectId, clientEmail, privateKey } = FIREBASE_CONFIG;
  const hasCredentials = Boolean(projectId) && Boolean(clientEmail) && Boolean(privateKey);

  if (!hasCredentials) return null;

  try {
    const { cert, getApps, initializeApp } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    if (getApps().length === 0) {
      let sanitizedPrivateKey = privateKey!
        .trim()
        .replace(/^"|"$/g, '')
        .replace(/\\n/g, '\n');
      
      if (!sanitizedPrivateKey.includes('\n')) {
        sanitizedPrivateKey = sanitizedPrivateKey
          .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
          .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----\n');
      }

      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: sanitizedPrivateKey,
        }),
      });
    }
    return getFirestore();
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
}

async function readVisitorStore(): Promise<VisitorStore> {
  try {
    const rawData = await fs.readFile(VISITOR_FILE_PATH, 'utf-8');
    const parsedData = JSON.parse(rawData) as Partial<VisitorStore>;
    const ips = Array.isArray(parsedData.ips)
      ? parsedData.ips.filter((value): value is string => typeof value === 'string')
      : [];
    return { count: ips.length, ips };
  } catch {
    return { count: 0, ips: [] };
  }
}

async function writeVisitorStore(store: VisitorStore): Promise<void> {
  await fs.writeFile(VISITOR_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    const db = await getFirebaseDbOrNull();
    if (db) {
      try {
        // FAST PATH: Start the write in parallel, don't wait for it if we just need the count
        // Using set with merge: true ensures we don't duplicate documents and don't need a .get() check
        const writePromise = db.collection('visitors').doc(ip).set({
          ip,
          lastVisited: new Date().toISOString(),
        }, { merge: true });

        // Get the current total count
        const visitorsSnapshot = await db.collection('visitors').count().get();
        const count = visitorsSnapshot.data().count;

        // Ensure the write completes before we finish if we want strict consistency, 
        // but for a portfolio counter, let's keep it fast.
        await writePromise; 

        return NextResponse.json({ count });
      } catch (dbError) {
        console.warn('Firestore fallback triggered:', dbError instanceof Error ? dbError.message : String(dbError));
      }
    }

    // LOCAL STORAGE FALLBACK
    const visitorStore = await readVisitorStore();
    const uniqueIps = new Set(visitorStore.ips);
    uniqueIps.add(ip);
    const count = uniqueIps.size;
    await writeVisitorStore({ count, ips: Array.from(uniqueIps) });
    return NextResponse.json({ count });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown visitor API error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

