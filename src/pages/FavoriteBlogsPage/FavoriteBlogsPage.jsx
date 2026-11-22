import React, { useState, useMemo } from "react";
import FavoriteBlogFilter from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogFilter";
import FavoriteBlogList from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useFavoriteNews } from "../../hooks/dashboard/useFavoriteNews";
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

export default function FavoriteBlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const debouncedSearch = useDebounce(searchText, 400);

  const { data, isLoading, isError } = useFavoriteNews();

  const allBlogs = Array.isArray(data?.myFavoriteNews)
    ? data.myFavoriteNews
    : [];

  const filteredBlogs = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    const selectedDateRange = getDateRangeTimestamps(dateRange);

    return allBlogs.filter((item) => {
      const title = (item.title || item.news?.title || "").toLowerCase();

      const matchesSearch = !query || title.includes(query);

      let matchesDate = true;

      if (selectedDateRange) {
        const publishDate = parseDate(item.news?.insertDate || item.insertDate);
        const updateDate = parseDate(item.news?.updateDate || item.updateDate);

        const blogStart = publishDate || updateDate;
        const blogEnd = updateDate || publishDate;

        if (!blogStart || !blogEnd) {
          matchesDate = false;
        } else {
          const startTimestamp = Math.min(
            blogStart.getTime(),
            blogEnd.getTime(),
          );

          const endTimestamp = Math.max(blogStart.getTime(), blogEnd.getTime());

          matchesDate =
            startTimestamp <= selectedDateRange.end &&
            endTimestamp >= selectedDateRange.start;
        }
      }

      return matchesSearch && matchesDate;
    });
  }, [allBlogs, debouncedSearch, dateRange]);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBlogs, currentPage]);

  const totalCount = filteredBlogs.length;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <FavoriteBlogFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <FavoriteBlogList
        blogs={paginatedBlogs}
        isLoading={isLoading}
        isError={isError}
      />

      {totalCount > 0 && (
        <CoursePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
