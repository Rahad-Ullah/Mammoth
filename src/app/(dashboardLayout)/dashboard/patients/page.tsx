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
import { TPatient } from "@/types/patient";
import { patientsData } from "@/constants/patients";
import columns from "@/components/tableColumns/patientTableColumn";

// Extract unique roles from data
const statuses = Array.from(
  new Set(patientsData.map((item) => item.insurance_company))
);

const PatientsPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [insurance, setInsurance] = React.useState<string | null>(null);

  // Filter data based on selected insurance company
  const data = React.useMemo(() => {
    return insurance
      ? patientsData.filter((item) => item.insurance_company === insurance)
      : patientsData;
  }, [insurance]);

  // Table Pagination, Sorting, Filtering, Column Visibility, Row Selection
  const table = useReactTable<TPatient>({
    data,
    columns: columns as ColumnDef<TPatient>[],
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
    <div className="w-full">
      {/* table top option bar */}
      <section className="flex justify-end gap-4 items-center pb-4">
        {/* Role Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              {insurance ? `Insurance: ${insurance}` : "Filter by Insurance"}{" "}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setInsurance(null)}>
              All Insurance
            </DropdownMenuItem>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setInsurance(status)}
              >
                {capitalizeSentence(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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

export default PatientsPage;
