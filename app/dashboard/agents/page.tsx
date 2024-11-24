import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import { columns } from "./agents-table/column";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAgentForm from "@/components/forms/create-agent-form";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getTeams() {
  return await prisma.agent.findMany();
}

export default async function AgentsPage() {
  const agents = await getTeams();

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Agents</h1>
        <Link href="/dashboard/agents/form">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="seller">Seller</TabsTrigger>
        </TabsList>
        <TabsContent value="withdraw">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={agents}
              // totalItems={withdrawals.length || 0}
            />
            {/* <WithdrawsTable data={withdrawals} totalData={withdrawals.length} /> */}
          </Suspense>
        </TabsContent>
        <TabsContent value="seller">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={agents}
              // totalItems={withdrawals.length || 0}
            />
            {/* <WithdrawsTable data={withdrawals} totalData={withdrawals.length} /> */}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
