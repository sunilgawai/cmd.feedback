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

export default function Home() {
  return (
    <div className="min-h-screen px-40 pb-12 grid place-content-center">
      <Header />
      <BackgroundDecoration />
      <Hero />
      <AppCarousel />

      <main className="container mx-auto px-4">
        <AppPrevileges />
        <MenuMarquee />

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

      <Footer />
    </div>
  );
}
