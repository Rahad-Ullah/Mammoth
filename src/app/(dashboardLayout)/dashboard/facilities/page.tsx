"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";
import pdfIcon from "../../../../assets/icons/pdf.svg";
import excelIcon from "../../../../assets/icons/excel.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import Link from "next/link";
import DashboardTable from "@/components/table";
import TablePagination from "@/components/table-pagination";
import { facilitiesData } from "@/constants/facilities";
import columns from "@/components/tableColumns/facilityTableColumns";
import { TFacility } from "@/types/facility";
import Image from "next/image";

// Extract unique roles from data
const statuses = Array.from(new Set(facilitiesData.map((item) => item.status)));

const FacilitiesPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [status, setStatus] = React.useState<string | null>(null);

  const data = React.useMemo(() => {
    return status
      ? facilitiesData.filter((facility) => facility.status === status)
      : facilitiesData;
  }, [status]);

  const table = useReactTable<TFacility>({
    data,
    columns: columns as ColumnDef<TFacility>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4">
        {/* PDF button */}
        <Button className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary">
          <Image src={pdfIcon} alt="pdf" width={24} height={24} />
        </Button>
        <Button className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary">
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Role Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-zinc-500"
            >
              {status ? `Status: ${status}` : "Filter by Status"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setStatus(null)}>
              All Status
            </DropdownMenuItem>
            {statuses.map((status) => (
              <DropdownMenuItem key={status} onClick={() => setStatus(status)}>
                {capitalizeSentence(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow text-zinc-500">
              Columns <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {capitalizeSentence(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add new user button */}
        <Link href="/dashboard/facilities/add-new-facility">
          <Button>
            <Plus /> Add Facility
          </Button>
        </Link>
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={columns} />
        <TablePagination table={table} />
      </section>
    </div>
  );
};

export default FacilitiesPage;
