import arrowLeftIcon from "../../../assets/images/dashboard/arrow-left.png";

export default function CoursePagination({
  currentPage,
  setCurrentPage,
  totalCount = 0,
  itemsPerPage = 7,
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2 pb-6" dir="ltr">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-bg-field hover:text-text-dark disabled:opacity-50"
      >
        <img src={arrowLeftIcon} alt="قبلی" className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1 rounded-2xl bg-bg-light px-2 py-1 dark:bg-bg-field">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{ fontFamily: "Arial, sans-serif" }}
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
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        <img src={arrowLeftIcon} alt="بعدی" className="h-5 w-5 rotate-180" />
      </button>
    </div>
  );
}
