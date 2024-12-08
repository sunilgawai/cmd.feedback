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
import NotificationForm from "@/components/forms/notification-form";

export default async function BannersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Offers</h1>
        <CreateDialog
          title="Create Notification"
          description="Create your notification here"
          form={<NotificationForm />}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Notification</CardTitle>
          <CardDescription>Notification you created.</CardDescription>
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
