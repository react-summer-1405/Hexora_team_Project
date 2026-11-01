import { useState } from "react";
import { useCourses } from "../../hooks/dashboard/useCourses";

export default function MyCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useCourses({
    page: currentPage,
    search: searchText,
  });

  // استخراج آرایه دوره‌ها از دیتای دریافتی
  const courses = data?.courseFilterDtos || [];

  return (
    <div
      className="w-full rounded-[24px] bg-[#F8F9FA] p-6 text-right"
      dir="rtl"
    >
      {/* ۱. هدر و باکس جستجو */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <h2 className="text-lg font-bold text-gray-800">
          لیست تمام دوره‌های من
        </h2>
        <input
          type="text"
          placeholder="جستجوی دوره..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 md:w-72"
        />
      </div>

      {/* ۲. لیست دوره‌ها */}
      {isLoading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          در حال دریافت اطلاعات...
        </div>
      ) : isError ? (
        <div className="py-10 text-center text-sm text-red-500">
          خطا در برقراری ارتباط با سرور
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <span className="font-bold text-gray-800">{course.title}</span>
              <span className="text-sm font-medium text-gray-500">
                {course.teacherName}
              </span>
            </div>
          ))}
          {courses.length === 0 && (
            <div className="py-6 text-center text-sm text-gray-500">
              دوره‌ای یافت نشد.
            </div>
          )}
        </div>
      )}

      {/* ۳. دکمه‌های صفحه‌بندی */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors disabled:bg-gray-300"
        >
          قبلی
        </button>
        <span className="text-sm font-bold text-gray-700">
          صفحه {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          // اگر تعداد کل صفحات رو از بک‌اند دارید، می‌تونید اینجا دکمه رو غیرفعال کنید
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
