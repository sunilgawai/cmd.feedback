import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { images } = await request.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const bannerImages = await prisma.bannerImages.create({
      data: {
        images: {
          create: images.map((imageData: number[]) => ({
            image: Buffer.from(imageData),
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      { id: bannerImages.id, imageCount: bannerImages.images.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing banner images:", error);
    return NextResponse.json(
      { error: "Failed to store banner images" },
      { status: 500 }
    );
  }
}
