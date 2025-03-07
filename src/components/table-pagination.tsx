import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const TablePagination = ({ table }) => {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
      <div className="md:absolute text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex justify-center flex-1">
        <Pagination className="text-[#A7A7A7]">
          <PaginationContent className="">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => page != 1 && setPage(page - 1)}
                className={page === 1 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 1}
                onClick={() => setPage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 2}
                onClick={() => setPage(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={page === 3}
                onClick={() => setPage(3)}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => page != 3 && setPage(page + 1)}
                className={page === 3 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
