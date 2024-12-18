import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StarAnise",
  description: "StarAnise ~ PATISSERIE",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-[#e0e2e6] antialiased outline-border",
          inter.className
        )}
      >
        <Providers>
          {children}
          {modal}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
