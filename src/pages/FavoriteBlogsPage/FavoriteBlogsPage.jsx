import React, { useState } from "react";
import FavoriteBlogFilter from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogFilter";
import FavoriteBlogList from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useCourses } from "../../hooks/dashboard/useCourses";

export default function FavoriteBlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useCourses({
    page: currentPage,
    search: searchText,
  });

  const blogs = data?.courseFilterDtos || [];
  const totalCount = data?.totalCount || 0;

  return (
    <div className="w-full rounded-[24px]  p-6 text-right" dir="rtl">
      <FavoriteBlogFilter
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <FavoriteBlogList blogs={blogs} isLoading={isLoading} isError={isError} />

      <CoursePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
