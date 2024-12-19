"use server";

import nodemailer from "nodemailer";
import { sendInvitationEmailWithVoucher } from "@/lib/emails";

// This should be set up in your Vercel environment variables
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});


export async function sendBulkEmails(
  emails: string[],
  voucherId: string,
  voucherDetails: { code: string; description: string }
) {
  const emailPromises = emails.map(async (email) => {
    try {
      await sendInvitationEmailWithVoucher(email, voucherDetails);
      console.log(`Invitation email sent successfully to ${email}`);
    } catch (error) {
      console.error(`Error sending invitation email to ${email}:`, error);
    }
  });

  await Promise.all(emailPromises);
}


