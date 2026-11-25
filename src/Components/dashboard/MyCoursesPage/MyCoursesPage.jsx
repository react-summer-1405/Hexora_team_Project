import { useState, useEffect, useCallback } from "react";
import { getMyCourses } from "../../core/services/dashboard/myCourses.api";
import CourseList from "../../Components/dashboard/MyCoursesPage/CourseList";

export default function MyCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const rowsOfPage = 10;
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsOfPage));

  const fetchMyCourses = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getMyCourses({
        page: currentPage,
        rows: rowsOfPage,
        search: searchText,
      });

      const list = Array.isArray(data?.listOfMyCourses)
        ? data.listOfMyCourses
        : [];

      setCourses(list);
      setTotalCount(data?.totalCount ?? list.length);
    } catch (err) {
      console.error("خطا در دریافت دوره‌های من:", err);
      setIsError(true);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchText]);

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  return (
    <div
      className="flex w-full flex-col gap-6 rounded-[24px] bg-[#F8F9FA] p-6 text-right"
      dir="rtl"
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-800">
            لیست تمام دوره‌های من
          </h2>
          <span className="text-xs font-medium text-gray-500">
            ({totalCount} دوره)
          </span>
        </div>

        <input
          type="text"
          placeholder="جستجوی دوره..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 md:w-72"
        />
      </div>

      <CourseList courses={courses} isLoading={isLoading} isError={isError} />

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors disabled:bg-gray-300"
        >
          قبلی
        </button>

        <span className="text-sm font-bold text-gray-700">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          type="button"
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage >= totalPages}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
