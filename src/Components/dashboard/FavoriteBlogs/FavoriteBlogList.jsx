import React from "react";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

export default function FavoriteBlogList({ blogs, isLoading, isError }) {
  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-6 rounded-[24px] bg-bg-light p-4 pb-6 lg:p-6 lg:pb-8"
        dir="rtl"
      >
        <div className="hidden h-[44px] items-center rounded-2xl bg-text-light px-4 text-center text-sm font-medium text-gray-500 lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px]">
          <span>#</span>
          <span className="text-right">نام</span>
          <span>مدرس</span>
          <span>تاریخ برگزاری</span>
          <span>تاریخ اتمام</span>
          <span>سطح</span>
          <span></span>
        </div>
        <div className="flex flex-col gap-4 lg:gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none animate-pulse"
            >
              <div className="hidden lg:block h-12 w-12 rounded-[14px] bg-gray-200 mx-auto"></div>
              <div className="flex items-center gap-3 lg:block lg:text-right">
                <div className="h-14 w-14 shrink-0 rounded-[14px] bg-gray-200 lg:hidden"></div>
                <div className="h-4 w-3/4 rounded-full bg-gray-200 lg:mt-3"></div>
              </div>
              <div className="hidden lg:block h-4 w-2/3 rounded-full bg-gray-200 mx-auto"></div>
              <div className="hidden lg:block h-4 w-2/3 rounded-full bg-gray-200 mx-auto"></div>
              <div className="hidden lg:block h-4 w-2/3 rounded-full bg-gray-200 mx-auto"></div>
              <div className="hidden lg:flex justify-center">
                <div className="h-6 w-16 rounded-full bg-gray-200"></div>
              </div>
              <div className="hidden lg:flex justify-center gap-3">
                <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                <div className="h-5 w-5 rounded-full bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-sm font-medium text-red-500">
        خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-6 rounded-[24px] bg-bg-light p-4 pb-6 lg:p-6 lg:pb-8"
      dir="rtl"
    >
      <div className="hidden h-[44px] items-center rounded-2xl bg-text-light px-4 text-center text-sm font-medium text-gray-500 lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px]">
        <span>#</span>
        <span className="text-right">نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>تاریخ اتمام</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8">
        {!blogs || blogs.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            هیچ بلاگی یافت نشد.
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={blog.courseId || index}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
            >
              <div className="hidden lg:block">
                <img
                  src={blog.tumbImageAddress || "/default-placeholder.png"}
                  alt={blog.title}
                  className="mx-auto h-12 w-12 rounded-[14px] object-cover shadow-sm"
                />
              </div>

              <div className="flex items-center gap-3 lg:block lg:text-right">
                <img
                  src={blog.tumbImageAddress || "/default-placeholder.png"}
                  alt={blog.title}
                  className="h-14 w-14 rounded-[14px] object-cover shadow-sm lg:hidden"
                />
                <span className="truncate text-sm font-bold text-text-dark">
                  {blog.title || "نام دوره"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-text-dark lg:block lg:font-medium lg:text-gray-700">
                <span className="text-xs font-normal text-gray-500 lg:hidden">
                  مدرس:
                </span>
                <span>{blog.teacherName || "نام مدرس"}</span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                <span className="text-xs font-normal text-gray-500 lg:hidden">
                  تاریخ برگزاری:
                </span>
                <span>
                  {blog.startTime
                    ? new Date(blog.startTime).toLocaleDateString("fa-IR")
                    : "۲۹ اردیبهشت ۱۴۰۳"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                <span className="text-xs font-normal text-gray-500 lg:hidden">
                  تاریخ اتمام:
                </span>
                <span>
                  {blog.endTime
                    ? new Date(blog.endTime).toLocaleDateString("fa-IR")
                    : "۲۹ اردیبهشت ۱۴۰۳"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 lg:mt-0 lg:contents lg:border-none lg:pt-0">
                <div className="flex items-center justify-start lg:mx-auto lg:justify-center">
                  <span className="rounded-full bg-[#F43DF4] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white">
                    {blog.levelName || "پیشرفته"}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 lg:justify-center">
                  <button className="text-gray-400 transition-opacity hover:opacity-75">
                    <img
                      src={viewIcon}
                      alt="مشاهده"
                      className="h-[24px] w-[24px]"
                    />
                  </button>
                  <button className="text-red-400 transition-opacity hover:opacity-75">
                    <img
                      src={cancelIcon}
                      alt="حذف"
                      className="h-[20px] w-[20px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
