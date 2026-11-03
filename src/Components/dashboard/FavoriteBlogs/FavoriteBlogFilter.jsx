import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar-02-stroke-rounded 2.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

export default function FavoriteBlogFilter({
  searchText,
  setSearchText,
  setCurrentPage,
  dateRange,
  setDateRange,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates) => {
    const selectedDates = Array.isArray(dates) ? dates : dates ? [dates] : [];
    setDateRange(selectedDates);
    setCurrentPage(1);

    if (selectedDates.length === 2) {
      setIsCalendarOpen(false);
    }
  };

  const clearDateRange = () => {
    setDateRange([]);
    setCurrentPage(1);
    setIsCalendarOpen(false);
  };

  const getDateLabel = () => {
    if (!dateRange || dateRange.length === 0) {
      return "انتخاب بازه تاریخ";
    }

    const startDate = dateRange[0]?.format
      ? dateRange[0].format("YYYY/MM/DD")
      : "";

    const endDate =
      dateRange.length === 2 && dateRange[1]?.format
        ? dateRange[1].format("YYYY/MM/DD")
        : "";

    return endDate ? `${startDate} تا ${endDate}` : `${startDate} تا ...`;
  };

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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
              className="flex h-[48px] w-full items-center rounded-[16px] bg-text-light lg:w-[340px]"
            >
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
              <button
                type="submit"
                className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-600"
              >
                <img
                  src={searchBtnIcon}
                  alt="جست‌جو"
                  className="h-[24px] w-[24px]"
                />
              </button>
            </form>
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

            <div className="flex items-center gap-2">
              <div className="relative w-full md:min-w-[260px]">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                  className="flex h-[48px] w-full items-center justify-between rounded-[16px] bg-text-light px-6 text-right text-xs font-medium text-gray-500"
                >
                  <span>{getDateLabel()}</span>

                  <img
                    src={calendarIcon}
                    alt="تقویم"
                    className="h-[18px] w-[18px]"
                  />
                </button>

                {isCalendarOpen && (
                  <div className="absolute right-0 top-[56px] z-[1000] rounded-2xl bg-white p-3 shadow-xl">
                    <Calendar
                      value={dateRange}
                      onChange={handleDateChange}
                      range
                      rangeHover
                      calendar={persian}
                      locale={persian_fa}
                      format="YYYY/MM/DD"
                      digits={[
                        "۰",
                        "۱",
                        "۲",
                        "۳",
                        "۴",
                        "۵",
                        "۶",
                        "۷",
                        "۸",
                        "۹",
                      ]}
                    />
                  </div>
                )}
              </div>

              {dateRange.length > 0 && (
                <button
                  type="button"
                  onClick={clearDateRange}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
                >
                  <img
                    src={cancelIcon}
                    alt="پاک کردن تاریخ"
                    className="h-[16px] w-[16px]"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
