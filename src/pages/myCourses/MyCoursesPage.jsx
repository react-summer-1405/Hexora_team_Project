import React, { useState } from "react";
import { useCourses } from "../../hooks/dashboard/useCourses";
import { useDebounce } from "../../hooks/dashboard/myCourses/useDebounce";
import CourseList from "../../Components/dashboard/MyCoursesPage/CourseList";
import CourseFilter from "../../Components/dashboard/MyCoursesPage/CourseFilter";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";

export default function MyCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText, 500);

  const { data, isLoading, isError } = useCourses({
    page: currentPage,
    search: debouncedSearchText,
  });

  const courses = data?.courseFilterDtos || [];
  const totalCount = data?.totalCount || 0;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <CourseFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <CourseList courses={courses} isLoading={isLoading} isError={isError} />

      <CoursePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
