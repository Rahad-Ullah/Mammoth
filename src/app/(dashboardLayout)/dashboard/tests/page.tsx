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
import { ChevronDown } from "lucide-react";
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
import DashboardTable from "@/components/table";
import TablePagination from "@/components/table-pagination";
import columns from "@/components/tableColumns/testTableColumn";
import { TTest } from "@/types/test";
import { testsData } from "@/constants/tests";
import CreateTestModal from "@/components/page/tests/createTestModal";
import Image from "next/image";

// Extract unique statuses from data
const statuses = Array.from(new Set(testsData.map((test) => test.status)));

// Extract unique statuses from data
const doctors = Array.from(
  new Set(testsData.map((item) => item.ordering_physician))
);

// Extract unique facilities from data
const facilities = Array.from(new Set(testsData.map((item) => item.facility)));

const TestsPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [status, setStatus] = React.useState<string | null>(null);
  const [doctor, setDoctor] = React.useState<string | null>(null);
  const [facility, setFacility] = React.useState<string | null>(null);

  const data = React.useMemo(() => {
    return testsData.filter((item) => {
      const statusMatches = status ? item.status === status : true;
      const doctorMatches = doctor ? item.ordering_physician === doctor : true;
      const facilityMatches = facility ? item.facility === facility : true;

      return statusMatches && doctorMatches && facilityMatches;
    });
  }, [status, doctor, facility]);

  const table = useReactTable<TTest>({
    data,
    columns: columns as ColumnDef<TTest>[],
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

        {/* Doctor Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-zinc-500"
            >
              {doctor ? `Doctor: ${doctor}` : "Doctor"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setDoctor(null)}>
              All Doctors
            </DropdownMenuItem>
            {doctors.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setDoctor(item)}>
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Facility Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-zinc-500"
            >
              {facility ? `Facility: ${facility}` : "Facility"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setFacility(null)}>
              All Facilities
            </DropdownMenuItem>
            {facilities.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setFacility(item)}>
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-zinc-500"
            >
              {status ? `Status: ${status}` : "Status"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setStatus(null)}>
              All Status
            </DropdownMenuItem>
            {statuses.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setStatus(item)}>
                {capitalizeSentence(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow text-zinc-500">
              Columns <ChevronDown />
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
        <CreateTestModal />
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={columns} />
        <TablePagination table={table} />
      </section>
    </div>
  );
};

export default TestsPage;
