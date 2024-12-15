import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  const job = await prisma.bulkEmailJob.findUnique({
    where: { id: jobId },
    include: { jobResults: true },
  });
  console.log("job", job);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: job.id,
    status: job.status,
    totalEmails: job.totalEmails,
    sentEmails: job.sentEmails,
    failedEmails: job.failedEmails,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
  });
}
