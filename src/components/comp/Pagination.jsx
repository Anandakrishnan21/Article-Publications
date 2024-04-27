import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationElement({ totalItems, paginate, currentPage }) {
  const prevBtnHandle = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    } else {
      paginate(currentPage);
    }
  };
  
  const nextBtnHandle = () => {
    const totalPages = Math.ceil(totalItems / 5);
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    } else {
      paginate(currentPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <PaginationPrevious onClick={prevBtnHandle} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="h-8 border hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer hover:border-neutral-300">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={nextBtnHandle} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
