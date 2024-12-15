import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || "587"),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export async function processBulkEmails(
  jobId: string,
  emailAddresses: string[]
) {
  let sentCount = 0;
  let failedCount = 0;

  for (const email of emailAddresses) {
    try {
      await transporter.sendMail({
        from: process.env.DEVELOPER_EMAIL,
        to: email,
        subject: "Welcome to Our Platform",
        html: `<h1>Welcome Aboard!</h1><p>We're thrilled to have you join us.</p>`,
      });

      await prisma.bulkEmailResult.create({
        data: { jobId, email, status: "SENT", sentAt: new Date() },
      });
      sentCount++;
    } catch (error) {
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

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

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
