import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TFacility } from "@/types/facility";
import { TUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleDot, Info } from "lucide-react";

// table column definition
const columns: ColumnDef<TFacility>[] = [
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
    accessorKey: "facility_name",
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
      <div className="capitalize">{row.getValue("facility_name")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "doctors",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Doctors
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const doctors = row.getValue("doctors") as TUser[];
      return (
        <div className="capitalize">
          {`Dr. ${doctors[0].first_name} ${doctors[0].last_name}, `}
          <span className="text-primary">{doctors.length - 1}+</span>
        </div>
      );
    },
  },
  {
    accessorKey: "representative",
    header: () => <div>Representative</div>,
    cell: ({ row }) => {
      const representative = row.getValue("representative") as TUser;
      return (
        <div className="capitalize">
          {representative.first_name} {representative.last_name}
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
        <div className={`capitalize`}>
          <div className="flex items-center space-x-2">
            <CircleDot
              className={`size-5 ${
                status === "active" ? "text-green-500" : "text-red-500"
              }`}
            />
            <p>{status as string}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <Button variant={"ghost"} size={"icon"} className="text-primary">
            <Info />
          </Button>
        </div>
      );
    },
  },
];

export default columns;
