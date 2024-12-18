"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, Fragment } from "react";
import Image from "next/image";

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

export default function MenuCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-20">
      <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
        EXPLORE REAL TASTE
      </h2>
      <p className="text-lg text-center mb-12">
        We offer a variety of homemade pastries and sweets, including the
        almond-topped semolina
        <br />
        cakes called harissa and the indulgent kunafa topped with pistachios.
      </p>
      <div className="w-full grid place-content-center gap-4 py-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          setApi={setApi}
          className="w-full max-w-4xl"
        >
          <CarouselContent>
            {images.map((url, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center items-center">
                  <Image
                    src={url}
                    alt={`Banner ${index + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto max-h-[70vh] object-contain rounded-3xl"
                    priority={index === 0}
                  />
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
      </div>
    </section>
  );
}
