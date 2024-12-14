"use client";
import { CreateDialog } from "@/components/create-dialog";
import BannerImagesUploadForm from "@/components/BannerImagesUploadForm";
import BannerImagesDisplay from "@/components/BannerImagesDisplay";

const images = [
  "/slider/1.png",
  "/slider/2.png",
  "/slider/3.png",
  "/slider/4.png",
  "/slider/5.png",
  "/slider/6.png",
  "/slider/7.png",
  "/slider/8.png",
  "/slider/9.png",
  "/slider/10.png",
  "/slider/1.png",
  "/slider/11.png",
  "/slider/12.png",
];
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
