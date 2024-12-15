import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processBulkEmailJob } from "./process";
import { auth } from "@/app/auth";

// export async function POST(request) {
//   try {
//     const { user } = await auth();
//     const body = await request.json();
//     const { emails } = body;

//     if (!emails || !Array.isArray(emails)) {
//       return NextResponse.json(
//         { error: "Invalid email list provided" },
//         { status: 400 }
//       );
//     }

//     // Create bulk email job
//     const bulkEmailJob = await prisma.bulkEmailJob.create({
//       data: {
//         userId: user.id as string,
//         totalEmails: emails.length,
//         status: "PROCESSING",
//       },
//     });

//     // Start background processing
//     processBulkEmails(bulkEmailJob.id, emails);

//     return NextResponse.json({ jobId: bulkEmailJob.id }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating bulk email job:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  try {
    const {user} = await auth();
    const body = await req.json();
    const { emails, fileOriginalName, userId } = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: "Invalid email list provided" },
        { status: 400 }
      );
    }

    // Create a new job
    const job = await prisma.bulkEmailJob.create({
      data: {
        userId: user.id as string,
        totalEmails: emails.length,
        fileOriginalName,
        jobResults: {
          create: emails.map((email) => ({
            email,
            status: "PENDING",
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Job created successfully", jobId: job.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating bulk email job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const bulkEmailJob = await prisma.bulkEmailJob.findUnique({
      where: { id: jobId },
      include: {
        jobResults: true,
      },
    });

    if (!bulkEmailJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(bulkEmailJob, { status: 200 });
  } catch (error) {
    console.error("Error fetching bulk email job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
