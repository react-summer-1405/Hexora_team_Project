import React, { useState, useEffect } from "react";
import defaultReactImg from "../../../assets/images/react.png";

export default function DetailModal({ isOpen, onClose, data, type }) {
  const [imgSrc, setImgSrc] = useState(defaultReactImg);
  const [hasImageError, setHasImageError] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    if (data && isOpen) {
      const isCourse = type === "course";
      const imageUrl = isCourse
        ? data.imageAddress ||
          data.tumbImageAddress ||
          data.course?.tumbImageAddress
        : data.currentImageAddressTumb || data.news?.currentImageAddressTumb;

      if (!imageUrl) {
        setImgSrc(defaultReactImg);
        setHasImageError(true);
        setIsImgLoading(false);
        return;
      }

      setIsImgLoading(true);
      setHasImageError(false);

      const img = new window.Image();
      img.src = imageUrl;

      const timeoutId = setTimeout(() => {
        setImgSrc(defaultReactImg);
        setHasImageError(true);
        setIsImgLoading(false);
      }, 1500);

      img.onload = () => {
        clearTimeout(timeoutId);
        setImgSrc(imageUrl);
        setHasImageError(false);
        setIsImgLoading(false);
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        setImgSrc(defaultReactImg);
        setHasImageError(true);
        setIsImgLoading(false);
      };

      return () => {
        clearTimeout(timeoutId);
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [data, type, isOpen]);

  if (!isOpen || !data) return null;

  const isCourse = type === "course";
  const title = isCourse
    ? data.courseTitle || data.title
    : data.title || data.news?.title;

  const description = isCourse
    ? data.course?.describe ||
      data.course?.miniDescribe ||
      data.miniDescribe ||
      "توضیحی ثبت نشده است."
    : data.news?.miniDescribe || data.miniDescribe || "توضیحی ثبت نشده است.";

  const author = isCourse ? data.teacheName || data.teacherName : data.auther;

  const price = isCourse ? data.cost || data.course?.cost : null;
  const capacity = isCourse ? data.course?.capacity : null;
  const startDate = isCourse
    ? data.course?.startTime || data.startTime
    : data.news?.insertDate;
  const endDate = isCourse
    ? data.course?.endTime || data.endTime
    : data.news?.updateDate;
  const level = isCourse
    ? data.course?.levelName || data.levelName || "پیشرفته"
    : null;
  const keywords = !isCourse ? data.news?.keyword : null;
  const isActive = !isCourse ? data.news?.active : data.course?.active;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[24px] bg-bg-light shadow-2xl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm backdrop-blur-md transition-colors hover:bg-gray-100 hover:text-red-500"
        >
          ✕
        </button>

        <div
          className={`flex h-56 w-full items-center justify-center sm:h-64 ${
            hasImageError ? "bg-[#87DFFF]" : "bg-gray-100"
          }`}
        >
          {isImgLoading ? (
            <div className="h-full w-full animate-pulse bg-gray-200"></div>
          ) : (
            <img
              src={imgSrc}
              alt={title}
              className={`h-full w-full ${hasImageError ? "object-contain p-8" : "object-cover"}`}
            />
          )}
        </div>

        <div className="flex max-h-[55vh] flex-col gap-5 overflow-y-auto p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-text-dark md:text-2xl">
              {title}
            </h2>
            <span className="shrink-0 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600">
              {isCourse ? "دوره آموزشی" : "مقاله"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 rounded-2xl bg-bg-main p-5 text-sm md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-dark">
                {isCourse ? "مدرس:" : "نویسنده:"}
              </span>
              <span className="font-bold text-text-dark">
                {author || "نامشخص"}
              </span>
            </div>

            {isCourse && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-dark">قیمت دوره:</span>
                  <span className="font-bold text-green-600">
                    {price ? `${price.toLocaleString()} تومان` : "رایگان"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-dark">ظرفیت:</span>
                  <span className="font-bold text-text-dark">
                    {capacity ? `${capacity} نفر` : "نامشخص"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-text-dark">سطح دوره:</span>
                  <span className="font-bold text-text-dark">{level}</span>
                </div>
              </>
            )}

            {!isCourse && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">وضعیت:</span>
                  <span
                    className={`font-bold ${isActive ? "text-green-600" : "text-red-600"}`}
                  >
                    {isActive ? "فعال" : "غیرفعال"}
                  </span>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-dark">
                {isCourse ? "تاریخ شروع:" : "تاریخ انتشار:"}
              </span>
              <span className="font-bold text-text-dark">
                {startDate
                  ? new Date(startDate).toLocaleDateString("fa-IR")
                  : "نامشخص"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-dark">
                {isCourse ? "تاریخ پایان:" : "آخرین ویرایش:"}
              </span>
              <span className="font-bold text-text-dark">
                {endDate
                  ? new Date(endDate).toLocaleDateString("fa-IR")
                  : "نامشخص"}
              </span>
            </div>

            {!isCourse && keywords && (
              <div className="col-span-2 flex flex-col gap-1 md:col-span-3">
                <span className="text-xs text-text-dark">کلمات کلیدی:</span>
                <span className="font-bold text-blue-500">{keywords}</span>
              </div>
            )}
          </div>

          <div className="mt-2 border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-base font-bold text-text-dark">
              توضیحات:
            </h3>
            <p className="text-sm leading-8 text-text-dark text-justify">
              {description}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-bg-light p-4 md:px-8 md:py-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-bold text-text-dark transition-colors hover:bg-blue-600"
          >
            بستن و بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}
