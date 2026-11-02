import React, { useState } from "react";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

export default function FavoriteBlogList({ blogs, isLoading, isError }) {
  const [failedImages, setFailedImages] = useState({});

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-6 rounded-[24px] bg-bg-light p-4 pb-6 lg:p-6 lg:pb-8"
        dir="rtl"
      >
        <div className="hidden h-[44px] items-center rounded-2xl bg-text-light px-4 text-center text-sm font-medium text-gray-500 lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px]">
          <span>#</span>
          <span className="text-right">نام خبر</span>
          <span>نویسنده</span>
          <span>تاریخ انتشار</span>
          <span>تاریخ آخرین ویرایش</span>
          <span>دسته‌بندی</span>
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
        <span className="text-right">نام خبر</span>
        <span>نویسنده</span>
        <span>تاریخ انتشار</span>
        <span>تاریخ آخرین ویرایش</span>
        <span>وضعیت</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8">
        {!blogs || blogs.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            هیچ بلاگی یافت نشد.
          </div>
        ) : (
          blogs.map((blog, index) => {
            const currentId = blog.favoriteId || index;
            const title = blog.title || blog.news?.title;
            const author = blog.auther || "نامشخص";
            const imageSrc =
              blog.currentImageAddressTumb ||
              blog.news?.currentImageAddressTumb ||
              "/default-placeholder.png";
            const publishDate = blog.news?.insertDate;
            const updateDate = blog.news?.updateDate;
            const isActive = blog.news?.active;

            return (
              <div
                key={currentId}
                className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_80px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
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

                <div className="flex items-center justify-between text-sm font-bold text-text-dark lg:block lg:font-medium lg:text-gray-700">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    نویسنده:
                  </span>
                  <span>{author}</span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ انتشار:
                  </span>
                  <span>
                    {publishDate
                      ? new Date(publishDate).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ ویرایش:
                  </span>
                  <span>
                    {updateDate
                      ? new Date(updateDate).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 lg:mt-0 lg:contents lg:border-none lg:pt-0">
                  <div className="flex items-center justify-start lg:mx-auto lg:justify-center">
                    <span
                      className={`rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wide text-white ${
                        isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isActive ? "فعال" : "غیرفعال"}
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
            );
          })
        )}
      </div>
    </div>
  );
}
