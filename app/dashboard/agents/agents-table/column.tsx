"use client";
import { Checkbox } from "@/components/ui/checkbox";
// import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Edit, EyeIcon } from "lucide-react";
import Link from "next/link";
import { DeleteAction } from "./delete-action";
import { Button } from "@/components/ui/button";

// @ts-ignore
export const columns: ColumnDef<T>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "USERNAME",
  },
  {
    accessorKey: "phone",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    header: "VIEW",
    cell: ({ row }) => (
      <Link href={`/dashboard/agents/${row.original.id}`}>
        <EyeIcon color="blue" />
        <Button variant="link" size="icon" asChild>
          View
        </Button>
      </Link>
    ),
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <Link href={`/dashboard/agents/${row.original.id}`}>
        <Edit color="blue" />
        <Button variant="link" size="icon" asChild>
          View
        </Button>
      </Link>
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => <DeleteAction data={row.original} />,
  },
];
