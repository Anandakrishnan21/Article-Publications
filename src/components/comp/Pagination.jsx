import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationElement({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const prevBtnHandle = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    } else {
      paginate(currentPage);
    }
  };

  const nextBtnHandle = () => {
    if (totalItems > 5) {
      paginate(currentPage + 1);
    } else {
      paginate(currentPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={prevBtnHandle}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="h-8 border hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer hover:border-neutral-300">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={nextBtnHandle} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
