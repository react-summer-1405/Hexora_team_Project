export default function CoursePagination({
  currentPage,
  setCurrentPage,
  hasMore,
}) {
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="mt-8 flex items-center justify-center gap-2 pb-6" dir="ltr">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-bg-field hover:text-text-dark disabled:opacity-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="flex items-center gap-1 rounded-2xl bg-bg-light px-2 py-1 dark:bg-bg-field">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
              currentPage === page
                ? "bg-primary text-text-light shadow-sm"
                : "text-text-muted hover:bg-border"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={!hasMore}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-bg-field hover:text-text-dark disabled:opacity-50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}