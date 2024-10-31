import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocsTabs } from "@/components/docs/docs-tabs";

export const metadata: Metadata = {
  title: "Documentation - NextLaunch",
  description: "Learn how to get started with NextLaunch",
};

export default function DocsPage() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to get started with NextLaunch and integrate all its
            features.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get up and running with NextLaunch in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">1. Clone the repository</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>https://github.com/fiston-user/nextlaunch.git</code>
            </pre>

            <h3 className="font-semibold">2. Install dependencies</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>npm install</code>
            </pre>

            <h3 className="font-semibold">3. Set up environment variables</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>cp .env.example .env</code>
            </pre>
          </CardContent>
        </Card>

        <DocsTabs />
      </div>
    </div>
  );
}
