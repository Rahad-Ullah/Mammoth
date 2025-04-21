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
import pdfIcon from "@/assets/icons/pdf.svg";
import excelIcon from "@/assets/icons/excel.svg";

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
import { ITest, TTest } from "@/types/test";
import CreateTestModal from "@/components/page/tests/createTestModal";
import Image from "next/image";
import { testStatuses } from "@/constants/testStatus";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { exportToExcel } from "@/utils/exportToExcel";

const TestsTable = ({ tests = [], meta, filters, facilitiesData = [] }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Extract unique statuses from data
  const doctors = Array.from(
    new Set(tests?.map((item: TTest) => item?.doctor?.name))
  );

  // Extract unique facilities from data
  const facilities = Array.from(
    new Set(tests?.map((item: TTest) => item.ordering_provider))
  );

  const table = useReactTable<TTest>({
    data: tests || [],
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

  const exportData = tests?.map((item: ITest) => ({
    Report_No: item?.report_no,
    Facility_Name: item?.facility_location?.name,
    Facility_Location: item?.facility_location?.address,
    Patient_Name: item?.patient?.name,
    Physician: item?.doctor?.name,
    Apply_Date: item?.apply_date?.split("T")[0],
    Report_Date: item?.report_date?.split("T")[0],
    Status: item?.status,
  }));

  return (
    <div className="w-full bg-white p-4 rounded-xl h-full">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-center md:justify-end gap-4 items-center pb-4">
        {/* PDF button for downloading table as pdf */}
        <Button className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary">
          <Image src={pdfIcon} alt="pdf" width={24} height={24} />
        </Button>
        {/* Excel button for downloading table as excel */}
        <Button
          onClick={() => exportToExcel("Tests", exportData)}
          className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary"
        >
          <Image src={excelIcon} alt="pdf" width={24} height={24} />
        </Button>

        {/* Doctor Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.doctor ? `${filters?.doctor}` : "Doctor"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({
                  page: null,
                  doctor: null,
                })
              }
            >
              All Doctors
            </DropdownMenuItem>
            {doctors.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({
                    page: null,
                    doctor: item as string,
                  })
                }
              >
                {capitalizeSentence(item as string)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Facility Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.facility ? `${filters?.facility}` : "Facility"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({
                  page: null,
                  facility: null,
                })
              }
            >
              All Facilities
            </DropdownMenuItem>
            {facilities.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({
                    page: null,
                    facility: item as string,
                  })
                }
              >
                {capitalizeSentence(item as string)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize shadow text-[#929292]"
            >
              {filters?.status ? `${filters?.status}` : "Status"}{" "}
              <ChevronDown className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                updateMultiSearchParams({ page: null, status: null })
              }
            >
              All Status
            </DropdownMenuItem>
            {testStatuses.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                onClick={() =>
                  updateMultiSearchParams({ page: null, status: item })
                }
              >
                {capitalizeSentence(item as string)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow text-[#929292]">
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
                    key={column?.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {capitalizeSentence(column?.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add new user button */}
        <CreateTestModal facilities={facilitiesData} />
      </section>

      {/* table and pagination*/}
      <section>
        <DashboardTable table={table} columns={columns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default TestsTable;
