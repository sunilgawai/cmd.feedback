import LoyaltyProfileCard from "../LoyaltyProfileCard";
import LoyaltyPreferencesCard from "../LoyaltyPreferencesCard";
import LoyaltyRewardsCard from "../LoyaltyRewardsCard";
import LoyaltyWalletCard from "../LoyaltyWalletCard";
import { getLoyaltyData } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateDialog } from "@/components/create-dialog";
import NotificationForm from "@/components/forms/notification-form";
import { ExportDialog } from "@/components/export-dialog";

export default async function SubmissionDetailPage({
  params,
}: {
  params: { submissionId: string };
}) {
  const { submissionId } = params;
  const loyaltyData = await getLoyaltyData(submissionId);

  if (!loyaltyData) {
    return <div>No submission data found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/submissions">
          <Button title="Go Back">Go Back</Button>
        </Link>
        <ExportDialog data={loyaltyData} />
        {/* <CreateDialog
          buttonText="Export Data"
          description="Export this details to format of your choise"
          title="Export Data"
          form={NotificationForm}
        /> */}
      </div>
      <h1 className="text-3xl font-bold">Submission Details</h1>
      <div className="grid gap-8">
        <LoyaltyProfileCard data={loyaltyData} />
        <LoyaltyPreferencesCard data={loyaltyData} />
        <LoyaltyRewardsCard data={loyaltyData} />
        <LoyaltyWalletCard data={loyaltyData} />
      </div>
    </div>
  );
}
