import React, { useState, useMemo } from "react";
import FavoriteBlogFilter from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogFilter";
import FavoriteBlogList from "../../Components/dashboard/FavoriteBlogs/FavoriteBlogList";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import { useFavoriteNews } from "../../hooks/dashboard/useFavoriteNews";

export default function FavoriteBlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 7;

  const { data, isLoading, isError } = useFavoriteNews();

  const allBlogs = data?.myFavoriteNews || [];

  const filteredBlogs = useMemo(() => {
    if (!searchText) return allBlogs;
    return allBlogs.filter((item) => item.title?.includes(searchText));
  }, [allBlogs, searchText]);

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
        />
      )}
    </div>
  );
}
