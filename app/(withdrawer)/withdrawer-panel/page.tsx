import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamListSkeleton } from "@/components/teams/team-list";
import { Suspense } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Link from "next/link";

export default async function WithdrawerPage() {
  return (
    <div className="container space-y-8">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Broker Order Management</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="online-mode">Offline</Label>
          <Switch id="online-mode" />
          <Label htmlFor="online-mode">Online</Label>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-4">
            <CardTitle>A89167 (7397973154) </CardTitle>
            <CardDescription>
              <CardTitle>Total Commision</CardTitle> <br />
              $0.00 will be distributed to you.
            </CardDescription>
          </div>
          <div className="space-y-4">
            <CardDescription>
              <CardTitle>Available Balance</CardTitle> <br />
            </CardDescription>
            <div className="flex items-center justify-center gap-4">
              <CardTitle>
                <span className="text-green-500">$ 0.00</span> ~ 0.00 USDT
              </CardTitle>
              <Link href="/withdrawer-panel/withdraw">
                <Button variant="default" className="bg-blue-500">
                  WITHDRAW
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="fast_mode" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fast_mode">Bank Pending</TabsTrigger>
          <TabsTrigger value="transfer">Pending Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="fast_mode">
          <Suspense fallback={<TeamListSkeleton />}>{/* Table  */}</Suspense>
        </TabsContent>
        <TabsContent value="transfer">
          <div className="container">
            <h1 className="text-center text-xl font-semibold my-4">Transfer</h1>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Recievers ID
                </Label>
                <Input
                  id="phone"
                  placeholder="Recievers ID"
                  type="number"
                  autoCapitalize="none"
                  autoComplete="billing mobile tel"
                  autoCorrect="off"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Enter Amount
                </Label>
                <Input
                  id="password"
                  placeholder="Enter Amount"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="additional-name"
                  autoCorrect="off"
                />
              </div>
              <Button>Transfer</Button>
            </div>
          </div>
          <Suspense fallback={<TeamListSkeleton />}>{/* Table  */}</Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
