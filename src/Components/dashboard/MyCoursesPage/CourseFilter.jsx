import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar.svg";

export default function CourseFilter({
  searchText,
  setSearchText,
  setCurrentPage,
}) {
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

          <div className="flex h-12 w-full items-center rounded-[16px] bg-bg-field lg:w-auto">
            <input
              type="text"
              placeholder="دوره مورد نظر را جستجو کنید..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent px-4 pr-6 text-xs font-medium text-text-dark outline-none placeholder:text-text-muted lg:w-64"
            />
            <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-primary text-text-light shadow-sm transition-colors hover:bg-primary-hover">
              <img
                src={searchBtnIcon}
                alt="جستجو"
                className="h-[24px] w-[24px]"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-text-dark">
            <img
              src={calendarIcon}
              alt="تقویم"
              className="h-[24px] w-[24px] dark:invert"
            />
            <span className="text-base font-medium">تاریخ برگزاری - اتمام</span>
          </div>

          <div className="flex h-12 w-full items-center justify-center rounded-[16px] bg-bg-field px-6 text-xs font-medium text-text-muted lg:w-auto lg:min-w-[200px]">
            ۲۹ اردیبهشت ۱۴۰۳ - ۵ خرداد ۱۴۰۳
          </div>
        </div>
      </div>
    </div>
  );
}