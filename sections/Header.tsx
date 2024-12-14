"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-40 border-none shadow-none ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-2"
          : "bg-white/50 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Home">
            <Image
              height={50}
              width={100}
              className="w-28 h-auto"
              src="/logo_black.png"
              alt="logo"
              priority
            />
          </Link>
          <Link href="/onboard">
            <RainbowButton>Become a Member 🚀</RainbowButton>
          </Link>
        </div>
      </div>
    </header>
  );
}
