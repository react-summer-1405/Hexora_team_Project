import viewIcon from "../../../assets/icons/dashboard/view.png";

export default function CourseList({ courses, isLoading, isError }) {
  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm font-medium text-text-muted">
        در حال دریافت اطلاعات دوره‌ها...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-sm font-medium text-danger">
        خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-6 rounded-[24px] bg-bg-light p-4 pb-6 lg:p-6 lg:pb-8 dark:bg-bg-field"
      dir="rtl"
    >
      <div className="hidden h-[44px] items-center rounded-2xl bg-bg-field px-4 text-center text-sm font-medium text-text-muted lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_40px] dark:bg-bg-light">
        <span>#</span>
        <span className="text-right">نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>تاریخ اتمام</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8">
        {courses.length === 0 ? (
          <div className="py-10 text-center text-sm text-text-muted">
            هیچ دوره‌ای یافت نشد.
          </div>
        ) : (
          courses.map((course, index) => (
            <div
              key={course.courseId || index}
              className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_40px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none dark:bg-bg-light dark:lg:bg-transparent"
            >
              <div className="hidden lg:block">
                <img
                  src={course.tumbImageAddress || "/default-placeholder.png"}
                  alt={course.title}
                  className="mx-auto h-12 w-12 rounded-[14px] object-cover shadow-sm"
                />
              </div>

              <div className="flex items-center gap-3 lg:block lg:text-right">
                <img
                  src={course.tumbImageAddress || "/default-placeholder.png"}
                  alt={course.title}
                  className="h-14 w-14 rounded-[14px] object-cover shadow-sm lg:hidden"
                />
                <span className="truncate text-sm font-bold text-text-dark">
                  {course.title}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-text-dark lg:block">
                <span className="text-xs font-normal text-text-muted lg:hidden">
                  مدرس:
                </span>
                <span>{course.teacherName}</span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                <span className="text-xs font-normal text-text-muted lg:hidden">
                  تاریخ برگزاری:
                </span>
                <span>
                  {course.startTime
                    ? new Date(course.startTime).toLocaleDateString("fa-IR")
                    : "ثبت نشده"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                <span className="text-xs font-normal text-text-muted lg:hidden">
                  تاریخ اتمام:
                </span>
                <span>
                  {course.endTime
                    ? new Date(course.endTime).toLocaleDateString("fa-IR")
                    : "ثبت نشده"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-3 lg:mt-0 lg:contents lg:border-none lg:pt-0">
                <div className="flex items-center justify-start lg:mx-auto lg:justify-center">
                  <span className="rounded-full bg-badge-purple px-4 py-1.5 text-[11px] font-medium tracking-wide text-text-light">
                    {course.levelName || "پیشرفته"}
                  </span>
                </div>

                <div className="flex items-center justify-end lg:justify-center">
                  <button className="transition-opacity hover:opacity-75">
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