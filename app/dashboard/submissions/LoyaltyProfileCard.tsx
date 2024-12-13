import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoyaltyProfileCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loyalty Profile</CardTitle>
        <CardDescription>
          Your loyalty program profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Name</dt>
            <dd>{data.name}</dd>
          </div>
          <div>
            <dt className="font-medium">Cafe Visits</dt>
            <dd>{data.cafeVisits}</dd>
          </div>
          <div>
            <dt className="font-medium">Preferred Visit Time</dt>
            <dd>{data.preferredVisitTime}</dd>
          </div>
          <div>
            <dt className="font-medium">Usually Ordered</dt>
            <dd>{data.usuallyOrdered}</dd>
          </div>
          <div>
            <dt className="font-medium">Average Bill Value</dt>
            <dd>{data.averageBillValue}</dd>
          </div>
          <div>
            <dt className="font-medium">Part of Other Programs</dt>
            <dd>{data.partOfAnyOtherProgram}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
