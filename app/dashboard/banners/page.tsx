"use client";
import { CreateDialog } from "@/components/create-dialog";
import BannerImagesUploadForm from "@/components/BannerImagesUploadForm";
import BannerImagesDisplay from "@/components/BannerImagesDisplay";

export default function BannersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Banners</h1>
        <CreateDialog
          title="Create Notification"
          description="Create your notification here"
          form={BannerImagesUploadForm}
        />
      </div>
      <BannerImagesDisplay />
    </div>
  );
}
