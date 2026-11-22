import React, { useMemo, useState } from "react";
import ReservationFilter from "../../Components/dashboard/MyReserves/ReservationFilter";
import CoursePagination from "../../Components/dashboard/MyCoursesPage/CoursePagination";
import MyReserves from "../../Components/dashboard/MyReserves/MyReserves";
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

  const dates = dateRange.map((date) =>
    date?.toDate ? date.toDate() : parseDate(date),
  );

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

const getReservationTitle = (reservation) => {
  return (
    reservation.courseTitle ||
    reservation.title ||
    reservation.course?.courseTitle ||
    reservation.course?.title ||
    ""
  ).toLowerCase();
};

const getReservationDates = (reservation) => {
  const startTime = parseDate(
    reservation.course?.startTime ||
      reservation.startTime ||
      reservation.courseStartTime,
  );

  const endTime = parseDate(
    reservation.course?.endTime ||
      reservation.endTime ||
      reservation.courseEndTime,
  );

  return { startTime, endTime };
};

const isReservationApproved = (reservation) => {
  const status =
    reservation.status ??
    reservation.approvalStatus ??
    reservation.isApproved ??
    reservation.is_approved ??
    reservation.approved;

  return (
    status === true ||
    status === 1 ||
    status === "approved" ||
    status === "confirmed" ||
    status === "تایید شده"
  );
};

const getReservationsList = (data) => {
  if (Array.isArray(data)) return data;

  return (
    data?.data?.reservations ||
    data?.data?.results ||
    data?.data?.courses ||
    data?.data?.userCourses ||
    data?.reservations ||
    data?.results ||
    data?.courses ||
    data?.userCourses ||
    (Array.isArray(data?.data) ? data.data : []) ||
    []
  );
};

export default function MyReservationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  const debouncedSearchText = useDebounce(searchText, 400);

  const { data, isLoading, isError } = useFavoriteCourses();

  const reservations = getReservationsList(data);

  const filteredReservations = useMemo(() => {
    const query = debouncedSearchText.trim().toLowerCase();
    const selectedDateRange = getDateRangeTimestamps(dateRange);

    return reservations.filter((reservation) => {
      const matchesSearch =
        !query || getReservationTitle(reservation).includes(query);

      const matchesStatus =
        !filterStatus ||
        (filterStatus === "approved" && isReservationApproved(reservation)) ||
        (filterStatus === "unapproved" && !isReservationApproved(reservation));

      let matchesDate = true;

      if (selectedDateRange) {
        const { startTime, endTime } = getReservationDates(reservation);

        const reservationStart = startTime || endTime;
        const reservationEnd = endTime || startTime;

        if (!reservationStart || !reservationEnd) {
          matchesDate = false;
        } else {
          const startTimestamp = Math.min(
            reservationStart.getTime(),
            reservationEnd.getTime(),
          );

          const endTimestamp = Math.max(
            reservationStart.getTime(),
            reservationEnd.getTime(),
          );

          matchesDate =
            startTimestamp <= selectedDateRange.end &&
            endTimestamp >= selectedDateRange.start;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [reservations, debouncedSearchText, filterStatus, dateRange]);

  const totalCount = filteredReservations.length;

  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full rounded-[24px] p-6 text-right" dir="rtl">
      <ReservationFilter
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        setCurrentPage={setCurrentPage}
      />

      <MyReserves
        reservations={paginatedReservations}
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
