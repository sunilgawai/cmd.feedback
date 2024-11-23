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

export default async function SellerPage() {
  return (
    <div className="container space-y-8">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-center">Seller Platform</h1>
      </div>

      <Tabs defaultValue="fast_mode" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fast_mode">FAST MODE</TabsTrigger>
          <TabsTrigger value="transfer">TRANSFER</TabsTrigger>
        </TabsList>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-4">
              <CardTitle>A89167</CardTitle>
              <div className="flex items-center space-x-2">
                <Label htmlFor="online-mode">Offline</Label>
                <Switch id="online-mode" />
                <Label htmlFor="online-mode">Online</Label>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <CardTitle>BALANCE</CardTitle>
                <Button variant="default" className="bg-blue-500">
                  Recharge
                </Button>
              </div>
              <CardDescription>
                <CardTitle>$0.00 </CardTitle> <br />
                Transaction over $0.00 will not be distributed to you.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <TabsContent value="fast_mode">
          <div className="container">
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="close">Close</TabsTrigger>
                <TabsTrigger value="complains">Complains</TabsTrigger>
              </TabsList>
              <TabsContent value="open">
                <h1>No open records</h1>
                <Suspense fallback={<TeamListSkeleton />}>
                  {/* Table  */}
                </Suspense>
              </TabsContent>
              <TabsContent value="close">
                <h1>No close records</h1>
                <Suspense fallback={<TeamListSkeleton />}>
                  {/* Table  */}
                </Suspense>
              </TabsContent>
              <TabsContent value="complains">
                <h1>No open complaints</h1>
                <Suspense fallback={<TeamListSkeleton />}>
                  {/* Table  */}
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
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
