import React from "react";
import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar.svg";

export default function FavoriteBlogFilter({
  searchText,
  setSearchText,
  setCurrentPage,
}) {
  return (
    <div className="mb-6 flex flex-col gap-6" dir="rtl">
      <h2 className="text-xl font-bold text-right text-gray-800">
        بلاگ های موردعلاقه
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 text-gray-800">
              <img
                src={searchLabelIcon}
                alt="جست‌جو"
                className="h-[24px] w-[24px]"
              />
              <span className="text-sm font-bold">جست‌جو</span>
            </div>

            <div className="flex h-[48px] w-full items-center rounded-[16px] bg-text-light lg:w-[340px]">
              <input
                type="text"
                placeholder="مورد نظر را جست‌جو کنید..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-transparent px-4 pr-6 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-600">
                <img
                  src={searchBtnIcon}
                  alt="جست‌جو"
                  className="h-[24px] w-[24px]"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 text-gray-800">
              <img
                src={calendarIcon}
                alt="تقویم"
                className="h-[24px] w-[24px]"
              />
              <span className="text-sm font-bold">تاریخ برگزاری - اتمام</span>
            </div>

            <div className="flex h-[48px] items-center justify-center rounded-[16px] bg-text-light px-6 text-xs font-medium text-gray-500 md:min-w-[260px]">
              ۲۹ اردیبهشت ۱۴۰۳ - ۵ خرداد ۱۴۰۳
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
