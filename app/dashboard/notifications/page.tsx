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
import NotificationForm from "@/components/forms/notification-form";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getAllNotifications } from "@/app/actions";

export default async function NotificationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const notifications = await getAllNotifications();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sent Notifications</h1>
        <CreateDialog
          title="Create Notification"
          description="Create your notification here"
          form={NotificationForm}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Notification</CardTitle>
          <CardDescription>Notification you created.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable columns={columns} data={notifications} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
