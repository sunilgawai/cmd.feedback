"use client";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useState, useEffect } from "react";
import { CreateDialog } from "@/components/create-dialog";
import HeroImageForm from "@/components/forms/hero-image-form";
import SiteLogoForm from "@/components/forms/site-logo-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getBannerImages, getHeroImage } from "@/app/actions";
import HeroImageDisplay from "./hero-image-display";
import DisplayAppLogo from "./site-logo-display";
import BannerImagesUploadForm from "@/components/BannerImagesUploadForm";
import BannerImagesDisplay from "@/components/BannerImagesDisplay";

export default function BannersPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getHeroImage().then((image) => {
      console.log("hero image", image);
    });
    getBannerImages().then((banners) => {
      console.log("banners", banners);
    });
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-16 my-4">
        <h1 className="text-3xl font-bold">Your Site Logo</h1>
        <DisplayAppLogo />
        <CreateDialog
          buttonText="Upload New"
          title="Upload New"
          description="Upload your new Logo here"
          form={SiteLogoForm}
        />
      </div>
      <div className="grid grid-cols-1 gap-16 my-4">
        <h1 className="text-3xl font-bold">Your Hero Image</h1>
        <HeroImageDisplay />
        <CreateDialog
          buttonText="Upload New"
          title="Upload New"
          description="Upload your new hero image here"
          form={HeroImageForm}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Banners</h1>
        <CreateDialog
          title="Create Notification"
          description="Create your notification here"
          form={BannerImagesUploadForm}
        />
      </div>
      <BannerImagesDisplay />
      {/* <BannersForm /> */}
    </div>
  );
}
