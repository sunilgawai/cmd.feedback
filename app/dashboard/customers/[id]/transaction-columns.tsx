"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Transaction = {
  id: number;
  transactionType: string;
  amount: number;
  status: string;
  timestamp: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={"default"}>{row.original.transactionType}</Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={"default"}>{row.original.status}</Badge>,
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
  },
];
