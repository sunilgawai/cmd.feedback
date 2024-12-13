import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoyaltyWalletCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loyalty Wallet</CardTitle>
        <CardDescription>Your loyalty wallet information</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Current Wallet</dt>
            <dd>{data.currentWallet}</dd>
          </div>
          <div>
            <dt className="font-medium">Flexibility to Preload</dt>
            <dd>{data.flexibilityToPreload}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
