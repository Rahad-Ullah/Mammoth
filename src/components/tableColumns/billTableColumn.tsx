import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TBill } from "@/types/bill";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Info } from "lucide-react";
import Link from "next/link";

// table column definition
const columns: ColumnDef<TBill>[] = [
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
      const item = row.original as TBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
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
    accessorKey: "report_no",
    header: "Report No.",
    cell: ({ row }) => {
      const item = row.original as TBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.report_no}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "ordering_provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordering Provider
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as TBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.ordering_provider}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "ordering_physician",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordering Physician
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as TBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.ordering_physician}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "bill_date",
    header: () => <div>Bill Date</div>,
    cell: ({ row }) => {
      const item = row.original as TBill;
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent"
          >
            {item.bill_date}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "bill_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bill Amount
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as TBill;
      const bill = parseFloat(item.bill_amount.toString()).toFixed(2);
      return (
        <Link href={`/dashboard/bills/bill-details/${item.id}`}>
          <Button
            variant={"ghost"}
            className="capitalize w-full justify-start hover:bg-transparent px-6"
          >
            $ {bill}
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
      const item = row.original;
      return (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/bills/bill-details/${item.id}`} passHref>
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
