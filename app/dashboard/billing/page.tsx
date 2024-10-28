import React from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { BillingForm } from "@/components/billing-form";
import { Pricing } from "@/components/pricing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Billing</h1>
        <Badge variant={session.user.subscriptionStatus === 'active' ? "default" : "secondary"}>
          {session.user.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>
            {session.user.subscriptionStatus === 'active' 
              ? 'Manage your subscription' 
              : 'Choose a plan to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session.user.subscriptionStatus === 'active' ? (
            <BillingForm />
          ) : (
            <Pricing />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
