"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PayButton } from "@/components/ui/pay-button";
import { LoadingButton } from "@/components/ui/loading-button";
import { CopyButton } from "@/components/ui/copy-button";
import { FileUpload } from "@/components/ui/file-upload";
import { EmptyState } from "@/components/ui/empty-state";
import { DataTable } from "@/components/ui/data-table";
import { FileCode } from "lucide-react";
import { Code } from "@/components/ui/code";

// Example data for DataTable
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

const codeExamples = {
  payButton: `<PayButton
  priceId="price_xxx"
  amount={10}
  currency="USD"
  interval="month"
  showAmount
/>`,
  loadingButton: `<LoadingButton loading={isLoading}>
  Submit
</LoadingButton>`,
  copyButton: `<CopyButton value="text to copy" />`,
  fileUpload: `<FileUpload
  onUpload={handleUpload}
  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
/>`,
  emptyState: `<EmptyState
  icon={Icon}
  title="No Data"
  description="..."
  action={{
    label: "Action",
    href: "/path"
  }}
/>`,
  dataTable: `<DataTable 
  columns={columns} 
  data={data} 
  searchKey="name" 
/>`
};

export function ComponentsDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment Components</CardTitle>
          <CardDescription>
            Components for handling payments and subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PayButton</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                A button component for handling Stripe payments
              </p>
              <PayButton
                priceId="price_example"
                amount={10}
                currency="USD"
                interval="month"
                showAmount
              />
            </div>
            <Code language="tsx" code={codeExamples.payButton} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Display Components</CardTitle>
          <CardDescription>
            Components for displaying and managing data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">DataTable</h3>
            <p className="text-sm text-muted-foreground">
              A table component with sorting, filtering, and pagination
            </p>
            <DataTable columns={columns} data={data} searchKey="name" />
            <Code language="tsx" code={codeExamples.dataTable} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Utility Components</CardTitle>
          <CardDescription>
            General purpose utility components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loading Button */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">LoadingButton</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Button with loading state
              </p>
              <div className="flex gap-2">
                <LoadingButton>Normal</LoadingButton>
                <LoadingButton loading>Loading</LoadingButton>
              </div>
            </div>
            <Code language="tsx" code={codeExamples.loadingButton} />
          </div>

          {/* Copy Button */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CopyButton</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Button for copying text to clipboard
              </p>
              <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
                <code className="text-sm">npm install nextlaunch</code>
                <CopyButton value="npm install nextlaunch" />
              </div>
            </div>
            <Code language="tsx" code={codeExamples.copyButton} />
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">FileUpload</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop file upload component with preview
            </p>
            <FileUpload
              onUpload={async () => {}}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
            />
            <Code language="tsx" code={codeExamples.fileUpload} />
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EmptyState</h3>
            <p className="text-sm text-muted-foreground">
              Component for empty states and no-data scenarios
            </p>
            <EmptyState
              icon={FileCode}
              title="No Components"
              description="Get started by adding your first component"
              action={{
                label: "Add Component",
                href: "/docs",
              }}
            />
            <Code language="tsx" code={codeExamples.emptyState} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for using components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium">Client Components</h3>
            <p className="text-sm text-muted-foreground">
              Components with interactivity should be marked with &apos;use client&apos; directive:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`'use client'

import { useState } from 'react'
import { LoadingButton } from '@/components/ui/loading-button'

export function MyComponent() {
  const [loading, setLoading] = useState(false)
  
  return <LoadingButton loading={loading}>Submit</LoadingButton>
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
