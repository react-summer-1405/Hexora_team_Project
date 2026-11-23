import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/react";
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
      className="mt-6 w-full min-w-0 rounded-[24px] bg-bg-light p-4 text-right lg:flex-[3] md:p-6"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between gap-2">
        <h3 className="text-base font-bold text-text-dark">دوره‌ من</h3>

        <Link
          to="/dashboard/my-FavoriteCourses"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          <img
            src={arrowLeftIcon}
            alt="مشاهده بیشتر"
            className="h-[20px] w-[20px]"
          />
          مشاهده بیشتر
        </Link>
      </div>

      <div className="mb-4 hidden grid-cols-[60px_1fr_1fr_1.2fr_90px_40px] items-center rounded-2xl bg-bg-field px-4 py-3 text-center text-xs font-medium text-text-muted md:grid dark:bg-bg-light">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>تاریخ برگزاری</span>
        <span>سطح</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm 2xl:grid 2xl:grid-cols-[90px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_90px_40px] 2xl:items-center 2xl:gap-0 2xl:border-none 2xl:p-0 2xl:px-4 2xl:text-center 2xl:shadow-none"
            >
              <div className="flex min-w-0 items-center gap-3 2xl:contents">
                <Skeleton className="flex h-[52px] w-[83px] shrink-0 rounded-[14px] 2xl:mx-auto">
                  <div className="h-full w-full rounded-[14px] bg-default-200"></div>
                </Skeleton>

                <div className="flex min-w-0 flex-col gap-2 2xl:contents">
                  <Skeleton className="h-4 w-3/4 rounded-lg 2xl:mx-auto">
                    <div className="h-4 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="h-3 w-1/2 rounded-lg 2xl:hidden">
                    <div className="h-3 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </div>

              <Skeleton className="hidden h-4 w-3/4 rounded-lg 2xl:mx-auto 2xl:block">
                <div className="h-4 w-full rounded-lg bg-default-200"></div>
              </Skeleton>

              <div className="flex min-w-0 items-center justify-between gap-3 border-t border-gray-50 pt-3 2xl:contents 2xl:border-none 2xl:pt-0">
                <Skeleton className="h-4 w-24 rounded-lg 2xl:mx-auto">
                  <div className="h-4 w-full rounded-lg bg-default-200"></div>
                </Skeleton>

                <div className="flex shrink-0 items-center justify-center 2xl:mx-auto">
                  <Skeleton className="h-6 w-12 rounded-full 2xl:w-16">
                    <div className="h-6 w-full rounded-full bg-default-200"></div>
                  </Skeleton>
                </div>

                <div className="flex shrink-0 items-center justify-end gap-3 2xl:justify-center">
                  <Skeleton className="h-[24px] w-[24px] rounded-full">
                    <div className="h-[24px] w-[24px] rounded-full bg-default-200"></div>
                  </Skeleton>
                </div>
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="py-4 text-center text-sm text-danger">
            خطا در دریافت اطلاعات.
          </div>
        ) : latestCourses.length === 0 ? (
          <div className="py-4 text-center text-sm text-text-muted">
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
                className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm 2xl:grid 2xl:grid-cols-[90px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_90px_40px] 2xl:items-center 2xl:gap-0 2xl:border-none 2xl:p-0 2xl:px-4 2xl:text-center 2xl:shadow-none"
              >
                <div className="flex min-w-0 items-center gap-3 2xl:contents">
                  <div
                    className={`flex h-[52px] w-[83px] shrink-0 items-center justify-center rounded-[14px] shadow-sm 2xl:mx-auto ${
                      imgState.hasError ? "bg-[#87DFFF]" : "bg-gray-100"
                    }`}
                  >
                    {imgState.isLoading ? (
                      <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-200"></div>
                    ) : (
                      <img
                        src={imgState.src}
                        alt={item.courseTitle}
                        className={`h-full w-full rounded-[14px] ${
                          imgState.hasError
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-1 2xl:contents">
                    <span
                      className="min-w-0 truncate whitespace-nowrap text-sm font-bold text-text-dark 2xl:px-2"
                      title={item.courseTitle}
                    >
                      {item.courseTitle?.length > 20
                        ? item.courseTitle.substring(0, 20) + "..."
                        : item.courseTitle}
                    </span>

                    <span className="text-xs font-medium text-text-muted 2xl:hidden">
                      {item.teacheName}
                    </span>
                  </div>
                </div>

                <span className="hidden min-w-0 break-words px-2 text-sm font-medium text-text-muted 2xl:block">
                  {item.teacheName}
                </span>

                <div className="flex min-w-0 items-center justify-between gap-3 border-t border-gray-50 pt-3 2xl:contents 2xl:border-none 2xl:pt-0">
                  <span className="min-w-0 text-xs font-medium text-text-muted 2xl:whitespace-nowrap 2xl:px-1 2xl:text-sm ">
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

                  <div className="flex shrink-0 items-center justify-center 2xl:mx-auto">
                    <span className="rounded-full bg-[#F43DF4] px-3 py-1 text-[10px] font-medium tracking-wide text-text-light 2xl:px-4 2xl:py-1.5 2xl:text-[11px]">
                      پیشرفته
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center justify-end gap-3 2xl:justify-center">
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
