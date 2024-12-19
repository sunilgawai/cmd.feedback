"use client";
import { Fragment } from "react";
import Image from "next/image";
import Marquee from "./ui/marquee";

const images = [
  "/assets/slider/1.png",
  "/assets/slider/2.png",
  "/assets/slider/3.png",
  "/assets/slider/4.png",
  "/assets/slider/5.png",
  "/assets/slider/6.png",
  "/assets/slider/7.png",
  "/assets/slider/8.png",
  "/assets/slider/9.png",
  "/assets/slider/10.png",
  "/assets/slider/1.png",
  "/assets/slider/11.png",
  "/assets/slider/13.png",
  "/assets/slider/14.png",
  "/assets/slider/15.png",
  "/assets/slider/16.png",
];

export default function MenuMarquee() {

  return (
    <Fragment>
      <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
        MEMBERSHIP BENEFITS
      </h2>
      <p className="text-lg text-center mb-12">
        We offer a variety of homemade pastries and sweets, including the
        almond-topped semolina
        <br />
        cakes called harissa and the indulgent kunafa topped with pistachios.
      </p>
      <div className="w-full grid place-content-center gap-4 py-4">
        <Marquee pauseOnHover className="[--duration:60s]">
          {images.map((url, i) => (
            <div className="flex justify-center items-center">
              <Image
                src={url}
                alt={`Banner ${i + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-auto max-h-[25vh] object-contain rounded-3xl"
                priority={i === 0}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </Fragment>
  );
}
