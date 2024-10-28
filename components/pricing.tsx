"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getStripeSession } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

export function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const onSubscribe = async (priceId: string | undefined) => {
    if (!priceId) {
      console.error("Price ID is missing");
      return;
    }

    try {
      setLoading(priceId);
      const response = await getStripeSession(priceId);
      const data = await response.json();

      if (data.url) {
        router.push(data.url);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {siteConfig.stripe.plans.map((plan) => {
          const priceId =
            process.env.NODE_ENV === "production"
              ? plan.price.priceIds.production
              : plan.price.priceIds.test;

          const isRecommended = plan.name === "Pro";

          return (
            <Card
              key={plan.name}
              className={`flex flex-col transition-all duration-200 ${
                isRecommended
                  ? "border-primary shadow-lg scale-105"
                  : "hover:border-primary hover:shadow-md"
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  {isRecommended && (
                    <Badge variant="secondary">
                      <Zap className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-center items-baseline mb-8">
                  <span className="text-5xl font-extrabold">
                    ${plan.price.amount}
                  </span>
                  <span className="text-xl text-muted-foreground ml-2">
                    /month
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full text-lg py-6"
                  onClick={() => onSubscribe(priceId)}
                  disabled={loading === priceId}
                  variant={isRecommended ? "default" : "outline"}
                >
                  {loading === priceId ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
