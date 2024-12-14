"use server";

import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

// This should be set up in your Vercel environment variables
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export async function createBulkEmailJob(emails: string[]) {

  // Create bulk email job record
  const bulkEmailJob = await prisma.bulkEmailJob.create({
    data: {
      userId:"",
      totalEmails: emails.length,
      status: "PROCESSING",
    },
  });

  // Start background processing
  processBulkEmails(bulkEmailJob.id, emails);

  return bulkEmailJob.id;
}
async function processBulkEmails(jobId: string, emailAddresses: string[]) {
  let sentCount = 0;
  let failedCount = 0;

  for (const email of emailAddresses) {
    try {
      await transporter
        .sendMail({
          from: process.env.DEVELOPER_EMAIL,
          to: email,
          subject: "Welcome to Our Platform",
          text: "Thank you for joining us! We're excited to have you on board.",
          html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1>Welcome Aboard!</h1>
                <p>We're thrilled to have you join our community.</p>
                <p>Stay tuned for more updates and exciting opportunities.</p>
              </div>
            `,
        })
        .then((email_response) => {
          console.log(`Email sent to ${email}:`, email_response);
        });

      // Record successful email
      await prisma.bulkEmailResult.create({
        data: {
          jobId,
          email,
          status: "SENT",
          sentAt: new Date(),
        },
      });

      sentCount++;
    } catch (error) {
      console.log("Error sending email",error)
      // Record failed email
      await prisma.bulkEmailResult.create({
        data: {
          jobId,
          email,
          status: "FAILED",
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        },
      });

      failedCount++;
    }

    // Add delay between emails
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Update job status
  await prisma.bulkEmailJob.update({
    where: { id: jobId },
    data: {
      status: sentCount === emailAddresses.length ? "COMPLETED" : "FAILED",
      sentEmails: sentCount,
      failedEmails: failedCount,
      completedAt: new Date(),
    },
  });
}

// Function to retrieve job status
export async function getBulkEmailJobStatus(jobId: string) {
  return await prisma.bulkEmailJob.findUnique({
    where: { id: jobId },
    include: {
      jobResults: true,
    },
  });
}

export async function parseFileAndSendEmails(customer_emails: string[]) {
  try {
    console.log("customer_emails", customer_emails);
    // Add email validation

    console.log("validEmailAddresses", customer_emails);
    // Limit batch size to prevent potential SMTP throttling
    const BATCH_SIZE = 5;
    for (let i = 0; i < customer_emails.length; i += BATCH_SIZE) {
      const batch = customer_emails.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map((email) =>
          transporter
            .sendMail({
              from: process.env.DEVELOPER_EMAIL,
              to: email,
              subject: "Welcome to Our Platform",
              text: "Thank you for joining us! We're excited to have you on board.",
              html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1>Welcome Aboard!</h1>
                <p>We're thrilled to have you join our community.</p>
                <p>Stay tuned for more updates and exciting opportunities.</p>
              </div>
            `,
            })
            .then((email_response) => {
              console.log(`Email sent to ${email}:`, email_response);
            })
        )
      );
    }

    return {
      success: true,
      message: `Emails sent to ${customer_emails.length} valid recipients`,
    };
  } catch (error) {
    console.error("Detailed email sending error:", error);
    return {
      success: false,
      message: "An error occurred while processing and sending emails",
    };
  }
}
