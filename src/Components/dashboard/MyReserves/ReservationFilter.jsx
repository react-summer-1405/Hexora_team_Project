import React from "react";
import * as DatePickerModule from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar-02-stroke-rounded 2.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

const DatePicker =
  DatePickerModule.default?.default ||
  DatePickerModule.default ||
  DatePickerModule.DatePicker;

export default function ReservationFilter({
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus,
  dateRange,
  setDateRange,
  setCurrentPage,
}) {
  const handleDateChange = (dates) => {
    setDateRange(Array.isArray(dates) ? dates : []);
    setCurrentPage(1);
  };

  const clearDateRange = () => {
    setDateRange([]);
    setCurrentPage(1);
  };

  return (
    <div className="mb-6 flex flex-col gap-6" dir="rtl">
      <h2 className="text-xl font-bold text-right text-gray-800">رزرو من</h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-gray-800">
            <img
              src={searchLabelIcon}
              alt="جست‌وجو"
              className="h-[24px] w-[24px]"
            />
            <span className="text-sm font-bold">جست‌وجو</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="flex h-[48px] w-full items-center rounded-[16px] bg-text-light lg:w-[340px]"
          >
            <input
              type="text"
              placeholder="دوره مورد نظر را جست‌وجو کنید..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent px-4 pr-6 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-600"
            >
              <img
                src={searchBtnIcon}
                alt="جست‌وجو"
                className="h-[24px] w-[24px]"
              />
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-gray-800">
            <img src={calendarIcon} alt="تقویم" className="h-[24px] w-[24px]" />
            <span className="text-sm font-bold">تاریخ برگزاری - اتمام</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:min-w-[260px]">
              <DatePicker
                value={dateRange}
                onChange={handleDateChange}
                range
                rangeHover
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                digits={["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]}
                dateSeparator=" تا "
                placeholder="انتخاب بازه تاریخ"
                inputClass="h-12 w-full rounded-[16px] bg-text-light px-6 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400 text-right"
                containerClassName="w-full"
                calendarPosition="bottom-right"
                zIndex={1000}
                editable={false}
              />
            </div>

            {dateRange.length > 0 && (
              <button
                type="button"
                onClick={clearDateRange}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <img
                  src={cancelIcon}
                  alt="پاک کردن"
                  className="h-[16px] w-[16px]"
                />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 pb-2 lg:pb-1">
          <span className="text-sm font-bold text-gray-800">ترتیب</span>

          <button
            type="button"
            onClick={() => {
              setFilterStatus(filterStatus === "approved" ? null : "approved");
              setCurrentPage(1);
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-all ${
              filterStatus === "approved"
                ? "border-red-400 bg-white text-red-500"
                : "border-gray-400 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            تایید شده
            {filterStatus === "approved" && (
              <img src={cancelIcon} alt="لغو" className="h-[16px] w-[16px]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setFilterStatus(
                filterStatus === "unapproved" ? null : "unapproved",
              );
              setCurrentPage(1);
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-all ${
              filterStatus === "unapproved"
                ? "border-red-400 bg-white text-red-500"
                : "border-gray-400 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            تایید نشده
            {filterStatus === "unapproved" && (
              <img src={cancelIcon} alt="لغو" className="h-[16px] w-[16px]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
