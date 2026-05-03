import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

/** Writable on serverless / read-only image roots; cwd is often not writable in production. */
const VISITOR_FILE_PATH = path.join(tmpdir(), 'portfolio-web-visitors.json');

type VisitorStore = {
  count: number;
  ips: string[];
};

function getEnvVar(name: string) {
  return process.env[name]?.replace(/^"|"$/g, '').trim();
}

async function getFirebaseDbOrNull() {
  const projectId = getEnvVar('FIREBASE_PROJECT_ID');
  const clientEmail = getEnvVar('FIREBASE_CLIENT_EMAIL');
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const hasCredentials = Boolean(projectId) && Boolean(clientEmail) && Boolean(privateKey);

  if (!hasCredentials) return null;

  try {
    const { cert, getApps, initializeApp } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    if (getApps().length === 0) {
      let sanitizedPrivateKey = privateKey!
        .trim()
        .replace(/^"|"$/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\r/g, '');

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

function aggregateCountToNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value !== '') return Number(value) || 0;
  if (value != null && typeof value === 'object' && 'toNumber' in value && typeof (value as { toNumber: () => number }).toNumber === 'function') {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value) || 0;
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

async function persistVisitorStore(store: VisitorStore): Promise<void> {
  try {
    await writeVisitorStore(store);
  } catch (err) {
    console.warn('Visitor count file write failed (read-only or quota):', err instanceof Error ? err.message : String(err));
  }
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
        const col = db.collection('visitors');
        await col.doc(ip).set(
          {
            ip,
            lastVisited: new Date().toISOString(),
          },
          { merge: true }
        );

        const visitorsSnapshot = await col.count().get();
        const count = aggregateCountToNumber(visitorsSnapshot.data().count);

        return NextResponse.json({ count });
      } catch (dbError) {
        console.warn('Firestore fallback triggered:', dbError instanceof Error ? dbError.message : String(dbError));
      }
    }

    // File fallback (tmp dir — works on many serverless / container hosts)
    try {
      const visitorStore = await readVisitorStore();
      const uniqueIps = new Set(visitorStore.ips);
      uniqueIps.add(ip);
      const count = uniqueIps.size;
      
      // We don't await this to avoid blocking the response if it fails
      persistVisitorStore({ count, ips: Array.from(uniqueIps) }).catch(err => {
        console.warn('Silent persistence failure:', err);
      });
      
      return NextResponse.json({ count });
    } catch (fallbackError) {
      console.error('Visitor fallback failed:', fallbackError);
      return NextResponse.json({ count: 1 }); // Return a default value instead of 500
    }
  } catch (error) {
    console.error('Top level visitor API error:', error);
    return NextResponse.json({ count: 1 }); // Always return something valid to the UI
  }
}

