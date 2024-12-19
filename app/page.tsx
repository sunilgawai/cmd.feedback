import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import BackgroundDecoration from "@/sections/background-decoration";
import Hero from "@/sections/hero";
import AppCarousel from "@/components/AppCarousel";
import MenuMarquee from "@/components/menu-marquee";
import AppPrevileges from "@/sections/previleges";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pb-4">
      <Header />
      <BackgroundDecoration />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <AppCarousel />
          <AppPrevileges />
          <div className="flex items-center justify-center flex-col gap-4 mb-16 sm:flex-row sm:justify-center">
            <Link href="/onboard">
              <RainbowButton className="sm:px-12 px-14 py-6 font-semibold text-lg">
                Become a Member 🚀
              </RainbowButton>
            </Link>
          </div>
          <MenuMarquee />

          {/* Newsletter Section */}
          <section className="py-12 sm:py-16 md:py-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-8 sm:mb-12">
              LET'S CONNECT WITH US
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your e-mail"
                className="max-w-xs w-full text-center rounded-full"
              />
              <Button
                variant="secondary"
                className="rounded-full w-full sm:w-auto"
              >
                Subscribe Now
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
