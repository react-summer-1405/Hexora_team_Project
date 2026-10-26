import { useQuery } from "@tanstack/react-query";
import CourseCard from "../../../../landing/components/topCourses/components/course/components/CourseCard";
import getCoursesByPagination from "../../../../../core/services/courses/getCoursesByPagination";
import Button from "../../../../common/Button";
import useToggle from "../../../../hooks/useToggle";
import RelatedOnesPending from "../../pendings/components/RelatedOnesPending";

const RelatedOnes = ({ course }) => {
  const [isOpen, toggle] = useToggle(false);

  const techNames =
    course?.courseTech
      ?.map((item) => item?.tech?.techName?.trim())
      .filter(Boolean) ?? [];

  const { data, isPending } = useQuery({
    queryKey: ["getRelatedCourses"],
    queryFn: getCoursesByPagination,
  });

  const courses = data ?? [];

  const relatedCourses = courses.filter((course) =>
    techNames.some((tech) =>
      course.technologyList?.toLowerCase().includes(tech.toLowerCase()),
    ),
    
  );

  if (isPending) return <RelatedOnesPending />;

  if (relatedCourses.length !== 0)
    return (
      <div className="flex flex-col gap-6 ">
        <h3 className="text-[20px] font-bold text-text-muted items-start">
          دوره های مرتبط
        </h3>
        <div
          className={`flex flex-row flex-wrap items-start justify-center md:justify-start gap-4 ${isOpen ? "h-max" : "h-95"} overflow-hidden  `}
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
