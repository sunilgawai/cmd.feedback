"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 border-none shadow-none">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-start">
          <Link href="/" className="block">
            <Image
              height={80}
              width={100}
              className="w-32 md:w-32 h-auto my-4"
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
