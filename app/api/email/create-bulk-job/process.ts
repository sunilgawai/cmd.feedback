import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Email sending worker
export async function processBulkEmailJob() {
  const job = await prisma.bulkEmailJob.findFirst({
    where: { status: "PENDING" },
    include: { jobResults: true },
  });

  if (!job) return; // No jobs to process

  // Update job status to PROCESSING
  await prisma.bulkEmailJob.update({
    where: { id: job.id },
    data: { status: "PROCESSING" },
  });

  const BATCH_SIZE = 5;
  const DELAY_MS = 2000;

  try {
    for (let i = 0; i < job.jobResults.length; i += BATCH_SIZE) {
      const batch = job.jobResults.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map(async (result) => {
          try {
            await transporter.sendMail({
              from: process.env.DEVELOPER_EMAIL,
              to: result.email,
              subject: "Welcome to Our Platform",
              html: `<h1>Welcome Aboard!</h1><p>We're thrilled to have you join us.</p>`,
            });

            // Update email result status
            await prisma.bulkEmailResult.update({
              where: { id: result.id },
              data: {
                status: "SENT",
                sentAt: new Date(),
              },
            });
          } catch (error) {
            console.error(`Failed to send email to ${result.email}:`, error);

            await prisma.bulkEmailResult.update({
              where: { id: result.id },
              data: {
                status: "FAILED",
                errorMessage: error.message,
              },
            });
          }
        })
      );

      // Add delay between batches
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }

    // Mark job as completed
    await prisma.bulkEmailJob.update({
      where: { id: job.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        sentEmails: job.jobResults.filter((r) => r.status === "SENT").length,
        failedEmails: job.jobResults.filter((r) => r.status === "FAILED")
          .length,
      },
    });
  } catch (error) {
    console.error("Error processing bulk email job:", error);
    await prisma.bulkEmailJob.update({
      where: { id: job.id },
      data: { status: "FAILED" },
    });
  }
}

// Schedule worker execution
setInterval(processBulkEmailJob, 10000); // Check every 10 seconds
