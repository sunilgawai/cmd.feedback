import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { TeamListSkeleton } from "@/components/teams";
import { CreateDialog } from "@/components/create-dialog";
import NotificationForm from "@/components/forms/notification-form";
import { ExportDialog } from "@/components/export-dialog";

async function getSubmissions() {
  return await prisma.loyalty.findMany();
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Customer's Submisions</h1>
        <ExportDialog data={submissions} />
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="all">All Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={submissions}
              // totalItems={submissions.length as any || 0}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
