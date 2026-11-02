import React, { useState, useMemo } from "react";
import FavoriteFilter from "../../Components/dashboard/FavoriteCoursesPage/FavoriteFilter";
import FavoriteList from "../../Components/dashboard/FavoriteCoursesPage/FavoriteList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useFavoriteCourses } from "../../hooks/dashboard/useFavoriteCourses"; // استفاده از هوک علاقه‌مندی‌ها

export default function FavoriteCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 7;

  const { data, isLoading, isError } = useFavoriteCourses();

  const allFavorites = data?.favoriteCourseDto || [];

  const filteredFavorites = useMemo(() => {
    if (!searchText) return allFavorites;
    return allFavorites.filter((item) =>
      item.courseTitle?.includes(searchText),
    );
  }, [allFavorites, searchText]);

  // صفحه‌بندی به صورت کلاینت‌ساید
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
