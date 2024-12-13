"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl">
          Home
        </Link>
      </div>
      <Link href="/" className="text-2xl font-serif">
        ifood
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/">Offers</Link>
        <Link href="/">Services</Link>
        <button className="p-2">Menu</button>
      </div>
    </header>
  );
}
