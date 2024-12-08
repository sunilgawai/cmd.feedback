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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "validFrom",
    header: "Date Applied From",
    //     cell({getValue}) {
    //         return <div>{getValue()}</div>
    //     },
  },
  {
    accessorKey: "validTo",
    header: "Date Applied Till",
  },
  //   {
  //     header: "View",
  //     cell: ({ row }) => (
  //       <Link href={`/dashboard/customers/${row.original.id}`}>
  //         <EyeIcon color="blue" />
  //         <Button variant="link" size="icon" asChild>
  //           View
  //         </Button>
  //       </Link>
  //     ),
  //   },
  //   {
  //     id: "edit",
  //     header: "Edit",
  //     cell: ({ row }) => (
  //       <Link href={`/dashboard/customers/form?mode=edit&id=${row.original.id}`}>
  //         <Edit color="blue" />
  //         <Button variant="link" size="icon" asChild>
  //           View
  //         </Button>
  //       </Link>
  //     ),
  //   },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => <DeleteAction data={row.original} />,
  },
];
