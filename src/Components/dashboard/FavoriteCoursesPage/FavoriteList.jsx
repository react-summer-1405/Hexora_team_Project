import React, { useState, useEffect } from "react";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";
import downloadIcon from "../../../assets/icons/dashboard/book-download-stroke-rounded 1.png";
import DetailModal from "../../common/DetailModal/DetailModal";
import defaultReactImg from "../../../assets/images/react.png";

export default function FavoriteList({ favorites, isLoading, isError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageStates, setImageStates] = useState({});

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      favorites.forEach((favorite, index) => {
        const currentId = favorite.courseId || favorite.favoriteId || index;
        const imageUrl =
          favorite.tumbImageAddress ||
          favorite.imageAddress ||
          favorite.course?.tumbImageAddress ||
          "/default-placeholder.png";

        if (!imageStates[currentId]) {
          setImageStates((prev) => ({
            ...prev,
            [currentId]: { isLoading: true, hasError: false, src: "" },
          }));

          const img = new window.Image();
          img.src = imageUrl;

          const timeoutId = setTimeout(() => {
            setImageStates((prev) => ({
              ...prev,
              [currentId]: {
                isLoading: false,
                hasError: true,
                src: defaultReactImg,
              },
            }));
          }, 1500);

          img.onload = () => {
            clearTimeout(timeoutId);
            setImageStates((prev) => ({
              ...prev,
              [currentId]: { isLoading: false, hasError: false, src: imageUrl },
            }));
          };

          img.onerror = () => {
            clearTimeout(timeoutId);
            setImageStates((prev) => ({
              ...prev,
              [currentId]: {
                isLoading: false,
                hasError: true,
                src: defaultReactImg,
              },
            }));
          };
        }
      });
    }
  }, [favorites]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm font-medium text-text-muted">
        در حال دریافت اطلاعات علاقه‌مندی‌ها...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-sm font-medium text-danger">
        خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-6 rounded-[24px] bg-bg-light p-4 pb-6 lg:p-6 lg:pb-8 dark:bg-bg-field"
      dir="rtl"
    >
      <div className="hidden h-[44px] items-center rounded-2xl bg-bg-field px-4 text-center text-sm font-medium text-text-muted lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_120px] dark:bg-bg-light">
        <span>#</span>
        <span className="text-right">نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>تاریخ اتمام</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4 lg:gap-8">
        {!favorites || favorites.length === 0 ? (
          <div className="py-10 text-center text-sm text-text-muted">
            هیچ دوره‌ای یافت نشد.
          </div>
        ) : (
          favorites.map((favorite, index) => {
            const currentId = favorite.courseId || favorite.favoriteId || index;
            const title =
              favorite.courseTitle ||
              favorite.title ||
              favorite.course?.title ||
              "نامشخص";
            const teacher =
              favorite.teacheName ||
              favorite.teacherName ||
              favorite.course?.teacherName ||
              "نامشخص";
            const startTime = favorite.course?.startTime || favorite.startTime;
            const endTime = favorite.course?.endTime || favorite.endTime;
            const level =
              favorite.course?.levelName || favorite.levelName || "پیشرفته";

            const imgState = imageStates[currentId] || {
              isLoading: true,
              hasError: false,
              src: "",
            };

            return (
              <div
                key={currentId}
                className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1.5fr_1fr_1fr_100px_120px] lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:text-center lg:shadow-none"
              >
                <div className="hidden lg:block">
                  <div
                    className={`flex h-12 w-12 items-center justify-center mx-auto rounded-[14px] shadow-sm ${
                      imgState.hasError ? "bg-[#87DFFF]" : "bg-gray-100"
                    }`}
                  >
                    {imgState.isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-200"></div>
                    ) : (
                      <img
                        src={imgState.src}
                        alt={title}
                        className={`h-full w-full rounded-[14px] ${
                          imgState.hasError
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:block lg:text-right">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] shadow-sm lg:hidden ${
                      imgState.hasError ? "bg-[#87DFFF]" : "bg-gray-100"
                    }`}
                  >
                    {imgState.isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-200"></div>
                    ) : (
                      <img
                        src={imgState.src}
                        alt={title}
                        className={`h-full w-full rounded-[14px] ${
                          imgState.hasError
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    )}
                  </div>
                  <span className="truncate text-sm font-bold text-text-dark">
                    {title}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-bold text-text-dark lg:block lg:font-medium lg:text-gray-700">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    مدرس:
                  </span>
                  <span>{teacher}</span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ برگزاری:
                  </span>
                  <span>
                    {startTime
                      ? new Date(startTime).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-text-dark lg:block">
                  <span className="text-xs font-normal text-gray-500 lg:hidden">
                    تاریخ اتمام:
                  </span>
                  <span>
                    {endTime
                      ? new Date(endTime).toLocaleDateString("fa-IR")
                      : "ثبت نشده"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 lg:mt-0 lg:contents lg:border-none lg:pt-0">
                  <div className="flex items-center justify-start lg:mx-auto lg:justify-center">
                    <span className="rounded-full bg-[#F43DF4] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white">
                      {level}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 lg:justify-center">
                    <button
                      type="button"
                      className="text-gray-400 transition-opacity hover:opacity-75"
                      onClick={() => handleOpenModal(favorite)}
                    >
                      <img
                        src={viewIcon}
                        alt="مشاهده"
                        className="h-[24px] w-[24px]"
                      />
                    </button>
                    <button className="text-gray-400 transition-opacity hover:opacity-75">
                      <img
                        src={downloadIcon}
                        alt="دانلود"
                        className="h-[20px] w-[20px]"
                      />
                    </button>
                    <button className="text-red-400 transition-opacity hover:opacity-75">
                      <img
                        src={cancelIcon}
                        alt="حذف"
                        className="h-[20px] w-[20px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
        type="course"
      />
    </div>
  );
}