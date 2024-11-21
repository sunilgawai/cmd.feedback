"use client";
import { Checkbox } from "@/components/ui/checkbox";
// import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

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
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "withdraw",
    header: "WITHDRAW",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "bankname",
    header: "BANK NAME",
  },
  {
    accessorKey: "note",
    header: "NOTE",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
