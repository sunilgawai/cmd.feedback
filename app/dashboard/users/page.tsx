"use client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";
import { TeamList, TeamListSkeleton } from "@/components/teams/team-list";
import { ComponentExample } from "@/components/component-example";
import { DataTable } from "@/components/ui/data-table";
import { Table } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getAllUsers } from "./actions";
// Example data for DataTable
const columns = [
  { accessorKey: "usercode", header: "User Code" },
  { accessorKey: "username", header: "User Name" },
  { accessorKey: "balance", header: "Balance" },
  { accessorKey: "account", header: "Account No." },
  { accessorKey: "ifsc", header: "IFSC" },
  {
    accessorKey: "status",
    header: "User Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") ? <span>Enabled</span> : <span>Disabled</span>}
      </div>
    ),
  },
  { accessorKey: "waggering", header: "Waggering" },
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const users = await getAllUsers();
      setUsers(users);
      console.log("users", users);
    }
    getUsers();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <CreateTeamDialog />
      </div>
      <Card>
        <CardContent>
          <Suspense fallback={<TeamListSkeleton />}>
            {users.length > 0 ? (
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold">available users</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      sorting, filtering, and pagination enabled
                    </p>
                    <DataTable
                      columns={columns}
                      data={users}
                      searchKey="name"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">No users found</p>
              </div>
            )}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
