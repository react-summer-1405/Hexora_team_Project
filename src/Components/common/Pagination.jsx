import { Pagination } from "@heroui/react";

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium " +
  "transition-colors duration-200 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const linkClass =
  base + " text-muted hover:bg-surface hover:text-foreground cursor-pointer ";

const activeClass =
  base +
  " bg-primary text-text-white hover:bg-primary-hover shadow-sm cursor-pointer";

const disabledClass = "opacity-40 pointer-events-none";

const PaginationBox = ({ setPage, page, totalPages, isPending }) => {
  return (
    <Pagination
      className={`flex flex-row justify-center self-center mt-4
        transition-opacity duration-200
        ${isPending ? "opacity-40" : "opacity-100"}
      `}
    >
      <Pagination.Content className="flex flex-row-reverse gap-1 rounded-2xl bg-bg-lightGray p-1.5">
        <Pagination.Item>
          <Pagination.Previous
            className={`${linkClass} ${page === 1 ? disabledClass : ""}`}
            isDisabled={page === 1}
            onPress={() => setPage((p) => p - 1)}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link
              className={
                p === page ? activeClass : linkClass
              }
              isActive={p === page}
              isPending={isPending}
              onPress={() => setPage(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        <Pagination.Item>
          <Pagination.Next
            className={`${linkClass} ${page === totalPages ? disabledClass : ""}`}
            isDisabled={page === totalPages}
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
