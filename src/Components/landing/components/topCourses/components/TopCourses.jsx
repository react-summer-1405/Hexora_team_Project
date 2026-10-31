import CourseCard from "./course/components/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getCoursesTop } from "../../../../../core/services/home/getCoursesTop";

import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import PendingCard from "../../../../common/PendingCard";

const TopCourses = () => {


  const {
    data: topCourses,
    isError,
    error,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["coursesTop"],
    queryFn: getCoursesTop,
  });

  if (isPending)
    return (
      <div className="flex flex-row flex-wrap gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <PendingCard key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="w-full max-w-343 py-8 px-6">
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

  const result = topCourses.data;

  if (topCourses)
    return (

        <div
          className={` w-max flex flex-row  justify-center items-center gap-6 max-w-345 overflow-x-hidden  py-5 px-6 `}
        >
          {result.map((course) => (
            <div className="flex" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>

    );
};

export default TopCourses;
