"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Header({ session }: { session: any }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <style jsx>{`
        .header-content {
          padding-left: 20px;
          padding-right: 20px;
        }
        @media (min-width: 1024px) {
          .header-content {
            padding-left: 120px;
            padding-right: 120px;
          }
        }
      `}</style>
      <div className="header-content w-full flex items-center justify-between py-1">
        <Link href="/" className="block">
          <Image
            height={40}
            width={120}
            className="h-16 w-auto sm:h-10"
            src={scrolled ? "/logo_black.png" : "/logo_white.png"}
            alt="logo"
            priority
          />
        </Link>
        {session?.user ? (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/home">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 bg-transparent">
                <AvatarImage
                  // src={session.user.image || "https://github.com/shadcn.png"}
                  src={session.user.image || "/user.png"}
                  alt={session.user.name || "@user"}
                />
                <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="sr-only">User profile</span>
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-transparent border-none hover:bg-transparent h-16"
            size="default"
            asChild
          >
            <Link href="/auth" className="flex items-center gap-2">
              <User className="bg-transparent" size={20} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
