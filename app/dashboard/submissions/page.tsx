import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TeamListSkeleton } from "@/components/teams";

async function getCustomers() {
  return await prisma.user.findMany();
}

export default async function SubmissionsPage() {
  const customers = await getCustomers();

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Customer's Submisions</h1>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="all">All Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={customers}
              // totalItems={customers.length as any || 0}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
