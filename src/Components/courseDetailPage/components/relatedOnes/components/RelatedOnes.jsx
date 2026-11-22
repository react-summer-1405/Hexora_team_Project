import { useQuery } from "@tanstack/react-query";
import CourseCard from "../../../../landing/components/topCourses/components/course/components/CourseCard";
import getCoursesByPagination from "../../../../../core/services/courses/getCoursesByPagination";
import Button from "../../../../common/Button";
import useToggle from "../../../../hooks/useToggle";
import RelatedOnesPending from "../../pendings/components/RelatedOnesPending";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const RelatedOnes = ({ course }) => {
  const [isOpen, toggle] = useToggle(false);
  
 const sectionRef = useRef();
  const techNames =
    course?.courseTech
      ?.map((item) => item?.tech?.techName?.trim())
      .filter(Boolean) ?? [];

  const { data, isPending } = useQuery({
    queryKey: ["getRelatedCourses"],
    queryFn: getCoursesByPagination,
  });

  const courses = data?.courseFilterDtos ?? [];

  const relatedCourses = courses.filter((course) =>
    techNames.some((tech) =>
      course.technologyList?.toLowerCase().includes(tech.toLowerCase()),
    ),
    
  );

  useGSAP(
    () => {
      if (isPending || relatedCourses.length === 0) return;
  
      gsap.from(".related-title", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".related-title",
          start: "top 90%",
          once: true,
        },
      });
  
      gsap.from(".related-grid > *", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".related-grid",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [isPending, relatedCourses.length] },
  );
  

  if (isPending) return <RelatedOnesPending />;

  if (relatedCourses.length !== 0)
    return (
      <div className="flex flex-col gap-6 "ref={sectionRef}>
        <h3 className="related-title text-[20px] font-bold text-text-muted items-start">
          دوره های مرتبط
        </h3>
        <div
          className={ ` related-grid flex flex-row flex-wrap items-start justify-center md:justify-start gap-4 ${isOpen ? "h-max" : "h-95"} p-4 overflow-hidden  `}
        >
          {relatedCourses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>

        {relatedCourses.length >= 3 && (
          <Button
            content={isOpen ? "مشاهده کمتر" : "مشاهده بیشتر"}
            customStyle="self-center"
            onClick={toggle}
          />
        )}
      </div>
    );
};

export default RelatedOnes;
