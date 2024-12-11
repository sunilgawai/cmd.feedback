"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getHeroImage } from "@/app/actions";

export default function HeroImageDisplay() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getHeroImage();
        if (image && image.image) {
          // The image is already a base64 string, so we can use it directly
          setImageUrl(`data:image/png;base64,${image.image}`);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchImage();
  }, []);

  if (!imageUrl) {
    return (
      <Image
        src="/hero_md.webp"
        alt="Hero"
        width={200}
        height={200}
        className="w-1/3 mx-auto"
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="Hero"
      width={200}
      height={200}
      className="w-1/3 mx-auto"
    />
  );
}
