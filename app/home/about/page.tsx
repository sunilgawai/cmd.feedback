import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <Star className="w-8 h-8 text-pink-600" />
        </div>
        <h2 className="text-xl font-semibold">VITS Star</h2>
      </div>

      <div className="space-y-4">
        <Link href="/points-history">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4"
          >
            <span className="font-medium">My Points History</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/vouchers">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4"
          >
            <span className="font-medium">My Vouchers</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
