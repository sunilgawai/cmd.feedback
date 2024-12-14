import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/sections/Footer";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BannerImagesDisplay from "@/components/BannerImagesDisplay";
import Header from "@/sections/Header";
import BackgroundDecoration from "@/sections/background-decoration";
import Hero from "@/sections/hero";
import AppCarousel from "@/components/AppCarousel";

export default function Home() {
  return (
    <div className="min-h-screen px-40 grid place-content-center">
      {/* Header */}
      <Header />
      <BackgroundDecoration />
      <Hero />
      <AppCarousel />

      <main className="container mx-auto px-4">
        {/* <BannerImagesDisplay /> */}
        {/* Categories Section */}
        <section className="py-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-serif">GALLERY</h2>
            <p className="text-2xl font-serif">
              VISIONS UNLEASHED, STORIES CAPTURED
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                "Adraki Kebab, Lamb and Beef",
                "White Beans stew with lamb shank",
                "Karahi With Lamb Sauce (Salsa)",
                "Green Beans with lamb shank",
                "Stuffed green leaves with lamb shank",
              ].map((item, index) => (
                <Link
                  key={index}
                  href="/gallery/1.png"
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  <span>{item}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/gallery/1.png"
                alt="Category food"
                width={600}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section className="py-20">
          <h2 className="text-5xl text-center md:text-6xl font-serif mb-12">
            EXPLORE REAL TASTE
          </h2>
          <p className="text-lg text-center mb-12">
            We offer a variety of homemade pastries and sweets, including the
            almond-topped semolina
            <br />
            cakes called harissa and the indulgent kunafa topped with
            pistachios.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Hearty breakfast", "Fresh Salad", "For vegetarian"].map(
              (title, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-full overflow-hidden"
                >
                  <Image
                    src="/gallery/4.png"
                    alt={title}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <h2 className="text-5xl md:text-6xl font-serif text-center mb-12">
            LET'S CONNECT WITH US
          </h2>
          <div className="flex justify-center space-x-4">
            <Input
              type="email"
              placeholder="Enter your e-mail"
              className="max-w-xs rounded-full"
            />
            <Button variant="secondary" className="rounded-full">
              Subscribe Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
