import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import faLocale from "@fullcalendar/core/locales/fa";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./app-calendar.css";
import JalaliDateField from "./JalaliDateField";
import {
  getMySessions,
} from "../../core/services/dashboard/mySchedule/schedule";
import ScheduleDetailModal from "./modals/ScheduleDetailModal";
import { Skeleton } from "@heroui/react";

const mySessionsKey = ["my-sessions"];

const DAY_MS = 24 * 60 * 60 * 1000;

const toJalali = (date) =>
  new DateObject({ date, calendar: persian, locale: persian_fa });

const labelClass = "mb-1.5 block text-sm font-medium text-text-dark";

const CourseCalendar = () => {
  const userId = useSelector((state) => state.auth.userId);

  const calendarRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");

  const isRangeInvalid = Boolean(
    filterStart && filterEnd && filterEnd < filterStart,
  );

  const {
    data: allRecords = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...mySessionsKey, userId],
    queryFn: getMySessions,
    enabled: Boolean(userId),
  });



  const records = allRecords.filter((item) => {
    const date = item.startDate.slice(0, 10);

    return (
      (!filterStart || date >= filterStart) && (!filterEnd || date <= filterEnd)
    );
  });

  const selectedSchedule = allRecords.find((s) => s.id === selectedId) ?? null;

  const events = records.map((item) => {
    const date = item.startDate.slice(0, 10);

    return {
      id: item.id,
      title: "ساعت",
      start: `${date}T${item.startTime}:00`,
      end: `${date}T${item.endTime}:00`,
    };
  });

  const titleFormat = ({ start, end }) => {
    const from = toJalali(start.marker).format("MMMM YYYY");
    const to = toJalali(new Date(end.marker.getTime() - DAY_MS)).format(
      "MMMM YYYY",
    );

    return from === to ? from : `${from} – ${to}`;
  };

  const handleStartChange = (value) => {
    setFilterStart(value);

    if (value) calendarRef.current?.getApi().gotoDate(value);
  };

  const skeletonEvents = isLoading
    ? Array.from({ length: 31 }, (_, i) => {
        const date = new Date();
        date.setDate(1);
        date.setDate(i + 1);

        return {
          id: `skeleton-${i}`,
          start: date,
          allDay: true,
        };
      })
    : [];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-bg-main p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
          <div>
            <label htmlFor="filterStart" className={labelClass}>
              از تاریخ
            </label>
            <JalaliDateField
              id="filterStart"
              value={filterStart}
              onChange={handleStartChange}
            />
          </div>

          <div>
            <label htmlFor="filterEnd" className={labelClass}>
              تا تاریخ
            </label>
            <JalaliDateField
              id="filterEnd"
              value={filterEnd}
              onChange={setFilterEnd}
            />
          </div>
        </div>
      </div>

      {isRangeInvalid && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          تاریخ پایان نباید قبل از تاریخ شروع باشد.
        </div>
      )}

      {!userId && (
        <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
          برای دیدن برنامه کلاسی ابتدا وارد حساب کاربری شوید.
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          دریافت برنامه کلاسی ناموفق بود.
        </div>
      )}

      <div
        className={`app-calendar overflow-hidden rounded-2xl border border-border bg-bg-main p-4 transition-opacity ${
          isLoading ? "opacity-60" : ""
        }`}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          locale={faLocale}
          direction="rtl"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          titleFormat={titleFormat}
          dayCellContent={(arg) => ({
            html: toJalali(arg.date).format("D"),
          })}
          events={isLoading ? skeletonEvents : events}
          eventContent={(info) => {
            if (!info.event.id.startsWith("skeleton-")) return true;

            return (
              <div className="w-full flex flex-col gap-1 p-1">
                <Skeleton className="h-3 w-3/4 rounded-md bg-gray-200/50 dark:bg-gray-700/40" />
                <Skeleton className="h-2 w-1/2 rounded-md bg-gray-200/50 dark:bg-gray-700/40" />
              </div>
            );
          }}
          eventClick={(info) => {
            if (!info.event.id.startsWith("skeleton-")) {
              setSelectedId(info.event.id);
            }
          }}
          editable={false}
          dayMaxEvents={3}
        />
      </div>

      <ScheduleDetailModal
        isOpen={Boolean(selectedSchedule)}
        toggle={() => setSelectedId(null)}
        schedule={selectedSchedule}
        userId={userId}
      />
    </div>
  );
};

export default CourseCalendar;
