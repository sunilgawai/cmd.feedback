import { Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyOffers = [
  {
    id: "1",
    title: "Summer Getaway",
    description: "Get 20% off on your summer bookings!",
    validFrom: "2023-06-01",
    validTo: "2023-08-31",
  },
  {
    id: "2",
    title: "Weekend Special",
    description: "Book for 2 nights and get the 3rd night free!",
    validFrom: "2023-07-01",
    validTo: "2023-12-31",
  },
  {
    id: "3",
    title: "Dining Discount",
    description: "Enjoy 15% off at our restaurants with your stay",
    validFrom: "2023-06-15",
    validTo: "2023-09-30",
  },
];

export default function OffersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Offers & Benefits</h1>
      <div className="space-y-4">
        {dummyOffers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {offer.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{offer.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Valid from {new Date(offer.validFrom).toLocaleDateString()} to{" "}
                {new Date(offer.validTo).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
