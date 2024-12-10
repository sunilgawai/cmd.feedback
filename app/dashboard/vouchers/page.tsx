import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamListSkeleton } from "@/components/teams";
import { Suspense } from "react";
import { CreateDialog } from "@/components/create-dialog";
import OfferForm from "@/components/forms/offer-form";
import VoucherForm from "@/components/forms/voucher-form";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getAllVouchers } from "@/app/actions";

export default async function OffersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const vouchers = await getAllVouchers();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vouchers</h1>
        <CreateDialog
          title="Create Vouchers"
          description="Create your voucher here"
          form={VoucherForm}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Vouchers</CardTitle>
          <CardDescription>Vouchers you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable columns={columns} data={vouchers} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
