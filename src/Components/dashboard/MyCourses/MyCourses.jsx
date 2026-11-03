import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavoriteCourses } from "../../../hooks/dashboard/useFavoriteCourses";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import DetailModal from "../../common/DetailModal/DetailModal";
import defaultReactImg from "../../../assets/images/react.png";

export default function MyCourses() {
  const { data, isLoading, isError } = useFavoriteCourses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageStates, setImageStates] = useState({});

  const latestCourses = data?.favoriteCourseDto?.slice(0, 3) || [];

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    latestCourses.forEach((item) => {
      const currentId = item.favoriteId;
      const imageUrl = item.imageAddress || "/default-placeholder.png";

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
  }, [latestCourses]);

  return (
    <div
      className="mt-6 w-full lg:w-[75%] rounded-[24px] bg-bg-light p-4 md:p-6 text-right"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-800">دوره‌ من</h3>
        <Link
          to="/dashboard/my-FavoriteCourses"
          className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[20px] w-[20px]"
          />
          مشاهده بیشتر
        </Link>
      </div>

      <div className="mb-4 hidden md:grid grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] items-center rounded-2xl bg-text-light px-4 py-3 text-center text-xs font-medium text-gray-500">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="py-4 text-center text-sm text-gray-500">
            در حال دریافت اطلاعات دوره‌ها...
          </div>
        ) : isError ? (
          <div className="py-4 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات.
          </div>
        ) : latestCourses.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500">
            دوره‌ای برای نمایش وجود ندارد.
          </div>
        ) : (
          latestCourses.map((item) => {
            const imgState = imageStates[item.favoriteId] || {
              isLoading: true,
              hasError: false,
              src: "",
            };

            return (
              <div
                key={item.favoriteId}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm md:grid md:grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] md:items-center md:gap-0 md:border-none md:p-0 md:px-4 md:text-center md:shadow-none"
              >
                <div className="flex items-center gap-3 md:contents">
                  <div
                    className={`flex h-[52px] w-[83px] shrink-0 items-center justify-center rounded-[14px] shadow-sm md:mx-auto ${
                      imgState.hasError ? "bg-[#87DFFF]" : "bg-gray-100"
                    }`}
                  >
                    {imgState.isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-200"></div>
                    ) : (
                      <img
                        src={imgState.src}
                        alt={item.courseTitle}
                        className={`h-full w-full rounded-[14px] ${imgState.hasError ? "object-contain p-2" : "object-cover"}`}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 md:contents">
                    <span
                      className="truncate whitespace-nowrap text-sm font-bold text-gray-800"
                      title={item.courseTitle}
                    >
                      {item.courseTitle?.length > 20
                        ? item.courseTitle.substring(0, 20) + "..."
                        : item.courseTitle}
                    </span>
                    <span className="text-xs font-medium text-gray-500 md:hidden">
                      {item.teacheName}
                    </span>
                  </div>
                </div>

                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  {item.teacheName}
                </span>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3 md:contents md:border-none md:pt-0">
                  <span className="text-xs font-medium text-gray-600 md:text-sm md:text-gray-700">
                    {item.course?.startTime
                      ? new Date(item.course.startTime).toLocaleDateString(
                          "fa-IR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "-"}
                  </span>

                  <div className="flex items-center justify-center md:mx-auto">
                    <span className="rounded-full bg-[#F43DF4] px-3 py-1 text-[10px] font-medium tracking-wide text-white md:px-4 md:py-1.5 md:text-[11px]">
                      پیشرفته
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3 md:justify-center">
                    <button
                      type="button"
                      className="transition-opacity hover:opacity-75"
                      aria-label="مشاهده دوره"
                      onClick={() => handleOpenModal(item)}
                    >
                      <img
                        src={viewIcon}
                        alt="مشاهده"
                        className="h-[24px] w-[24px]"
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
