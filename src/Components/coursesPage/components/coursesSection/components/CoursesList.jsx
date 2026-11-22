import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CourseCard from "../../../../landing/components/topCourses/components/course/components/CourseCard";
import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import getCoursesByPagination from "../../../../../core/services/courses/getCoursesByPagination";
import PendingCard from "../../../../common/PendingCard";
import PaginationBox from "../../../../common/Pagination";
import SortingRow from "./SortingRow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useEffect, useRef } from "react";


const CoursesList = ({
  page,
  setPage,
  sortParams,
  filters,
  sortingButtons,
  selected,
  sortingHandler,
  toggle,
  isOpenModal,
}) => {
  const rowsOfPage = 6;
  const containerRef = useRef();

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
    ? data?.courseFilterDtos.filter((c) => c.title.includes(searchText))
    : data?.courseFilterDtos;

  useGSAP(
    () => {
      if (!data) return;

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".sort", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          clearProps: "transform,opacity",
        })
        .from(
          ".sort-btn",
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.12,
            clearProps: "transform,opacity",
          },
          "-=0.5",
        )
        .from(".pagination .course-card", {
          y: 30,
          duration: 1,
          stagger: 0.15,
          clearProps: "transform,opacity",
        });
    },
    { scope: containerRef, dependencies: [isPending] },
  );

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [page]);

  if (isPending)
    return (
      <div className="flex flex-row flex-wrap lg:justify-start justify-center items-start gap-8 mt-17">
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

  const totalPages = Math.ceil(data?.totalCount / rowsOfPage);

  if (visibleCourses?.length === 0)
    return (
      <div className=" w-full min-h-187 flex items-start justify-center py-8 px-6">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-red-50 p-8 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <img src={warningIcon} className="w-8 h-8" />
          </div>

          <span className="text-lg font-bold text-danger">
            دوره ای پیدا نشد
          </span>

          <span className="text-sm font-medium text-text-muted">
            با فیلترها نتیجه‌ای یافت نشد. فیلترها را تغییر بده یا پاکشان کن و
            دوباره امتحان کن.
          </span>
        </div>
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col lg:items-start lg:self-start self-center gap-6"
    >
      <SortingRow
        sortingButtons={sortingButtons}
        selected={selected}
        sortingHandler={sortingHandler}
        toggle={toggle}
        isOpenModal={isOpenModal}
        isPending={isFetching}
      />
      <div className="w-full flex flex-col  gap-28">
        <div
          className={` flex flex-row flex-wrap lg:justify-start justify-center  items-start gap-8 `}
        >
          {visibleCourses?.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              id={course.courseId}
            />
          ))}
        </div>
        <PaginationBox
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          isPending={isFetching}
        />
      </div>
    </div>
  );
};

export default CoursesList;
