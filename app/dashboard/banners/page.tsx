"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { TeamListSkeleton } from "@/components/teams";
import { Suspense, useState, useEffect } from "react";
import { CreateDialog } from "@/components/create-dialog";
import NotificationForm from "@/components/forms/notification-form";
import { FileUploadExample } from "@/components/examples/file-upload-example";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BannerUpload } from "./banner-upload";
import BannersForm from "../customers/form/banners-form";

export default function BannersPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Banners</h1>
        <CreateDialog
          title="Create Notification"
          description="Create your notification here"
          form={NotificationForm}
        />
      </div>
      <BannersForm />
      <div className="flex items-center justify-center text-2xl font-semibold">
        <h1>Current Banner</h1>
      </div>
      <Card className="w-full grid place-content-center gap-4 py-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          setApi={setApi}
          className="w-full max-w-2xl"
        >
          <CarouselContent className="-ml-1">
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))} */}
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Card>
    </div>
  );
}
