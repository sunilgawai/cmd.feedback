import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-16">
        <div className="mx-auto mt-8 border-t pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Designed and developed by{" "}
            <Link href="https://www.incincmedia.com/">
              https://www.incincmedia.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
