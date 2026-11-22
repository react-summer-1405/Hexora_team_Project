import CourseCard from "./course/components/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { getCoursesTop } from "../../../../../core/services/home/getCoursesTop";

import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import PendingCard from "../../../../common/PendingCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const TopCourses = () => {

const containerRef = useRef()

const count = 4;

  const {
    data: topCourses,
    isError,
    error,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["coursesTop",count],
    queryFn:()=> getCoursesTop(count),
  });

    useGSAP(
    () => {
      if (!topCourses) return;

      gsap.from(".cards", {
        yPercent: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [topCourses] },
  );


  if (isPending)
    return (
      <div className=" w-full overflow-hidden  py-5 px-6  flex md:flex-row flex-col  justify-center items-center gap-6 ">
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

        <div ref={containerRef}
          className={` w-full overflow-hidden  py-5 px-6  flex md:flex-row flex-col  justify-center items-center gap-6 
                  `}
        >
          {result.map((course) => (
            <div className="flex  cards " key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>

    );
};

export default TopCourses;
