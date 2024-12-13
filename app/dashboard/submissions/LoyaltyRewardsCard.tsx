import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoyaltyRewardsCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Preferences</CardTitle>
        <CardDescription>Your preferences for loyalty rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Prefer Cashback</dt>
            <dd>{data.preferCashback}</dd>
          </div>
          <div>
            <dt className="font-medium">Wanted Feature</dt>
            <dd>{data.wantedFeature || "Not specified"}</dd>
          </div>
          <div>
            <dt className="font-medium">Want to Pay Anis Club</dt>
            <dd>{data.wantToPayAnisClub}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
