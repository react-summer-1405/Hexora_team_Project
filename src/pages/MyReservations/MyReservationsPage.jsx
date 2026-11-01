import React, { useState } from "react";
import ReservationFilter from "../../Components/dashboard/MyReserves/ReservationFilter";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";

import MyReserves from "../../Components/dashboard/MyReserves/MyReserves";

export default function MyReservationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);

  const reservations = [];
  const totalCount = 0;

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <ReservationFilter
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setCurrentPage={setCurrentPage}
      />

      <MyReserves />

      <CoursePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
      />
    </div>
  );
}
