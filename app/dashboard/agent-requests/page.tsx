import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import { columns } from "../agents/agents-table/column";
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

async function getTeams() {
  return await prisma.agent.findMany();
}

export default async function AgentRequestsPage() {
  const agents = await getTeams();

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Agent Requests</h1>
        {/* <Dialog open={open} onOpenChange={setOpen}> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Agent</DialogTitle>
              <DialogDescription>Create a new agent</DialogDescription>
            </DialogHeader>
            <CreateAgentForm />
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={agents}
              // totalItems={withdrawals.length || 0}
            />
            {/* <WithdrawsTable data={withdrawals} totalData={withdrawals.length} /> */}
          </Suspense>
        </TabsContent>
        <TabsContent value="approved">
          <Suspense fallback={<TeamListSkeleton />}>
            <DataTable
              columns={columns}
              data={agents}
              // totalItems={withdrawals.length || 0}
            />
            {/* <WithdrawsTable data={withdrawals} totalData={withdrawals.length} /> */}
          </Suspense>
        </TabsContent>
        <TabsContent value="rejected">
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