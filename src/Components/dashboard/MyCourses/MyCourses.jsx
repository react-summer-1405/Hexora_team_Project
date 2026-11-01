import React from "react";
import { useCourses } from "../../../hooks/dashboard/useCourses";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";

export default function MyCourses() {
  const { data, isLoading, isError } = useCourses();
  const latestCourses = data?.courseFilterDtos?.slice(0, 3) || [];

  return (
    <div
      className="mt-6 w-full lg:w-[75%] rounded-[24px] bg-bg-light p-4 md:p-6 text-right"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-800">دوره من</h3>
        <a
          href="/courses"
          className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[20px] w-[20px]"
          />
          مشاهده بیشتر
        </a>
      </div>

      <div className="mb-4 hidden md:grid grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] items-center rounded-2xl bg-text-light px-4 py-3 text-center text-xs font-medium text-gray-500">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="py-4 text-center text-sm text-gray-500">
            در حال دریافت اطلاعات دوره‌ها...
          </div>
        ) : isError ? (
          <div className="py-4 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات.
          </div>
        ) : (
          latestCourses.map((course) => {
            return (
              <div
                key={course.courseId}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm md:grid md:grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] md:items-center md:gap-0 md:border-none md:p-0 md:px-4 md:text-center md:shadow-none"
              >
                <div className="flex items-center gap-3 md:contents">
                  <img
                    src={course.tumbImageAddress || "/default-placeholder.png"}
                    alt={course.title}
                    className="h-[52px] w-[83px] shrink-0 rounded-[14px] object-cover shadow-sm md:mx-auto"
                  />

                  <div className="flex flex-col gap-1 md:contents">
                    <span
                      className="truncate whitespace-nowrap text-sm font-bold text-text-dark"
                      title={course.title}
                    >
                      {course.title.length > 20
                        ? course.title.substring(0, 20) + "..."
                        : course.title}
                    </span>
                    <span className="text-xs font-medium text-gray-500 md:hidden">
                      {course.teacherName}
                    </span>
                  </div>
                </div>

                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  {course.teacherName}
                </span>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3 md:contents md:border-none md:pt-0">
                  <span className="text-xs font-medium text-gray-600 md:text-sm md:text-gray-700">
                    {new Date(course.startTime).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>

                  <div className="flex items-center justify-center md:mx-auto">
                    <span className="rounded-full bg-[#F43DF4] px-3 py-1 text-[10px] font-medium tracking-wide text-white md:px-4 md:py-1.5 md:text-[11px]">
                      {course.levelName}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 md:justify-center">
                    <button className="transition-opacity hover:opacity-75">
                      <img
                        src={viewIcon}
                        alt="مشاهده"
                        className="h-[24px] w-[24px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
