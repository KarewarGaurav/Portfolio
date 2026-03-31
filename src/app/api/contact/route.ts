import { NextResponse } from 'next/server';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getFirebaseDb() {
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase Admin credentials');
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  return getFirestore();
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = getFirebaseDb();
    const data = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      source: 'portfolio-contact-form',
    };

    await db.collection('contactMessages').add(data);

    return NextResponse.json({ message: 'Message saved successfully', data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown contact API error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
