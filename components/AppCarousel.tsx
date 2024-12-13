"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useState, useEffect } from "react";
import { getBannerImages } from "@/app/actions";
import Image from "next/image";

const AppCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
    <Fragment>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl flex flex-col gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="w-full grid place-content-center gap-4 py-4 border-none">
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
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="relative w-64 h-64">
                            <Image
                              height={100}
                              width={100}
                              src={url}
                              alt={`Banner ${index + 1}`}
                              className="object-cover"
                            />
                            {/* <span className="text-2xl font-semibold">
                            {index + 1}
                            </span> */}
                          </div>
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
      </div>
    </Fragment>
  );
};

export default AppCarousel;
