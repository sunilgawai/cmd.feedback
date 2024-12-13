import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Percent, Trophy } from "lucide-react";

const benefits = [
  {
    title: "Exclusive Rewards",
    description:
      "Earn points on every purchase and redeem them for amazing rewards.",
    icon: Gift,
  },
  {
    title: "Special Discounts",
    description: "Get access to member-only discounts and early sale access.",
    icon: Percent,
  },
  {
    title: "VIP Treatment",
    description: "Enjoy priority service and exclusive event invitations.",
    icon: Trophy,
  },
];

export default function Benefits() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Join Our Loyalty Program?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
