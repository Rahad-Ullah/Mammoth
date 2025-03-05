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
    header: "Sl. No",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
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
          Ordering Provider
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original as TBill;
      return <div className="capitalize">{item.ordering_provider}</div>;
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
      return <div className="">{row.getValue("ordering_physician")}</div>;
    },
  },
  {
    accessorKey: "bill_date",
    header: () => <div>Bill Date</div>,
    cell: ({ row }) => {
      const item = row.original as TBill;
      return <div className="capitalize">{item.bill_date}</div>;
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
      return <div className="px-4">{`$${bill}`}</div>;
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
