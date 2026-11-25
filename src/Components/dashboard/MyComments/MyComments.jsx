import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "@heroui/react";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import thumbsUpIcon from "../../../assets/icons/dashboard/thumbs-up.png";
import thumbsDownIcon from "../../../assets/icons/dashboard/thumbs-down.png";
import CommentsModal from "./CommentsModal";
import { getAllMyComments } from "../../../core/services/dashboard/comment.api";

export default function MyComments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courseComments, setCourseComments] = useState([]);
  const [blogComments, setBlogComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        courseComments: cList,
        blogComments: bList,
        allComments: all,
      } = await getAllMyComments();
      setCourseComments(cList);
      setBlogComments(bList);
      setAllComments(all);
    } catch (err) {
      console.error("خطا در دریافت نظرات:", err);
      setCourseComments([]);
      setBlogComments([]);
      setAllComments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      <div
        className="flex h-full min-h-full w-full min-w-0 flex-1 flex-col rounded-[24px] bg-bg-light p-4 text-right md:p-6"
        dir="rtl"
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-text-dark">نظرات شما</h3>
          <button
            type="button"
            onClick={() => !isLoading && setIsModalOpen(true)}
            disabled={isLoading}
            className={`flex shrink-0 items-center gap-1 text-xs font-medium transition-colors ${
              isLoading
                ? "cursor-not-allowed text-gray-400"
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

        <div className="mb-5 flex items-center justify-center">
          <div className="h-[1px] flex-1 bg-border"></div>
          <span className="px-3 text-xs font-medium text-text-muted">
            دوره‌ها ({courseComments.length}) و بلاگ‌ها ({blogComments.length})
          </span>
          <div className="h-[1px] flex-1 bg-border"></div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
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
                </div>
              </div>
            ))
          ) : allComments.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-6 text-center text-xs text-text-muted">
              هنوز نظری ثبت نکرده‌اید.
            </div>
          ) : (
            allComments.slice(0, 2).map((comment, idx) => {
              const isCourse = comment.type === "course";
              return (
                <div
                  key={comment.id || idx}
                  className={`relative flex flex-col gap-2 ${
                    idx === 1 ? "border-r-[3px] border-primary pr-3" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex min-w-0 flex-1 flex-col text-right">
                      <span className="truncate text-sm font-bold text-text-dark">
                        {comment.author}
                      </span>
                      <span className="text-[10px] font-medium text-text-muted">
                        {comment.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isCourse
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {isCourse ? "دوره" : "بلاگ"}
                    </span>
                    <span className="max-w-[150px] truncate text-[11px] font-medium text-primary">
                      {comment.targetTitle}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        comment.accepted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {comment.accepted ? "تایید شده" : "در انتظار تایید"}
                    </span>
                  </div>

                  <h4 className="break-words text-sm font-bold text-text-dark">
                    {comment.title}
                  </h4>
                  <p className="line-clamp-3 break-words text-right text-xs font-medium leading-6 text-text-muted">
                    {comment.content}
                  </p>

                  {idx === 0 && (
                    <div className="flex items-center justify-end gap-4 text-text-muted">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">
                          {comment.likes}
                        </span>
                        <img
                          src={thumbsUpIcon}
                          alt="لایک"
                          className="h-[20px] w-[20px]"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">
                          {comment.dislikes}
                        </span>
                        <img
                          src={thumbsDownIcon}
                          alt="دیس‌لایک"
                          className="h-[20px] w-[20px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <CommentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseComments={courseComments}
        blogComments={blogComments}
        onRefresh={fetchComments}
      />
    </>
  );
}
