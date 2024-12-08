import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamList, TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import { CreateDialog } from "@/components/create-dialog";
import { CreateTeamForm } from "@/components/forms/create-team-form";

export default async function TeamsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Offers</h1>
        <CreateDialog
          title="Create Offer"
          description="Create your offer here"
          form={<CreateTeamForm />}
        />  
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Offers</CardTitle>
          <CardDescription>Offers you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            {/* <TeamList teams={teams} /> */}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
