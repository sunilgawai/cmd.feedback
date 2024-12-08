import { notFound } from "next/navigation";
import { getAgentById } from "@/lib/agents";
import { getAgentTransactions } from "@/lib/transactions";
import { getAgentOrders } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { columns as transactionColumns } from "./transaction-columns";
import { columns as orderColumns } from "./order-columns";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AgentWorkSpeedForm } from "./agent-workspeed-form";

export const dynamic = "force-dynamic";

async function getPageData(id: string) {
  const [agent, transactions, orders] = await Promise.all([
    getAgentById(id),
    getAgentTransactions(id),
    getAgentOrders(id),
  ]);

  if (!agent) {
    notFound();
  }

  return { agent, transactions, orders };
}

export default async function CustomerDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { agent, transactions, orders } = await getPageData(params.id);

  const activeOrders = orders.filter((order) => order.status === "ACTIVE");
  const recentOrders = orders.slice(0, 5); // Get the 5 most recent orders
  const pendingSuperAdminOrders = orders.filter(
    (order) => order.status === "PENDING" && order.type === "SUPER_ADMIN"
  );

  const totalDeposits = transactions
    .filter((t) => t.transactionType === "DEPOSIT" && t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter(
      (t) => t.transactionType === "WITHDRAWAL" && t.status === "COMPLETED"
    )
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center my-8">
        <Button>
          <RiArrowGoBackLine className="mr-2 h-4 w-4" />
          Back to Agents
        </Button>
        <AgentWorkSpeedForm />
        {/* <Slider
          defaultValue={[50]} 
          max={100}
          step={1}
          className="w-[60%]"
        /> */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Username:</dt>
              <dd>{agent.username}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{agent.phone}</dd>
              <dt className="font-semibold">Role:</dt>
              <dd>{agent.role}</dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Badge variant={agent.status ? "default" : "destructive"}>
                  {agent.status ? "Active" : "Inactive"}
                </Badge>
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Wallet Balance:</dt>
              <dd>{formatCurrency(agent.walletBalance)}</dd>
              <dt className="font-semibold">Total Deposits:</dt>
              <dd>{formatCurrency(totalDeposits)}</dd>
              <dt className="font-semibold">Total Withdrawals:</dt>
              <dd>{formatCurrency(totalWithdrawals)}</dd>
              <dt className="font-semibold">Commission Rate:</dt>
              <dd>{agent.commision_rate}%</dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Total Requests:</dt>
              <dd>{agent.totalRequest}</dd>
              <dt className="font-semibold">Positive Points:</dt>
              <dd>{agent.positivePoints}</dd>
              <dt className="font-semibold">Negative Points:</dt>
              <dd>{agent.negativePoints}</dd>
              <dt className="font-semibold">Average Accept Time:</dt>
              <dd>{agent.averageAcceptTime?.toFixed(2) || "N/A"} seconds</dd>
            </dl>
          </CardContent>
        </Card>
      </div>

      {pendingSuperAdminOrders.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Daily Completed Orders</CardTitle>
            <CardDescription>
              These orders are completed on daily basis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* @ts-ignore */}
            <DataTable columns={orderColumns} data={pendingSuperAdminOrders} />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="active-orders" className="mb-6">
        <TabsList>
          <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="active-orders">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={orderColumns} data={activeOrders} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent-orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={orderColumns} data={recentOrders} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Financial History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={transactionColumns} data={transactions} />
        </CardContent>
      </Card>
    </div>
  );
}
