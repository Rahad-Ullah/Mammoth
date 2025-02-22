"use client";

import { User } from "@/app/(dashboardLayout)/dashboard/user-details/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info, Lock, LockOpen } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
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
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "company",
    header: () => <div>Company</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <Badge
          className={`capitalize font-medium text-white rounded-full hover:bg-primary`}
          style={{
            backgroundColor:
              role === "admin"
                ? "#F17600"
                : role === "representative"
                ? "#C42985"
                : role === "pathologist"
                ? "#319517"
                : role === "histologist"
                ? "#4747d1"
                : "",
          }}
        >
          {row.getValue("role")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center gap-1">
          {item.status === "active" && (
            <Button variant={"ghost"} size={"icon"} className="text-zinc-400">
              <LockOpen />
            </Button>
          )}
          {item.status === "blocked" && (
            <Button variant={"ghost"} size={"icon"} className="text-red-500">
              <Lock />
            </Button>
          )}
          <Link
            href={`/dashboard/user-details/user-profile/${item.id}`}
            passHref
          >
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default columns;
