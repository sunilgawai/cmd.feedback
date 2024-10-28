"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthDocs } from "@/components/docs/auth-docs";
import { DatabaseDocs } from "@/components/docs/database-docs";
import { EmailDocs } from "@/components/docs/email-docs";
import { StripeDocs } from "@/components/docs/stripe-docs";
import { TeamsDocs } from "@/components/docs/teams-docs";
import { ComponentsDocs } from "@/components/docs/components-docs";

export function DocsTabs() {
  return (
    <Tabs defaultValue="auth" className="space-y-4">
      <TabsList>
        <TabsTrigger value="auth">Authentication</TabsTrigger>
        <TabsTrigger value="database">Database</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="stripe">Stripe</TabsTrigger>
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
      </TabsList>
      <TabsContent value="auth" className="space-y-4">
        <AuthDocs />
      </TabsContent>
      <TabsContent value="database" className="space-y-4">
        <DatabaseDocs />
      </TabsContent>
      <TabsContent value="email" className="space-y-4">
        <EmailDocs />
      </TabsContent>
      <TabsContent value="stripe" className="space-y-4">
        <StripeDocs />
      </TabsContent>
      <TabsContent value="teams" className="space-y-4">
        <TeamsDocs />
      </TabsContent>
      <TabsContent value="components" className="space-y-4">
        <ComponentsDocs />
      </TabsContent>
    </Tabs>
  );
}
