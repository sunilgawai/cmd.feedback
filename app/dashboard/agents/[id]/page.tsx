import React from 'react'
import { Button } from "@/components/ui/button";
import { FileCode, Plus, Table } from 'lucide-react';
import { ComponentExample } from '@/components/component-example';
import { DataTable } from '@/components/ui/data-table';

// Example data for DataTable
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

const AgentPage = () => {
  return (
    <div className="container space-y-8">
      <ComponentExample
        title="Agent Financials"
        description="manage agent financials here..."
        icon={<FileCode className="w-5 h-5" />}
      >
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Assigned Orders</h3>
                <p className="text-sm text-muted-foreground">
                  this are assigned to this agent
                </p>
              </div>
              <Button>View Order History</Button>
            </div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <div>
                  <DataTable columns={columns} data={data} searchKey="name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentExample>
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
    </div>
  );
}

export default AgentPage;