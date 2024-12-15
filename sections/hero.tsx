import { Badge } from "@/components/ui/badge";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
        <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#273959] to-[#8C9AB3] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
            >
              <defs>
                <pattern
                  id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                  width="72"
                  height="56"
                  patternUnits="userSpaceOnUse"
                  x="-12"
                  y="4"
                >
                  <path d="M.5 56V.5H72" fill="none" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6 animate-fade-in">
            <span className="font-semibold">StarAnise</span> ~ PATISSERIE
          </Badge>
          <div className="flex justify-center">
            <Image
              height={400}
              width={400}
              src="/logos/logo_hero_yellow.png"
              alt="Hero Logo"
            />
          </div>
          <p className="mb-10 text-xl text-muted-foreground">
            Manages all your restaurant operations efficiently so that you can
            focus on growing your brand, like a real boss!
          </p>
          {/* <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/onboard">
              <RainbowButton>Become a Member 🚀</RainbowButton>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
