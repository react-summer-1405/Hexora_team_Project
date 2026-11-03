import { useState } from "react";
import FavoriteFilter from "../../Components/dashboard/FavoriteCoursesPage/FavoriteFilter";
import FavoriteList from "../../Components/dashboard/FavoriteCoursesPage/FavoriteList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useCourses } from "../../hooks/dashboard/useCourses";

export default function FavoriteCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useCourses({
    page: currentPage,
    search: searchText,
  });

  const favorites = data?.courseFilterDtos || [];
  const totalCount = data?.totalCount || 0;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <FavoriteFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <FavoriteList
        favorites={favorites}
        isLoading={isLoading}
        isError={isError}
      />

      <CoursePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
