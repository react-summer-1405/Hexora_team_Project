import React from "react";
import * as DatePickerModule from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar.svg";

const DatePickerComponent = [
  DatePickerModule.default?.default,
  DatePickerModule.default,
  DatePickerModule.DatePicker,
].find(
  (component) =>
    typeof component === "function" ||
    (typeof component === "object" &&
      component !== null &&
      "$$typeof" in component),
);

export default function CourseFilter({
  searchText,
  setSearchText,
  setCurrentPage,
  dateRange = [],
  setDateRange,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates)) {
      setDateRange(dates);
      setCurrentPage(1);
    }
  };

  const handleClearDate = () => {
    setDateRange([]);
    setCurrentPage(1);
  };

  return (
    <div className="mb-6 flex flex-col gap-6" dir="rtl">
      <h2 className="text-right text-xl font-bold text-text-dark">دوره من</h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-text-dark">
            <img
              src={searchLabelIcon}
              alt="جستجو"
              className="h-[24px] w-[24px] dark:invert"
            />
            <span className="text-sm font-bold">جستجو</span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex h-12 w-full items-center rounded-[16px] bg-text-light lg:w-auto"
          >
            <input
              type="text"
              placeholder="دوره مورد نظر را جستجو کنید..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className="min-w-0 flex-1 bg-transparent px-4 pr-6 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400 lg:w-64 lg:flex-none"
            />

            <button
              type="submit"
              aria-label="جستجو"
              className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-600"
            >
              <img
                src={searchBtnIcon}
                alt="جستجو"
                className="h-[24px] w-[24px]"
              />
            </button>
          </form>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center gap-1 text-gray-800">
            <img src={calendarIcon} alt="تقویم" className="h-[24px] w-[24px]" />
            <span className="text-base font-medium">تاریخ برگزاری - اتمام</span>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-2 lg:w-[320px]">
            {DatePickerComponent && (
              <DatePickerComponent
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
            )}

            {dateRange.length === 1 && (
              <span className="text-xs text-gray-400">
                لطفاً تاریخ پایان را هم انتخاب کنید.
              </span>
            )}

            {dateRange.length > 0 && (
              <button
                type="button"
                onClick={handleClearDate}
                className="w-fit text-xs font-medium text-red-500 transition-colors hover:text-red-700"
              >
                پاک کردن فیلتر تاریخ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}