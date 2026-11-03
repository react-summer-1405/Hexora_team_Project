import React, { useState, useMemo } from "react";

import { useFavoriteCourses } from "../../hooks/dashboard/useFavoriteCourses";
import { useDebounce } from "../../hooks/dashboard/myCourses/useDebounce";

import CourseList from "../../Components/dashboard/MyCoursesPage/CourseList";
import CourseFilter from "../../Components/dashboard/MyCoursesPage/CourseFilter";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getDateRangeTimestamps = (dateRange) => {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) {
    return null;
  }

  const dates = dateRange.map((date) =>
    date?.toDate ? date.toDate() : parseDate(date),
  );

  if (!dates[0] || !dates[1]) {
    return null;
  }

  dates.sort((a, b) => a.getTime() - b.getTime());

  const start = new Date(dates[0]);
  start.setHours(0, 0, 0, 0);

  const end = new Date(dates[1]);
  end.setHours(23, 59, 59, 999);

  return {
    start: start.getTime(),
    end: end.getTime(),
  };
};

export default function MyCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const itemsPerPage = 7;

  const debouncedSearchText = useDebounce(searchText, 400);

  const { data, isLoading, isError } = useFavoriteCourses();

  const allCourses = data?.favoriteCourseDto || [];

  const selectedDateRange = useMemo(() => {
    return getDateRangeTimestamps(dateRange);
  }, [dateRange]);

  const filteredCourses = useMemo(() => {
    const query = debouncedSearchText.trim().toLowerCase();

    return allCourses.filter((course) => {
      const courseTitle = (
        course.courseTitle ||
        course.title ||
        course.course?.courseTitle ||
        course.course?.title ||
        ""
      ).toLowerCase();

      const matchesSearch = !query || courseTitle.includes(query);

      if (!matchesSearch) return false;

      if (!selectedDateRange) return true;

      const startTime = parseDate(course.course?.startTime || course.startTime);

      const endTime = parseDate(course.course?.endTime || course.endTime);

      const courseStart = startTime || endTime;
      const courseEnd = endTime || startTime;

      if (!courseStart || !courseEnd) return false;

      const courseStartTimestamp = Math.min(
        courseStart.getTime(),
        courseEnd.getTime(),
      );

      const courseEndTimestamp = Math.max(
        courseStart.getTime(),
        courseEnd.getTime(),
      );

      return (
        courseStartTimestamp <= selectedDateRange.end &&
        courseEndTimestamp >= selectedDateRange.start
      );
    });
  }, [allCourses, debouncedSearchText, selectedDateRange]);

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
        dateRange={dateRange}
        setDateRange={setDateRange}
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
