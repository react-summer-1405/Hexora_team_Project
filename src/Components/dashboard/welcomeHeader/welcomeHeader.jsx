
import  { useState, useEffect } from "react";
import { useProfile } from "../../../hooks/dashboard/userProfile";

import dayjs from "dayjs";
import jalaliday from "jalaliday";

import dateIcon from "../../../assets/images/dashboard/date-dash.png";
import watchIcon from "../../../assets/images/dashboard/watch-dash.png";

dayjs.extend(jalaliday);

const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export default function WelcomeHeader() {
  const { data: profile } = useProfile();

  const [currentTime, setCurrentTime] = useState(() => dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const jalaliDate = currentTime.calendar("jalali");

  const formattedDate = `${toPersianDigits(jalaliDate.date())} ${
    jalaliMonths[jalaliDate.month()]
  } ${toPersianDigits(jalaliDate.year())}`;

  const formattedTime = toPersianDigits(currentTime.format("HH:mm"));

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 p-6 lg:flex-1">
      <div className="flex min-w-0 flex-col text-right">
        <div className="flex flex-wrap items-center gap-2 text-lg font-bold text-text-dark md:text-xl">
          <span className="min-w-0">
            سلام {profile?.fName || "کاربر"} {profile?.lName || "ناشناس"}، روزت
            بخیر
          </span>

          <span>👋</span>

          <span className="basis-full text-xs font-normal text-text-muted lg:basis-auto">
            {profile?.userAbout || "امیدوارم امروز روز خوبی رو داشته باشید"}
          </span>
        </div>
      </div>

      <div
        className="mt-2 flex w-full flex-wrap items-center gap-x-[56px] gap-y-4"
        dir="rtl"
      >
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-field">
            <img
              src={watchIcon}
              alt="ساعت"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="flex flex-col gap-1 text-right">
            <span className="text-[14px] font-medium text-text-muted">
              ساعت
            </span>

            <span className="whitespace-nowrap text-[16px] font-semibold text-text-dark">
              {formattedTime}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-field">
            <img
              src={dateIcon}
              alt="تاریخ"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="flex flex-col gap-1 text-right">
            <span className="text-[14px] font-medium text-text-muted">
              تاریخ
            </span>

            <span className="whitespace-nowrap text-[16px] font-semibold text-text-dark">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
