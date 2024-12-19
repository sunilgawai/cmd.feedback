"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Menu, Star, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { title: "HOME", href: "/" },
    { title: "Offers & Benefits", href: "/home/offers" },
    { title: "My Vouchers", href: "/home/vouchers" },
    { title: "Rewards Catalog", href: "/home/rewards" },
    { title: "Transfer Points", href: "/home/transfer" },
    { title: "Survey", href: "/home/survey" },
    { title: "Settings", href: "/home/settings" },
    { title: "Contact", href: "/home/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-pink-100 p-0">
            <nav className="grid gap-1 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-pink-200",
                    pathname === item.href ? "bg-pink-200" : "transparent"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Button onClick={() => signOut()}>Sign Out</Button>
            </nav>
          </SheetContent>
        </Sheet>
        {/* <Image
          src="/logo_black.png"
          alt="log"
          width={0}
          height={0}
          className="w-16 z-50"
        /> */}
        <h1 className="text-xl font-semibold">Star Anise Plus</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </header>

      <main className="pb-16">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-white">
        <Link
          href="/home"
          className={cn(
            "flex flex-col items-center py-2 px-4",
            pathname === "/home" ? "text-pink-600" : "text-gray-600"
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/home/profile"
          className={cn(
            "flex flex-col items-center py-2 px-4",
            pathname === "/home/profile" ? "text-pink-600" : "text-gray-600"
          )}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>
        <Link
          href="/home/about"
          className={cn(
            "flex flex-col items-center py-2 px-4",
            pathname === "/home/about" ? "text-pink-600" : "text-gray-600"
          )}
        >
          <Star className="w-6 h-6" />
          <span className="text-xs">About</span>
        </Link>
        <Link
          href="/home/notifications"
          className={cn(
            "flex flex-col items-center py-2 px-4",
            pathname === "/notifications" ? "text-pink-600" : "text-gray-600"
          )}
        >
          <Bell className="w-6 h-6" />
          <span className="text-xs">Notifications</span>
        </Link>
      </nav>
    </div>
  );
}
