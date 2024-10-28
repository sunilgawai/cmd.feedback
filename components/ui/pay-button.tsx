"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getStripeSession } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";

interface PayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  priceId: string;
  amount?: number;
  currency?: string;
  interval?: "month" | "year";
  showAmount?: boolean;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  buttonText?: string;
  children?: React.ReactNode;
}

export function PayButton({
  priceId,
  amount,
  currency = "USD",
  interval = "month",
  showAmount = true,
  variant = "default",
  buttonText,
  className,
  children,
  ...props
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await getStripeSession(priceId);
      const data = await response.json();

      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      onClick={handlePayment}
      loading={loading}
      variant={variant}
      className={cn("min-w-[120px]", className ?? "")}
      {...props}
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          {children || (
            <>
              {showAmount && amount && (
                <span className="mr-2">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                  }).format(amount)}
                </span>
              )}
              {buttonText || `Subscribe${interval && ` / ${interval}`}`}
            </>
          )}
        </>
      )}
    </LoadingButton>
  );
}
