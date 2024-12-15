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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-40 border-none shadow-none `}
    >
      <div className="container px-4">
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Home">
            <Image
              height={50}
              width={100}
              className="w-32 h-auto my-4  "
              src="/logo_black.png"
              alt="logo"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
