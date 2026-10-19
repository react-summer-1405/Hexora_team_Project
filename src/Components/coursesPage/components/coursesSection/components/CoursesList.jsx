import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CourseCard from "../../../../landing/components/topCourses/components/course/components/CourseCard";
import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import getCoursesByPagination from "../../../../../core/services/courses/getCoursesByPagination";
import PendingCard from "../../../../common/PendingCard";

const CoursesList = ({ page, sortParams, filters }) => {
  const rowsOfPage = 3;

  const { data, isError, error, isPending, refetch, isFetching } = useQuery({
    queryKey: ["coursesByPagination", page, rowsOfPage, sortParams, filters],
    queryFn: ({ signal }) =>
      getCoursesByPagination(
        {
          PageNumber: page,
          RowsOfPage: rowsOfPage,
          ...sortParams,
          ...filters,
        },
        signal,
      ),
    placeholderData: keepPreviousData,
  });

  const searchText = filters.Query?.trim();
  const visibleCourses = searchText
    ? data.filter((c) => c.title.includes(searchText))
    : data;

  if (isPending)
    return (
      <div className="flex flex-row flex-wrap gap-6">
        {Array.from({ length: rowsOfPage }, (_, i) => (
          <PendingCard key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="w-full  py-8 px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
            <img src={warningIcon} className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            دریافت دوره‌ها با مشکل مواجه شد
          </h3>
          <p className="text-sm text-gray-500">
            {error?.message || "لطفاً اتصال اینترنت خود را بررسی کنید."}
          </p>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="cursor-pointer rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "در حال تلاش..." : "تلاش دوباره"}
          </button>
        </div>
      </div>
    );

  if (data)
    return (
    
        <div
          className={`   flex flex-row flex-wrap lg:justify-start justify-center  items-start gap-8 `}
        >
          {visibleCourses.map((course) => (
            <CourseCard course={course} id={course.courseId} />
          ))}
        </div>
      
    );
};

export default CoursesList;
