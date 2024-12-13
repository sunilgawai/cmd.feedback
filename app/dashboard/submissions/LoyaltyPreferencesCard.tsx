import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoyaltyPreferencesCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loyalty Preferences</CardTitle>
        <CardDescription>
          Your preferences for the loyalty program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Like to Earn Reward Points</dt>
            <dd>{data.likeToEarnRewardPoints ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium">Importance of Rewards</dt>
            <dd>{data.howImportant}</dd>
          </div>
          <div>
            <dt className="font-medium">Prefer Earning Cashback</dt>
            <dd>{data.preferEarningCashback}</dd>
          </div>
          <div>
            <dt className="font-medium">Interested in Membership</dt>
            <dd>{data.interestedInMembership}</dd>
          </div>
          <div>
            <dt className="font-medium">Will Participate</dt>
            <dd>{data.willParticipate}</dd>
          </div>
          <div>
            <dt className="font-medium">Prefer Subscription</dt>
            <dd>{data.preferSubscription}</dd>
          </div>
          <div>
            <dt className="font-medium">Like Personalized Recommendations</dt>
            <dd>{data.likePersonalizedRecommendations}</dd>
          </div>
          <div>
            <dt className="font-medium">Interested in Gifting</dt>
            <dd>{data.interestedInGifting}</dd>
          </div>
          <div>
            <dt className="font-medium">Prefer Notifications</dt>
            <dd>{data.preferNotifications}</dd>
          </div>
          <div>
            <dt className="font-medium">Value Experiences</dt>
            <dd>{data.valueExperiences}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
