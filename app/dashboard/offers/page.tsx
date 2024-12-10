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
import { OffersTable } from "./offers-table";
import { getAllOffers } from "@/app/actions";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default async function OffersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const offers = await getAllOffers();
// console.log(offers)
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Offers</h1>
        <CreateDialog
          title="Create Offer"
          description="Create your offer here"
          // @ts-ignore
          Form={OfferForm}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Offers</CardTitle>
          <CardDescription>Offers you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={offers}
              // totalItems={withdrawals.length || 0}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
