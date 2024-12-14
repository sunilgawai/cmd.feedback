// Import necessary modules
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";

// Create a new bulk email job
export async function POST(request) {
  try {
    const userId = (await auth()).user;

    const { totalEmails, fileOriginalName } = await request.json();

    if (!userId || !totalEmails || !fileOriginalName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.bulkEmailJob.create({
      data: {
        userId,
        totalEmails,
        fileOriginalName,
      },
    });

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error("Error creating bulk email job:", error);
    return NextResponse.json(
      { error: "Failed to create bulk email job" },
      { status: 500 }
    );
  }
}

// Retrieve all bulk email jobs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    const jobs = await prisma.bulkEmailJob.findMany({
      where: {
        ...(userId && { userId: userId }),
        ...(status && { status: status }),
      },
      include: { user: true },
    });

    return NextResponse.json({ success: true, data: jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bulk email jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch bulk email jobs" },
      { status: 500 }
    );
  }
}
