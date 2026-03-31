import { NextResponse } from 'next/server';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { promises as fs } from 'fs';
import path from 'path';

const VISITOR_FILE_PATH = path.join(process.cwd(), '.visitors.json');

type VisitorStore = {
  count: number;
  ips: string[];
};

function getFirebaseDbOrNull() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const hasFirebaseCredentials = Boolean(projectId) && Boolean(clientEmail) && Boolean(privateKey);

  if (!hasFirebaseCredentials) {
    return null;
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey!.replace(/\\n/g, '\n'),
      }),
    });
  }

  return getFirestore();
}

async function readVisitorStore(): Promise<VisitorStore> {
  try {
    const rawData = await fs.readFile(VISITOR_FILE_PATH, 'utf-8');
    const parsedData = JSON.parse(rawData) as Partial<VisitorStore>;
    const ips = Array.isArray(parsedData.ips)
      ? parsedData.ips.filter((value): value is string => typeof value === 'string')
      : [];
    return {
      count: ips.length,
      ips,
    };
  } catch {
    return { count: 0, ips: [] };
  }
}

async function writeVisitorStore(store: VisitorStore): Promise<void> {
  await fs.writeFile(VISITOR_FILE_PATH, JSON.stringify(store, null, 2), 'utf-8');
}

export async function GET(req: Request) {
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    const db = getFirebaseDbOrNull();
    if (db) {
      const visitorRef = db.collection('visitors').doc(ip);
      const visitorDoc = await visitorRef.get();

      if (!visitorDoc.exists) {
        await visitorRef.set({
          ip,
          visitedAt: new Date().toISOString(),
        });
      }

      const visitorsSnapshot = await db.collection('visitors').count().get();
      const count = visitorsSnapshot.data().count;
      return NextResponse.json({ count });
    }

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

