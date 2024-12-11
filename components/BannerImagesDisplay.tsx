"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { getBannerImages } from "@/app/actions";

export default function BannerImagesDisplay() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const bannerImages = await getBannerImages();
        if (bannerImages && bannerImages.images) {
          const urls = bannerImages.images.map(
            (img) => `data:image/png;base64,${img.image}`
          );
          setImageUrls(urls);
        }
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchImages();
  }, []);

  if (imageUrls.length === 0) {
    return <div>No banner images uploaded yet.</div>;
  }

  return (
    <Fragment>
      {/* <div className="flex flex-col gap-8">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Banner ${index + 1}`}
            width={200}
            height={200}
            className="w-full h-auto object-cover rounded-lg"
          />
        ))}
      </div> */}
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
            {imageUrls.map((url, index) => (
              <Fragment>
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          key={index}
                          src={url}
                          alt={`Banner ${index + 1}`}
                          width={200}
                          height={300}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          key={index}
                          src={url}
                          alt={`Banner ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </Fragment>
            ))}
          </CarouselContent>
          {/* <CarouselContent className="-ml-1">
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
          </CarouselContent> */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Card>
    </Fragment>
  );
}
