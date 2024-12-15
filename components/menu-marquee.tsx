"use client";
import { Fragment } from "react";
import Image from "next/image";
import Marquee from "./ui/marquee";

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
