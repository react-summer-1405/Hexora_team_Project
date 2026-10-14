import { useRef, useState } from "react";
import CourseCard from "./course/components/CourseCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import { getCoursesTop } from "../../../../../core/services/home/getCoursesTop";

import warningIcon from '../../../../../assets/icons/Triangle_Warning.svg';
import PendingCard from "../../../../common/PendingCard";

const TopCourses = () => {


  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

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
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (!card) return;
    console.log(card.offsetLeft);
    gsap.to(trackRef.current, {
      x: -card.offsetLeft,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [index, topCourses]);

  const total = topCourses?.length ?? 0;

  const next = () => setIndex((prev) => Math.min(prev + 1, total - 1));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));


  if (isPending)
  return (
 <div className="flex flex-row flex-wrap gap-6">
        
     <PendingCard/>
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
        className="relative group  w-full max-w-343 overflow-x-clip  py-5 px-6  "
        dir="ltr"
      >
        <div
          ref={trackRef}
          className={` w-max flex flex-row  justify-center items-center gap-6  `}
        >
          {result.map((course) => (
            <div className="flex" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <button
          onClick={prev}
          disabled={index === 0}
          className={`cursor-pointer invisible opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 absolute  left-4 top-2/5  disabled:opacity-40 rounded-full p-5 bg-[url("../../assets/icons/Caret_Circle_Left.svg")] bg-contain bg-center bg-no-repeat`}
        ></button>
        <button
          onClick={next}
          disabled={index === result.length - 4}
          className={`cursor-pointer invisible opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100  absolute right-4 top-2/5 disabled:opacity-40 rounded-full p-5 bg-[url("../../assets/icons/Caret_Circle_Right.svg")] bg-contain bg-center bg-no-repeat`}
        ></button>
      </div>
    );
};

export default TopCourses;
