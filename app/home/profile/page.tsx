import { ChevronRight, Gift, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
          <Gift className="w-8 h-8 text-pink-600" />
        </div>
        <h2 className="text-xl font-semibold">VITS Star</h2>
      </div>

      <div className="space-y-4">
        <Link href="/personal-details">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4"
          >
            <div className="flex items-center gap-3">
              <User2 className="w-5 h-5" />
              <span className="font-medium">Personal Details</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/transactions">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="font-medium">Transactions</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
