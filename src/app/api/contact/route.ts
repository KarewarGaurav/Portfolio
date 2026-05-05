import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // 1. Save to Firebase Firestore
    const db = await getFirebaseDb();
    const data = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      source: 'portfolio-contact-form',
    };

    await db.collection('contactMessages').add(data);

    // 2. Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gauravkarewar724@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `
        New message from your portfolio website:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
        
        Sent at: ${new Date().toLocaleString()}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0070f3;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.8em; color: #666;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message saved and email sent successfully', data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown contact API error';
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
