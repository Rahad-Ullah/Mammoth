import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TPatient } from "@/types/patient";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<TPatient>[] = [
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
    cell: ({ row }) => {
      const item = row.original as TPatient;
      return (
        <div className="capitalize">
          {item.first_name} {item.last_name}
        </div>
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
          Phone
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
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
      return <div className="">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "insurance_company",
    header: () => <div>Insurance</div>,
    cell: ({ row }) => {
      const item = row.original as TPatient;
      return <div className="capitalize">{item.insurance_company}</div>;
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
            href={`/dashboard/patients/patient-details/${item.id}`}
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
