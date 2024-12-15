import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a type for the request body
interface EmailRequest {
  emails: string[];
  subject: string;
  body: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { emails, subject, body } = (await request.json()) as EmailRequest;

    // Create a Nodemailer transporter (replace with your email configuration)
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "delilah.cremin@ethereal.email",
        pass: "kRsWqVM9rjWkZQNvyW",
      },
    });
    // Send emails to all addresses
    const emailPromises = emails.map(async (email) => {
      return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: body,
      }).then((res) => console.log("res",res))
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises)

    return NextResponse.json(
      {
        success: true,
        message: `Emails sent to ${emails.length} recipients`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emails",
      },
      { status: 500 }
    );
  }
}
