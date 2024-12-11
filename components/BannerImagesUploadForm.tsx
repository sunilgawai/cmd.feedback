"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function BannerImagesUploadForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("images") as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const imagesData = await Promise.all(files.map(fileToBytes));

      try {
        const response = await fetch("/api/banners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            images: imagesData.map((data) => Array.from(data)),
          }),
        });

        if (response.ok) {
          toast.success("Banner images uploaded successfully!");
          form.reset();
        } else {
          throw new Error("Failed to upload banner images");
        }
      } catch (error) {
        toast.error("Failed to upload banner images. Please try again.");
        console.error("Error uploading banner images:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fileToBytes = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(event.target.result));
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="file"
        name="images"
        accept="image/*"
        multiple
        required
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload Banner Images"}
      </Button>
    </form>
  );
}
