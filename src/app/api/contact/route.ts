import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default sender for testing
      to: ['gauravkarewar724@gmail.com'],
      replyTo: email,
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <p style="margin-top: 20px;"><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 4px solid #000;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 10px;">Message:</p>
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
