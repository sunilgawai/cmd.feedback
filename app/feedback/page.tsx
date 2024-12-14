import LoyaltyForm from "@/components/forms/loyalty-form";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Footer from "@/sections/Footer";
import React from "react";

const FeedBackForm = () => {
  return (
    <div className="h-screen w-full">
      <LoyaltyForm />
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <Footer />
    </div>
  );
};

export default FeedBackForm;
