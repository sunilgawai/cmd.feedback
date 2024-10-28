"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";

export function FileUploadExample() {
  const handleUpload = async (file: File) => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Uploaded ${file.name}`);
  };

  return (
    <FileUpload
      onUpload={handleUpload}
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
    />
  );
}
