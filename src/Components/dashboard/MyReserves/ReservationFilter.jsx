import searchBtnIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 2.png";
import searchLabelIcon from "../../../assets/icons/dashboard/search-01-stroke-rounded 1.png";
import calendarIcon from "../../../assets/icons/dashboard/calendar.svg";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";

export default function ReservationFilter({
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus,
  setCurrentPage,
}) {
  return (
    <div className="mb-6 flex flex-col gap-6" dir="rtl">
      <h2 className="text-right text-xl font-bold text-text-dark">رزرو من</h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-text-dark">
            <img
              src={searchLabelIcon}
              alt="جست‌جو"
              className="h-[24px] w-[24px] dark:invert"
            />
            <span className="text-sm font-bold">جست‌جو</span>
          </div>

          <div className="flex h-[48px] w-full items-center rounded-[16px] bg-bg-field lg:w-[340px]">
            <input
              type="text"
              placeholder="دوره مورد نظر را جست‌جو کنید..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent px-4 pr-6 text-xs font-medium text-text-dark outline-none placeholder:text-text-muted"
            />
            <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] bg-primary text-text-light shadow-sm transition-colors hover:bg-primary-hover">
              <img
                src={searchBtnIcon}
                alt="جست‌جو"
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
            <span className="text-sm font-bold">تاریخ برگزاری - اتمام</span>
          </div>

          <div className="flex h-[48px] items-center justify-center rounded-[16px] bg-bg-field px-6 text-xs font-medium text-text-muted md:min-w-[260px]">
            ۲۹ اردیبهشت ۱۴۰۳ - ۵ خرداد ۱۴۰۳
          </div>
        </div>

        <div className="flex items-center justify-start gap-3 pb-2 lg:pb-1">
          <span className="text-sm font-bold text-text-dark">ترتیب</span>

          <button
            onClick={() => {
              setFilterStatus(filterStatus === "approved" ? null : "approved");
              setCurrentPage(1);
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full border bg-bg-main px-5 text-sm font-medium transition-all ${
              filterStatus === "approved"
                ? "border-danger text-danger"
                : "border-text-muted text-text-dark hover:bg-bg-field"
            }`}
          >
            تایید شده
            {filterStatus === "approved" && (
              <img src={cancelIcon} alt="لغو" className="h-[16px] w-[16px]" />
            )}
          </button>

          <button
            onClick={() => {
              setFilterStatus(
                filterStatus === "unapproved" ? null : "unapproved",
              );
              setCurrentPage(1);
            }}
            className={`flex h-10 items-center justify-center gap-2 rounded-full border bg-bg-main px-5 text-sm font-medium transition-all ${
              filterStatus === "unapproved"
                ? "border-danger text-danger"
                : "border-text-muted text-text-dark hover:bg-bg-field"
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