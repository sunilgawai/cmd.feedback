import { Resend } from "resend";
import SubscriptionEmail from "@/emails/subscription-email";
import { siteConfig } from "@/config/site";
import * as React from "react";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.devmail.email",
  port: 465,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "star-anise",
    pass: "BZCxLXF7tkx3Rqikjel3",
  },
});

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Generic email sending function
export async function sendEmail<T extends Record<string, unknown>>({
  to,
  subject,
  template: EmailTemplate,
  props,
}: {
  to: string;
  subject: string;
  template: React.ComponentType<T>;
  props: T;
}) {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject,
      react: React.createElement(EmailTemplate, props),
    });

    console.log("data", data);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  password: string
) {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to VITS Passport Plus",
    html: `
      <h1>Welcome to VITS Passport Plus, ${name}!</h1>
      <p>Thank you for joining our loyalty program. Your account has been created successfully.</p>
      <p>You can log in to your account using the following credentials:</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Please click the link below to log in to your account:</p>
      <a href="${loginUrl}">Log in to your account</a>
      <p>We recommend changing your password after your first login.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,</p>
      <p>The VITS Passport Plus Team</p>
    `,
  };

  try {
    // await resend.emails
    //   .send(mailOptions)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // .sendMail(mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
}
