import React, { useState } from "react";
import viewIcon from "../../../assets/icons/dashboard/view.png";

export default function CourseList({ courses, isLoading, isError }) {
  const [failedImages, setFailedImages] = useState({});

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm font-medium text-gray-500">
        در حال دریافت اطلاعات دوره‌ها...
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
      <div className="hidden h-[44px] items-center rounded-2xl bg-text-light px-4 text-center text-sm font-medium text-gray-500 lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_40px]">
        <span>#</span>
        <span className="text-right">نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>تاریخ اتمام</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8">
        {!courses || courses.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            هیچ دوره‌ای یافت نشد.
          </div>
        ) : (
          courses.map((item, index) => {
            const currentId =
              item.favoriteId || item.courseId || item.id || index;
            const title = item.courseTitle || item.title;
            const teacher = item.teacheName || item.teacherName;
            const imageSrc =
              item.imageAddress ||
              item.tumbImageAddress ||
              "/default-placeholder.png";
            const startTime = item.course?.startTime || item.startTime;
            const endTime = item.course?.endTime || item.endTime;
            const level = item.course?.levelName || item.levelName || "پیشرفته";

            return (
              <div
                key={currentId}
                className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_40px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
              >
                <div className="hidden lg:block">
                  {!failedImages[currentId] ? (
                    <img
                      src={imageSrc}
                      alt={title}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [currentId]: true,
                        }))
                      }
                      className="mx-auto h-12 w-12 rounded-[14px] object-cover shadow-sm"
                    />
                  ) : (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-gray-200 text-[10px] text-gray-500 shadow-sm">
                      بدون عکس
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 lg:block lg:text-right">
                  {!failedImages[currentId] ? (
                    <img
                      src={imageSrc}
                      alt={title}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [currentId]: true,
                        }))
                      }
                      className="h-14 w-14 rounded-[14px] object-cover shadow-sm lg:hidden"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-gray-200 text-[10px] text-gray-500 shadow-sm lg:hidden">
                      بدون عکس
                    </div>
                  )}
                  <span className="truncate text-sm font-bold text-text-dark">
                    {title}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-bold text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    مدرس:
                  </span>
                  <span>{teacher}</span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ برگزاری:
                  </span>
                  <span>
                    {startTime
                      ? new Date(startTime).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ اتمام:
                  </span>
                  <span>
                    {endTime
                      ? new Date(endTime).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 lg:mt-0 lg:contents lg:border-none lg:pt-0">
                  <div className="flex items-center justify-start lg:mx-auto lg:justify-center">
                    <span className="rounded-full bg-[#F43DF4] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white">
                      {level}
                    </span>
                  </div>

                  <div className="flex items-center justify-end lg:justify-center">
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
