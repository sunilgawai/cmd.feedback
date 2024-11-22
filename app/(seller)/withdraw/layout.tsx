import React from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { CommandMenu } from "@/components/command-menu";
import { UserButton } from "@/components/user-button";
import { Separator } from "@/components/ui/separator";
import { SellerSidebar } from "../_components/seller-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role != "AGENT") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <SellerSidebar />
      <div className="flex-1 flex flex-col lg:pl-[280px]">
        <header className="sticky top-0 z-40 border-b bg-background h-16">
          <div className="container flex h-16 items-center gap-4">
            <CommandMenu />
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <Separator orientation="vertical" className="h-6" />
              <UserButton />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="container space-y-4 p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
