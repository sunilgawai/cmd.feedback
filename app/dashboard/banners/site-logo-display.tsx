"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAppLogo } from "@/app/actions";

export default function DisplayAppLogo() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getAppLogo();
        if (image && image.image) {
          // The image is already a base64 string, so we can use it directly
          setImageUrl(`data:image/png;base64,${image.image}`);
        } else {
          setError("Failed to find logo");
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchImage();
  }, []);

  if (!imageUrl) {
    return <div className="mx-auto text-center">Loading Logo</div>;
  }

  if (error) {
    return <div className="mx-auto text-center text-red-500">{error}</div>;
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
