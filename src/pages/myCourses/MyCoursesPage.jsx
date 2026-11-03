import React, { useState, useMemo } from "react";
import { useFavoriteCourses } from "../../hooks/dashboard/useFavoriteCourses";
import CourseList from "../../Components/dashboard/MyCoursesPage/CourseList";
import CourseFilter from "../../Components/dashboard/MyCoursesPage/CourseFilter";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";

export default function MyCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 7;

  const { data, isLoading, isError } = useFavoriteCourses();

  const allCourses = data?.favoriteCourseDto || [];

  const filteredCourses = useMemo(() => {
    if (!searchText) return allCourses;
    return allCourses.filter((c) => c.courseTitle?.includes(searchText));
  }, [allCourses, searchText]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const totalCount = filteredCourses.length;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <CourseFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <CourseList
        courses={paginatedCourses}
        isLoading={isLoading}
        isError={isError}
      />

      {totalCount > 0 && (
        <CoursePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
        />
      )}
    </div>
  );
}
