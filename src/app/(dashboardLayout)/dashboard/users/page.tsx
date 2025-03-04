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
import columns from "@/components/tableColumns/userTableColumn";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import Link from "next/link";
import DashboardTable from "@/components/table";
import TablePagination from "@/components/table-pagination";
import Image from "next/image";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  company: string;
};

// Extract unique roles from data
const roles = Array.from(new Set(usersData.map((user) => user.role)));

const UsersPage = () => {
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
      ? usersData.filter((user) => user.role === selectedRole)
      : usersData;
  }, [selectedRole]);

  const table = useReactTable<User>({
    data,
    columns: columns as ColumnDef<User>[],
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
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}

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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add new user button */}
        <Link href="/dashboard/users/add-new-user">
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

export default UsersPage;
