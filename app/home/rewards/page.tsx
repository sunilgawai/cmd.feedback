import { Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyRewards = [
  {
    id: "1",
    title: "Free Night Stay",
    description: "Redeem for a complimentary night at any of our properties",
    points: 5000,
  },
  {
    id: "2",
    title: "Spa Voucher",
    description: "Enjoy a relaxing spa treatment on us",
    points: 2000,
  },
  {
    id: "3",
    title: "Dining Credit",
    description: "$50 credit for our in-house restaurants",
    points: 1500,
  },
];

export default function RewardsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Rewards Catalog</h1>
      <div className="space-y-4">
        {dummyRewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Gift className="w-5 h-5" />
                {reward.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{reward.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold">{reward.points} points</p>
                <Button variant="outline">Redeem</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
