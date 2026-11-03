import React from "react";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import thumbsUpIcon from "../../../assets/icons/dashboard/thumbs-up.png";
import thumbsDownIcon from "../../../assets/icons/dashboard/thumbs-down.png";

const mockComments = [
  {
    id: 1,
    author: "شما",
    date: "۲۹ اردیبهشت ۱۴۰۳",
    title: "دوره خیلی خوبی بود واقعا لذت بردم",
    content:
      "واقعا عالی بود. هم استادش و هم کلاس ها منظم برگزار شدن و اصلا از مباحث عقب نموندم و تونستم به مقدار ثابتی پیشرفت کنم توی کدنویسی جاوا اسکریپت. ممنون از آکادمی بحر که این دوره رو گذاشتن",
    likes: 29,
    dislikes: 1,
    avatar: "/avatar-placeholder.png",
    hasBorder: false,
  },
  {
    id: 2,
    author: "امیرحسین سهرابی",
    date: "۲۹ اردیبهشت ۱۴۰۳",
    title: "خوب بود بد نبود",
    content:
      "واقعا عالی بود. هم استادش و هم کلاس ها منظم برگزار شدن و اصلا از مباحث عقب نموندم و تونستم به مقدار ثابتی پیشرفت کنم توی کدنویسی جاوا اسکریپت. ممنون از آکادمی بحر که این دوره رو گذاشتن",
    likes: 0,
    dislikes: 0,
    avatar: "/avatar-placeholder.png",
    hasBorder: true,
  },
];

export default function MyComments() {
  return (
    <div
      className="mt-6 flex w-full min-w-0 flex-col rounded-[24px] bg-bg-light p-4 text-right lg:flex-[1] md:p-6"
      dir="rtl"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-800">نظرات شما</h3>

        <a
          href="/comments"
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[14px] w-[14px]"
          />
          مشاهده بیشتر
        </a>
      </div>

      <div className="mb-6 flex items-center justify-center">
        <div className="h-[1px] flex-1 bg-gray-200"></div>

        <span className="shrink-0 px-3 text-xs font-medium text-gray-400">
          دوره ها و بلاگ ها
        </span>

        <div className="h-[1px] flex-1 bg-gray-200"></div>
      </div>

      <div className="flex flex-col gap-6">
        {mockComments.map((comment) => (
          <div
            key={comment.id}
            className={`relative flex min-w-0 flex-col gap-3 ${
              comment.hasBorder ? "border-r-[3px] border-blue-400 pr-3" : ""
            }`}
          >
            <div className="flex items-center justify-start gap-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
              />

              <div className="flex min-w-0 flex-col text-right">
                <span className="text-sm font-bold text-gray-800">
                  {comment.author}
                </span>

                <span className="text-[10px] font-medium text-gray-400">
                  {comment.date}
                </span>
              </div>
            </div>

            <h4 className="break-words text-right text-sm font-bold text-gray-800">
              {comment.title}
            </h4>

            <p className="break-words text-justify text-right text-xs font-medium leading-6 text-gray-600">
              {comment.content}
            </p>

            {!comment.hasBorder && (
              <div className="flex items-center justify-end gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold">{comment.likes}</span>

                  <img
                    src={thumbsUpIcon}
                    alt="لایک"
                    className="h-[24px] w-[24px]"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold">{comment.dislikes}</span>

                  <img
                    src={thumbsDownIcon}
                    alt="دیس‌لایک"
                    className="h-[24px] w-[24px]"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
