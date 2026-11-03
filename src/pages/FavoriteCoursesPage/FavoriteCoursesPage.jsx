import React, { useState, useMemo } from "react";
import FavoriteFilter from "../../Components/dashboard/FavoriteCoursesPage/FavoriteFilter";
import FavoriteList from "../../Components/dashboard/FavoriteCoursesPage/FavoriteList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useFavoriteCourses } from "../../hooks/dashboard/useFavoriteCourses";
import { useDebounce } from "../../hooks/dashboard/myCourses/useDebounce";

const itemsPerPage = 7;

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const getDateRangeTimestamps = (dateRange) => {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) {
    return null;
  }

  const dates = dateRange.map((date) => {
    if (date?.toDate) return date.toDate();
    return parseDate(date);
  });

  if (!dates[0] || !dates[1]) return null;

  dates.sort((a, b) => a.getTime() - b.getTime());

  const start = new Date(dates[0]);
  const end = new Date(dates[1]);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return {
    start: start.getTime(),
    end: end.getTime(),
  };
};

export default function FavoriteCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const debouncedSearch = useDebounce(searchText, 400);

  const { data, isLoading, isError } = useFavoriteCourses();

  const allFavorites = Array.isArray(data?.favoriteCourseDto)
    ? data.favoriteCourseDto
    : [];

  const filteredFavorites = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    const selectedDateRange = getDateRangeTimestamps(dateRange);

    return allFavorites.filter((item) => {
      const title = (
        item.courseTitle ||
        item.title ||
        item.course?.courseTitle ||
        item.course?.title ||
        ""
      ).toLowerCase();

      const matchesSearch = !query || title.includes(query);

      let matchesDate = true;

      if (selectedDateRange) {
        const startTime = parseDate(item.course?.startTime || item.startTime);

        const endTime = parseDate(item.course?.endTime || item.endTime);

        const courseStart = startTime || endTime;
        const courseEnd = endTime || startTime;

        if (!courseStart || !courseEnd) {
          matchesDate = false;
        } else {
          const startTimestamp = Math.min(
            courseStart.getTime(),
            courseEnd.getTime(),
          );

          const endTimestamp = Math.max(
            courseStart.getTime(),
            courseEnd.getTime(),
          );

          matchesDate =
            startTimestamp <= selectedDateRange.end &&
            endTimestamp >= selectedDateRange.start;
        }
      }

      return matchesSearch && matchesDate;
    });
  }, [allFavorites, debouncedSearch, dateRange]);

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredFavorites.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFavorites, currentPage]);

  const totalCount = filteredFavorites.length;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <FavoriteFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <FavoriteList
        favorites={paginatedFavorites}
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
