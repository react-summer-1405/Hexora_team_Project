import { Link } from "react-router-dom";
import { useCourses } from "../../../hooks/dashboard/useCourses";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";

export default function MyCourses() {
  const { data, isLoading, isError } = useCourses();
  const latestCourses = data?.courseFilterDtos?.slice(0, 3) || [];

  return (
    <div
      className="mt-6 w-full rounded-[24px] bg-bg-light p-4 text-right md:p-6 lg:w-[75%] dark:bg-bg-field"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-text-dark">دوره من</h3>

        <Link
          to="/dashboard/my-courses"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[20px] w-[20px]"
          />
          مشاهده بیشتر
        </Link>
      </div>

      <div className="mb-4 hidden grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] items-center rounded-2xl bg-bg-field px-4 py-3 text-center text-xs font-medium text-text-muted md:grid dark:bg-bg-light">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="py-4 text-center text-sm text-text-muted">
            در حال دریافت اطلاعات دوره‌ها...
          </div>
        ) : isError ? (
          <div className="py-4 text-center text-sm text-danger">
            خطا در دریافت اطلاعات.
          </div>
        ) : latestCourses.length === 0 ? (
          <div className="py-4 text-center text-sm text-text-muted">
            دوره‌ای برای نمایش وجود ندارد.
          </div>
        ) : (
          latestCourses.map((course) => (
            <div
              key={course.courseId}
              className="flex flex-col gap-4 rounded-2xl border border-border/50 p-4 shadow-sm md:grid md:grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] md:items-center md:gap-0 md:border-none md:p-0 md:px-4 md:text-center md:shadow-none"
            >
              <div className="flex items-center gap-3 md:contents">
                <img
                  src={course.tumbImageAddress || "/default-placeholder.png"}
                  alt={course.title}
                  className="h-[52px] w-[83px] shrink-0 rounded-[14px] object-cover shadow-sm md:mx-auto"
                />

                <div className="flex flex-col gap-1 md:contents">
                  <span
                    className="truncate whitespace-nowrap text-sm font-bold text-text-dark"
                    title={course.title}
                  >
                    {course.title?.length > 20
                      ? course.title.substring(0, 20) + "..."
                      : course.title}
                  </span>

                  <span className="text-xs font-medium text-text-muted md:hidden">
                    {course.teacherName}
                  </span>
                </div>
              </div>

              <span className="hidden text-sm font-medium text-text-dark md:block">
                {course.teacherName}
              </span>

              <div className="flex items-center justify-between border-t border-border/30 pt-3 md:contents md:border-none md:pt-0">
                <span className="text-xs font-medium text-text-muted md:text-sm md:text-text-dark">
                  {course.startTime
                    ? new Date(course.startTime).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
                </span>

                <div className="flex items-center justify-center md:mx-auto">
                  <span className="rounded-full bg-badge-purple px-3 py-1 text-[10px] font-medium tracking-wide text-text-light md:px-4 md:py-1.5 md:text-[11px]">
                    {course.levelName}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 md:justify-center">
                  <button
                    type="button"
                    className="transition-opacity hover:opacity-75"
                    aria-label="مشاهده دوره"
                  >
                    <img
                      src={viewIcon}
                      alt="مشاهده"
                      className="h-[24px] w-[24px] dark:invert"
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