import { auth } from "@/app/auth";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@/components/user-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Header() {
  const session = await auth();
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 border-none shadow-none">
      <div className="w-full flex items-center justify-between gap-4 px-28">
        {/* <div className="flex items-center justify-between"> */}
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
          {session?.user ? (
            <Link href="/home" className="block">
              <Avatar role="link">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/auth" className="block">
              <Avatar role="link">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          )}
        {/* </div> */}
      </div>
    </header>
  );
}
