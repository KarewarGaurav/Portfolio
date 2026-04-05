import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      message: 'Contact API is running',
      method: 'Use POST to submit contact form data',
    },
    { status: 200 }
  );
}

async function getFirebaseDb() {
  const { cert, getApps, initializeApp } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('Missing Firebase Admin credentials');
  }

  if (getApps().length === 0) {
    const sanitizedPrivateKey = process.env.FIREBASE_PRIVATE_KEY
      .trim()
      .replace(/^"|"$/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\r/g, '');

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: sanitizedPrivateKey,
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

    const db = await getFirebaseDb();
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
