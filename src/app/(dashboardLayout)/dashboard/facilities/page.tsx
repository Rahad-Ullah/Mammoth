"use client";

import { usersData } from "@/constants/users";

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
import { ChevronDown, UserPlus } from "lucide-react";

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

// Extract unique roles from data
const roles = Array.from(new Set(usersData.map((user) => user.role)));

const FacilitiesPage = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const data = React.useMemo(() => {
    return selectedRole
      ? facilitiesData.filter(
          (facility) => facility.account_type === selectedRole
        )
      : facilitiesData;
  }, [selectedRole]);

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
    <div className="w-full">
      {/* table top option bar */}
      <section className="flex justify-end gap-4 items-center pb-4">
        {/* Role Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="capitalize">
              {selectedRole ? `Role: ${selectedRole}` : "Filter by Role"}{" "}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setSelectedRole(null)}>
              All Roles
            </DropdownMenuItem>
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => setSelectedRole(role)}
              >
                {capitalizeSentence(role)}
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add new user button */}
        <Link href="/dashboard/user-details/add-new-user">
          <Button>
            <UserPlus /> Add New User
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
