import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
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

export default function Home() {
  return (
    <div className="min-h-screen px-40 grid place-content-center">
      {/* Header */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
          <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width="72"
                    height="56"
                    patternUnits="userSpaceOnUse"
                    x="-12"
                    y="4"
                  >
                    <path d="M.5 56V.5H72" fill="none" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 animate-fade-in">
              <span className="font-semibold">New Release</span> - v1.0.0 is
              here
            </Badge>
            <h1 className="mb-10 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-800 sm:text-7xl">
              Restaurant POS software made simple!
            </h1>
            <p className="mb-10 text-xl text-muted-foreground">
              Manages all your restaurant operations efficiently so that you can
              focus on growing your brand, like a real boss!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/onboard">
                <RainbowButton>
                  Becom a Member 🚀
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </RainbowButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4">
        <BannerImagesDisplay />
        {/* Categories Section */}
        <section className="py-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-serif">OUR CATEGORIES</h2>
            <span>02</span>
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
                  href="/"
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  <span>{item}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
            <div className="relative aspect-square rounded-full overflow-hidden">
              <Image
                src="/hero_md.webp"
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
                    src="/hero_md.webp"
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
