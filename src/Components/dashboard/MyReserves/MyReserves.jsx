import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavoriteCourses } from "../../../hooks/dashboard/useFavoriteCourses";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";
import DetailModal from "../../common/DetailModal/DetailModal";
import defaultReactImg from "../../../assets/images/react.png";

export default function MyReserves({ showHeader = true }) {
  const { data, isLoading, isError } = useFavoriteCourses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageStates, setImageStates] = useState({});

  const reserves = data?.favoriteCourseDto || [];

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    reserves.forEach((reserve) => {
      const currentId = reserve.favoriteId;
      const imageUrl = reserve.imageAddress || "/default-placeholder.png";

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
  }, [reserves]);

  if (isLoading) {
    return (
      <div className="mt-6 w-full min-w-0 rounded-[24px] bg-bg-light p-10 text-center text-sm font-medium text-gray-500 lg:flex-[2]">
        در حال دریافت اطلاعات رزروها...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 w-full min-w-0 rounded-[24px] bg-bg-light p-10 text-center text-sm font-medium text-red-500 lg:flex-[2]">
        خطا در دریافت اطلاعات.
      </div>
    );
  }

  return (
    <div
      className="mt-6 w-full min-w-0 rounded-[24px] bg-bg-light p-4 text-right lg:flex-[2] md:p-6"
      dir="rtl"
    >
      {showHeader && (
        <div className="mb-6 flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-gray-800">رزرو من</h3>

          <Link
            to="/dashboard/my-reserve"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            <img
              src={arrowLeftIcon}
              alt="مشاهده بیشتر"
              className="h-[20px] w-[20px]"
            />
            مشاهده بیشتر
          </Link>
        </div>
      )}

      {/* عنوان ستون‌ها؛ فقط در دسکتاپ */}
      <div className="mb-4 hidden items-center rounded-2xl bg-text-light px-4 py-3 text-center text-xs font-medium text-gray-500 lg:grid lg:grid-cols-[60px_1.5fr_1fr_1fr_80px]">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>وضعیت</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {reserves.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500">
            رزروی برای نمایش وجود ندارد.
          </div>
        ) : (
          reserves.map((reserve) => {
            const imgState = imageStates[reserve.favoriteId] || {
              isLoading: true,
              hasError: false,
              src: "",
            };

            return (
              <div
                key={reserve.favoriteId}
                className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1fr_1fr_80px] lg:items-center lg:gap-0 lg:border-none lg:p-0 lg:px-4 lg:text-center lg:shadow-none"
              >
                <div className="flex min-w-0 items-center gap-3 lg:contents">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] shadow-sm lg:mx-auto lg:h-12 lg:w-12 ${
                      imgState.hasError ? "bg-[#87DFFF]" : "bg-gray-100"
                    }`}
                  >
                    {imgState.isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-200"></div>
                    ) : (
                      <img
                        src={imgState.src}
                        alt={reserve.courseTitle}
                        className={`h-full w-full rounded-[14px] ${
                          imgState.hasError
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-1 lg:contents">
                    <span className="truncate text-sm font-bold text-[#2F2F2F]">
                      {reserve.courseTitle}
                    </span>

                    <span className="text-xs font-medium text-gray-500 lg:hidden">
                      {reserve.teacheName}
                    </span>
                  </div>
                </div>

                <span className="hidden text-sm font-medium text-gray-700 lg:block">
                  {reserve.teacheName}
                </span>

                <div className="flex items-center justify-between gap-3 border-t border-gray-50 pt-3 lg:contents lg:border-none lg:pt-0">
                  <div className="flex items-center justify-center lg:mx-auto">
                    <span className="rounded-full bg-red-500 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white">
                      تایید نشده
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 lg:justify-center">
                    <button
                      type="button"
                      className="transition-opacity hover:opacity-75"
                      aria-label="مشاهده دوره"
                      onClick={() => handleOpenModal(reserve)}
                    >
                      <img
                        src={viewIcon}
                        alt="مشاهده"
                        className="h-[24px] w-[24px]"
                      />
                    </button>

                    <button className="transition-opacity hover:opacity-75">
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
