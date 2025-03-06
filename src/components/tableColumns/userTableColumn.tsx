"use client";

import { User } from "@/app/(dashboardLayout)/dashboard/users/page";
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
        className="border-[#5C5C5C]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-[#A1A1A1]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: ({ row }) => {
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.id}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.first_name} {item.last_name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone No
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.phone}
          </Button>
        </Link>
      );
    },
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
    cell: ({ row }) => {
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="w-full justify-start hover:bg-transparent"
          >
            {item.email}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "company",
    header: () => <div>Facilities Lacation</div>,
    cell: ({ row }) => {
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.company}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      const item = row.original as User;
      return (
        <Link href={`/dashboard/users/user-details/${item.id}`}>
          <Badge
            className={`capitalize font-medium text-white rounded-full hover:bg-primary py-1.5 w-full flex justify-center`}
            style={{
              backgroundColor:
                role === "admin"
                  ? "#F17600"
                  : role === "representative"
                  ? "#C42985"
                  : role === "pathologist"
                  ? "#319517"
                  : role === "histologist"
                  ? "#85CA53"
                  : "",
            }}
          >
            {row.getValue("role")}
          </Badge>
        </Link>
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
          <Link href={`/dashboard/users/user-details/${item.id}`} passHref>
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
