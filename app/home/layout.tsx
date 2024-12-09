import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/components/user-button";

const inter = Inter({ subsets: ["latin"] });
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col lg:pl-[280px]">
        <header className="sticky top-0 z-40 border-b bg-background h-16">
          <div className="container flex h-16 items-center gap-4">
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
};

export default HomeLayout;
