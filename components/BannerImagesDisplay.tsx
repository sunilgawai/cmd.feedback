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
      <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
        EXPLORE REAL TASTE 🍪
      </h2>
      <p className="text-lg text-center mb-12">
        We offer a variety of homemade pastries and sweets, including the
        almond-topped semolina
        <br />
        cakes called harissa and the indulgent kunafa topped with pistachios.
      </p>
      <Card className="w-full grid place-content-center border-none gap-4 py-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          setApi={setApi}
          className="w-full space-x-4 max-w-4xl"
        >
          <CarouselContent className="-ml-1">
            {imageUrls.map((url, index) => (
              <Fragment>
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 mx-8">
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
                {/* <CarouselItem
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
                </CarouselItem> */}
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
