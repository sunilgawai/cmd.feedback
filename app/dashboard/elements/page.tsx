import React from "react";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { PayButton } from "@/components/ui/pay-button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingButton } from "@/components/ui/loading-button";
import { CopyButton } from "@/components/ui/copy-button";
import { DataTable } from "@/components/ui/data-table";
import { FileCode, Package, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ComponentExample } from "@/components/component-example";
import { DialogExample } from "@/components/examples/dialog-example";
import { FileUploadExample } from "@/components/examples/file-upload-example";
import Link from "next/link";

// Example data for DataTable
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Component Library</h1>
          <p className="text-muted-foreground">
            Ready-to-use components for your application
          </p>
        </div>
        <Badge variant="secondary">
          <Package className="w-4 h-4 mr-1" />
          Components
        </Badge>
      </div>

      {/* Payment Components */}
      <ComponentExample
        title="Payment Components"
        description="Components for handling payments and subscriptions"
        icon={<FileCode className="w-5 h-5" />}
      >
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">PayButton</h3>
                <p className="text-sm text-muted-foreground">
                  A button component for handling Stripe payments
                </p>
              </div>
              <PayButton
                priceId="price_example"
                amount={10}
                currency="USD"
                interval="month"
                showAmount
              />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;PayButton priceId="price_xxx" amount=&#123;10&#125;
                currency="USD" interval="month" /&gt;
              </p>
            </div>
          </div>
        </div>
      </ComponentExample>

      {/* Data Display Components */}
      <ComponentExample
        title="Data Display Components"
        description="Components for displaying and managing data"
        icon={<Table className="w-5 h-5" />}
      >
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold">DataTable</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A table component with sorting, filtering, and pagination
              </p>
              <DataTable columns={columns} data={data} searchKey="name" />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;DataTable columns=&#123;columns&#125; data=&#123;data&#125;
                searchKey="name" /&gt;
              </p>
            </div>
          </div>
        </div>
      </ComponentExample>

      {/* Utility Components */}
      <ComponentExample
        title="Utility Components"
        description="General purpose utility components"
      >
        <div className="grid gap-6">
          {/* Loading Button */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">LoadingButton</h3>
                <p className="text-sm text-muted-foreground">
                  Button with loading state
                </p>
              </div>
              <div className="flex gap-2">
                <LoadingButton>Normal</LoadingButton>
                <LoadingButton loading>Loading</LoadingButton>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;LoadingButton
                loading=&#123;isLoading&#125;&gt;Submit&lt;/LoadingButton&gt;
              </p>
            </div>
          </div>

          <Separator />

          {/* Copy Button */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">CopyButton</h3>
                <p className="text-sm text-muted-foreground">
                  Button for copying text to clipboard
                </p>
              </div>
              <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
                <code className="text-sm">npm install nextlaunch</code>
                <CopyButton value="npm install nextlaunch" />
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;CopyButton value="text to copy" /&gt;
              </p>
            </div>
          </div>

          <Separator />

          {/* Confirm Dialog */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">ConfirmDialog</h3>
                <p className="text-sm text-muted-foreground">
                  Dialog for confirming destructive actions
                </p>
              </div>
              <DialogExample />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;ConfirmDialog title="Delete" description="..."
                onConfirm=&#123;handleDelete&#125; /&gt;
              </p>
            </div>
          </div>

          <Separator />

          {/* File Upload */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold">FileUpload</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop file upload component with preview
              </p>
              <FileUploadExample />
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;FileUpload onUpload=&#123;handleUpload&#125;
                accept=&#123;...&#125; /&gt;
              </p>
            </div>
          </div>

          <Separator />

          {/* Empty State */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold">EmptyState</h3>
              <p className="text-sm text-muted-foreground">
                Component for empty states and no-data scenarios
              </p>
            </div>
            <EmptyState
              icon={FileCode}
              title="No Components"
              description="Get started by adding your first component"
              action={{
                label: "Add Component",
                href: "/docs",
              }}
            />
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">
                &lt;EmptyState icon=&#123;Icon&#125; title="No Data"
                description="..." action=&#123;...&#125; /&gt;
              </p>
            </div>
          </div>
        </div>
      </ComponentExample>

      {/* Documentation Link */}
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/dashboard/docs">
            <FileCode className="w-4 h-4" />
            View Full Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}
