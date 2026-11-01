import React from "react";
import { useCourses } from "../../../hooks/dashboard/useCourses";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

export default function MyReserves() {
  const { data, isLoading, isError } = useCourses({
    page: 1,
    search: "",
  });

  const reserves = data?.courseFilterDtos || [];

  if (isLoading) {
    return (
      <div className="mt-6 w-full rounded-[24px] bg-bg-light p-10 text-center text-sm font-medium text-gray-500">
        در حال دریافت اطلاعات رزروها...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 w-full rounded-[24px] bg-bg-light p-10 text-center text-sm font-medium text-red-500">
        خطا در دریافت اطلاعات.
      </div>
    );
  }

  return (
    <div
      className="mt-6 w-full rounded-[24px] bg-bg-light p-4 text-right md:p-6"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-800">رزرو من</h3>
        <a
          href="/reserves"
          className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[20px] w-[20px]"
          />
          مشاهده بیشتر
        </a>
      </div>

      <div className="mb-4 hidden items-center rounded-2xl bg-text-light px-4 py-3 text-center text-xs font-medium text-gray-500 md:grid md:grid-cols-[60px_1.5fr_1fr_1fr_80px]">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>وضعیت</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {reserves.map((reserve, index) => (
          <div
            key={reserve.courseId || index}
            className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm md:grid md:grid-cols-[60px_1.5fr_1fr_1fr_80px] md:items-center md:gap-0 md:border-none md:p-0 md:px-4 md:text-center md:shadow-none"
          >
            <div className="flex items-center gap-3 md:contents">
              <img
                src={reserve.tumbImageAddress || "/default-placeholder.png"}
                alt={reserve.title}
                className="h-14 w-14 shrink-0 rounded-[14px] object-cover shadow-sm md:mx-auto md:h-12 md:w-12"
              />

              <div className="flex flex-col gap-1 md:contents">
                <span className="truncate text-sm font-bold text-[#2F2F2F]">
                  {reserve.title}
                </span>
                <span className="text-xs font-medium text-gray-500 md:hidden">
                  {reserve.teacherName}
                </span>
              </div>
            </div>

            <span className="hidden text-sm font-medium text-gray-700 md:block">
              {reserve.teacherName}
            </span>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3 md:contents md:border-none md:pt-0">
              <div className="flex items-center justify-center md:mx-auto">
                <span className="rounded-full bg-red-500 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white">
                  تایید نشده
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
                <button className="transition-opacity hover:opacity-75">
                  <img
                    src={cancelIcon}
                    alt="حذف"
                    className="h-[20px] w-[20px]"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
