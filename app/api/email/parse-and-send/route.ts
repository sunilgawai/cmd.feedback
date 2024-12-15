import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Configure the transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: parseInt(process.env.MAILTRAP_PORT || "587"),
//   auth: {
//     user: process.env.MAILTRAP_USERNAME,
//     pass: process.env.MAILTRAP_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "delilah.cremin@ethereal.email",
    pass: "kRsWqVM9rjWkZQNvyW",
  },
});


// Helper function to introduce delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req) {
  try {
    const body = await req.json();
    const { emails, userId, jobId } = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: "Invalid email list provided" },
        { status: 400 }
      );
    }

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: emails, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("info", info);

    // Fetch the BulkEmailJob for tracking
    const bulkEmailJob = await prisma.bulkEmailJob.findUnique({
      where: { id: jobId },
    });

    if (!bulkEmailJob) {
      return NextResponse.json(
        { error: "Bulk email job not found" },
        { status: 404 }
      );
    }

    // Update the job status to PROCESSING
    await prisma.bulkEmailJob.update({
      where: { id: jobId },
      data: { status: "PROCESSING" },
    });

    const BATCH_SIZE = 5;
    const DELAY_MS = 5000; // Adjust delay (e.g., 5 seconds)

    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map(async (email) => {
          let sendStatus = "PENDING";
          let errorMessage = null;

          try {
            await transporter.sendMail({
              from: process.env.DEVELOPER_EMAIL,
              to: email,
              subject: "Welcome to Our Platform",
              html: `<h1>Welcome Aboard!</h1><p>We're thrilled to have you join us.</p>`,
            });
            sendStatus = "SENT"; // Mark email as SENT
          } catch (error) {
            sendStatus = "FAILED"; // Mark email as FAILED
            errorMessage = error.message || "Unknown error"; // Capture error message
          }

          // Create a new BulkEmailResult entry for each email
          await prisma.bulkEmailResult.create({
            data: {
              jobId: jobId,
              email: email,
              status: sendStatus as any,
              errorMessage: errorMessage,
              sentAt: sendStatus === "SENT" ? new Date() : null,
            },
          });

          // Update the job's email counters
          if (sendStatus === "SENT") {
            await prisma.bulkEmailJob.update({
              where: { id: jobId },
              data: {
                sentEmails: { increment: 1 },
              },
            });
          } else {
            await prisma.bulkEmailJob.update({
              where: { id: jobId },
              data: {
                failedEmails: { increment: 1 },
              },
            });
          }
        })
      );

      // Add delay after sending a batch
      if (i + BATCH_SIZE < emails.length) {
        await delay(DELAY_MS);
      }
    }

    // Update the job status to COMPLETED once all emails are processed
    await prisma.bulkEmailJob.update({
      where: { id: jobId },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Emails sent to ${emails.length} recipients`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
