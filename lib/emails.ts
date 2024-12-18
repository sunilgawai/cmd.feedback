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
      <p>The Star Anise Team</p>
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

export async function sendEmailWithVoucher(
  email: string,
  name: string,
  voucher: { code: string; description: string }
) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Special Offer from VITS Passport Plus",
    html: `
      <h1>Hello ${name},</h1>
      <p>We have a special offer just for you!</p>
      <h2>Your Voucher: ${voucher.code}</h2>
      <p>${voucher.description}</p>
      <p>To use this voucher, simply present the code during your next booking or visit.</p>
      <p>We hope you enjoy this special offer!</p>
      <p>Best regards,</p>
      <p>The Start Anise Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw new Error(`Failed to send email to ${email}`);
  }
}

export async function sendInvitationEmailWithVoucher(
  email: string,
  voucher: { code: string; description: string }
) {
  const registrationUrl = `${process.env.NEXT_PUBLIC_APP_URL}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Special Invitation to Join Star Anise Plus",
    html: `
      <h1>Hello,</h1>
      <p>We're excited to invite you to join VITS Passport Plus, our exclusive loyalty program!</p>
      <h2>Your Special Offer: ${voucher.code}</h2>
      <p>${voucher.description}</p>
      <p>To use this voucher and enjoy more benefits, please register for an account:</p>
      <a href="${registrationUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Register Now</a>
      <p>We look forward to welcoming you to Star Anise Plus!</p>
      <p>Best regards,</p>
      <p>The Star Anise Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invitation email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending invitation email to ${email}:`, error);
    throw new Error(`Failed to send invitation email to ${email}`);
  }
}
