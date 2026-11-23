import React, { useState, useEffect } from "react";
import { Skeleton } from "@heroui/react";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import thumbsUpIcon from "../../../assets/icons/dashboard/thumbs-up.png";
import thumbsDownIcon from "../../../assets/icons/dashboard/thumbs-down.png";
import CommentsModal from "./CommentsModal";

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
    likes: 29,
    dislikes: 1,
    avatar: "/avatar-placeholder.png",
    hasBorder: true,
  },
  {
    id: 3,
    author: "مهشید محمدحسینی",
    date: "۲۹ اردیبهشت ۱۴۰۳",
    title: "بد نبود",
    content: "ممنون بابت دوره",
    likes: 12,
    dislikes: 0,
    avatar: "/avatar-placeholder.png",
    hasBorder: false,
  },
];

export default function MyComments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="mt-6 flex w-full flex-col rounded-[24px] bg-bg-light p-4 text-right md:p-6 lg:w-[35%] dark:bg-bg-field"
        dir="rtl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-dark">نظرات شما</h3>
          <button
            onClick={() => !isLoading && setIsModalOpen(true)}
            disabled={isLoading}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              isLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary hover:text-primary-hover"
            }`}
          >
            <img
              src={arrowLeftIcon}
              alt="مشاهده بیشتر"
              className="h-[14px] w-[14px]"
            />
            مشاهده بیشتر
          </button>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <div className="h-[1px] flex-1 bg-border"></div>
          <span className="px-3 text-xs font-medium text-text-muted">
            دوره ها و بلاگ ها
          </span>
          <div className="h-[1px] flex-1 bg-border"></div>
        </div>

        <div className="flex flex-col gap-6">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`relative flex flex-col gap-3 ${
                    index === 1 ? "border-r-[3px] border-primary pr-3" : ""
                  }`}
                >
                  <div className="flex items-center justify-start gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full">
                      <div className="h-10 w-10 rounded-full bg-default-200"></div>
                    </Skeleton>
                    <div className="flex w-full flex-col gap-1 text-right">
                      <Skeleton className="h-3 w-24 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="h-2 w-16 rounded-lg">
                        <div className="h-2 w-full rounded-lg bg-default-200"></div>
                      </Skeleton>
                    </div>
                  </div>

                  <Skeleton className="mt-1 h-4 w-1/2 rounded-lg">
                    <div className="h-4 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>

                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded-lg">
                      <div className="h-3 w-full rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="h-3 w-[90%] rounded-lg">
                      <div className="h-3 w-full rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="h-3 w-[80%] rounded-lg">
                      <div className="h-3 w-full rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>

                  {index === 0 && (
                    <div className="mt-2 flex items-center justify-end gap-4">
                      <Skeleton className="h-[24px] w-[32px] rounded-lg">
                        <div className="h-[24px] w-[32px] rounded-lg bg-default-200"></div>
                      </Skeleton>
                      <Skeleton className="h-[24px] w-[32px] rounded-lg">
                        <div className="h-[24px] w-[32px] rounded-lg bg-default-200"></div>
                      </Skeleton>
                    </div>
                  )}
                </div>
              ))
            : mockComments.slice(0, 2).map((comment) => (
                <div
                  key={comment.id}
                  className={`relative flex flex-col gap-3 ${
                    comment.hasBorder
                      ? "border-r-[3px] border-primary pr-3"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-start gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-bold text-text-dark">
                        {comment.author}
                      </span>
                      <span className="text-[10px] font-medium text-text-muted">
                        {comment.date}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-right text-sm font-bold text-text-dark">
                    {comment.title}
                  </h4>
                  <p className="text-justify text-right text-xs font-medium leading-6 text-text-muted">
                    {comment.content}
                  </p>

                  {!comment.hasBorder && (
                    <div className="flex items-center justify-end gap-4 text-text-muted">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">
                          {comment.likes}
                        </span>
                        <img
                          src={thumbsUpIcon}
                          alt="لایک"
                          className="h-[24px] w-[24px]"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">
                          {comment.dislikes}
                        </span>
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

      <CommentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comments={mockComments}
      />
    </>
  );
}
