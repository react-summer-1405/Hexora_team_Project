
import { Pagination } from "@heroui/react";

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium " +
  "transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const linkClass =
  base + " text-muted hover:bg-surface hover:text-foreground cursor-pointer";

const activeClass =
  base +
  " bg-primary text-text-white hover:bg-primary-hover shadow-sm cursor-pointer";

const disabledClass = "opacity-40 pointer-events-none";

const getVisiblePages = (page, totalPages) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 2) {
    return [1, 2, 3, "...", totalPages];
  }

  if (page >= totalPages - 1) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page, "...", totalPages];
};

const PaginationBox = ({ setPage, page, totalPages, isPending }) => {
  if (!totalPages || totalPages <= 0) return null;

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <Pagination
      className={`pagination flex flex-row justify-center self-center mt-4
        transition-opacity duration-200
        ${isPending ? "opacity-40" : "opacity-100"}
      `}
    >
      <Pagination.Content className="flex flex-row-reverse gap-1 rounded-2xl bg-bg-lightGray p-1.5">

        <Pagination.Item>
          <Pagination.Previous
            className={`${linkClass} ${page === 1 ? disabledClass : ""}`}
            isDisabled={page === 1 || isPending}
            onPress={() => setPage((p) => p - 1)}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>

        {visiblePages.map((p, index) => (
          <Pagination.Item key={`${p}-${index}`}>
            {p === "..." ? (
              <span className="flex h-10 min-w-10 items-center justify-center text-muted">
                ...
              </span>
            ) : (
              <Pagination.Link
                className={p === page ? activeClass : linkClass}
                isActive={p === page}
                isPending={isPending}
                onPress={() => setPage(p)}
              >
                {p}
              </Pagination.Link>
            )}
          </Pagination.Item>
        ))}

        <Pagination.Item>
          <Pagination.Next
            className={`${linkClass} ${page === totalPages ? disabledClass : ""}`}
            isDisabled={page === totalPages || isPending}
            onPress={() => setPage((p) => p + 1)}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>

      </Pagination.Content>
    </Pagination>
  );
};

export default PaginationBox;
