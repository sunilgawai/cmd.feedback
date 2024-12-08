import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamList, TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import { CreateDialog } from "@/components/create-dialog";
import OfferForm from "@/components/forms/offer-form";
import { VouchersTable } from "./vouchers-table";
import VoucherForm from "@/components/forms/voucher-form";

export default async function OffersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vouchers</h1>
        <CreateDialog
          title="Create Vouchers"
          description="Create your voucher here"
          form={<VoucherForm />}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Vouchers</CardTitle>
          <CardDescription>Vouchers you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            <VouchersTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
