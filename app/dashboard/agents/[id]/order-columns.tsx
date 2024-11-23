"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Order = {
  id: number;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const buttonVar =
        row.original.status === "ACTIVE" ? "default" : "destructive";
      return <Badge variant={buttonVar}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];
