import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TFacility } from "@/types/facility";
import { TUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";
import Link from "next/link";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

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
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
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
    accessorKey: "facility_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Facilities Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.facility_name}
          </Button>
        </Link>
      );
    },
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
    cell: ({ row }) => {
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.address}
          </Button>
        </Link>
      );
    },
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
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {`Dr. ${doctors[0].first_name} ${doctors[0].last_name}, `}
            <span className="text-primary">{doctors.length - 1}+</span>
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "representative",
    header: () => <div>Representative</div>,
    cell: ({ row }) => {
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.representative.first_name} {item.representative.last_name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as TFacility;
      const status = row.getValue("status");
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className={`capitalize w-full justify-start hover:bg-transparent`}
          >
            <div className="flex items-center space-x-2">
              <MdOutlineRadioButtonChecked
                className={`size-5 ${
                  status === "active" ? "text-[#319517]" : "text-red-500"
                }`}
              />
              <p>{status as string}</p>
            </div>
          </Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const item = row.original as TFacility;
      return (
        <Link href={`/dashboard/facilities/facility-details/${item.id}`}>
          <div className="flex items-center gap-1">
            <Button variant={"ghost"} size={"icon"} className="text-primary">
              <Info />
            </Button>
          </div>
        </Link>
      );
    },
  },
];

export default columns;
