"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TPatient } from "@/types/patient";
import { TTest } from "@/types/test";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<TTest>[] = [
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
    accessorKey: "report_no",
    header: "Report No.",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("report_no")}</div>
    ),
  },
  {
    accessorKey: "ordering_provider",
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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ordering_provider")}</div>
    ),
  },
  {
    accessorKey: "facility",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Test Form Facility
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("facility")}</div>
    ),
  },
  {
    accessorKey: "patient",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.getValue("patient") as TPatient;
      return (
        <div className="capitalize">
          {patient.first_name} {patient.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "ordering_physician",
    header: () => <div>Physician</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ordering_physician")}</div>
    ),
  },
  {
    accessorKey: "apply_date",
    header: () => <div>Apply Date</div>,
    cell: ({ row }) => {
      const item = row.original as TTest;
      return <div className="capitalize">{item.apply_date.split("T")[0]}</div>;
    },
  },
  {
    accessorKey: "report_date",
    header: () => <div>Report Date</div>,
    cell: ({ row }) => {
      const item = row.original as TTest;
      return (
        <div className="capitalize text-red-500">
          {item.report_date.split("T")[0]}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          className={`capitalize font-medium text-white w-full rounded-full hover:bg-primary flex justify-center py-1.5`}
          style={{
            backgroundColor:
              status === "Collected"
                ? "#1B83B8"
                : status === "Send to Histology"
                ? "#20B9CB"
                : status === "Ready for Pathology"
                ? "#319517"
                : status === "Final"
                ? "#FF2A30"
                : "",
          }}
        >
          {row.getValue("status")}
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
          <Link
            href={`/dashboard/tests/test-details/${item.report_no}`}
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
