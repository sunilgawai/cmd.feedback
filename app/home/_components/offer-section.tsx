import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This would typically come from an API or database
const offers = [
  { id: 1, title: "Summer Sale", description: "Up to 50% off on summer items" },
  {
    id: 2,
    title: "New User Bonus",
    description: "10% off your first purchase",
  },
];

export function OfferSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offers</CardTitle>
        <CardDescription>Current deals and promotions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {offers.map((offer) => (
            <li key={offer.id}>
              <h3 className="font-semibold">{offer.title}</h3>
              <p className="text-sm text-muted-foreground">
                {offer.description}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
