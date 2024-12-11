import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image || !Array.isArray(image)) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const heroImage = await prisma.logoImage.create({
      data: {
        image: Buffer.from(image),
      },
    });

    return NextResponse.json({ id: heroImage.id, heroImage }, { status: 201 });
  } catch (error) {
    console.error("Error storing image:", error);
    return NextResponse.json(
      { error: "Failed to store image" },
      { status: 500 }
    );
  }
}
