"use client";
import { Fragment } from "react";
import Image from "next/image";
import { PinContainer } from "@/components/ui/3d-pin";
import Marquee from "@/components/ui/marquee";

const images = [
  "/slider/1.png",
  "/slider/2.png",
  "/slider/3.png",
  "/slider/4.png",
  //   "/slider/5.png",
];

export default function AppPrevileges() {
  return (
    <section className="py-20">
      <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
        Start Anise Privileges
      </h2>
      <p className="text-lg text-center mb-12">
        We offer a variety of homemade pastries and sweets, including the
        almond-topped semolina
        <br />
        cakes called harissa and the indulgent kunafa topped with pistachios.
      </p>
      <Marquee pauseOnHover className="[--duration:30s]">
        {images.map((url, i) => (
          <div className="flex justify-center flex-col items-center">
            <Image
              src={url}
              alt={`Banner ${i + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto max-h-[25vh] object-contain rounded-3xl"
              priority={i === 0}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Free Subscription & Offers
              </h3>
              <p className="text-gray-600 mb-3">
                On 100+ Premium Online and Offline Brands Gift Vouchers
              </p>
              <p className="text-gray-600 mb-3">
                Discount to be paid by VITS Points
              </p>
              <p className="text-gray-600">1 VITS Star = ₹ 1</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}