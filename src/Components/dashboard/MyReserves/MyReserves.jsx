import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/react";
import { getMyCoursesReserve } from "../../../core/services/dashboard/reserve.api";
import arrowLeftIcon from "../../../assets/icons/dashboard/arrow-left-01.png";
import viewIcon from "../../../assets/icons/dashboard/view.png";
import cancelIcon from "../../../assets/icons/dashboard/cancel-01.png";
import DetailModal from "../../common/DetailModal/DetailModal";
import defaultReactImg from "../../../assets/images/react.png";

export default function MyReserves({
  showHeader = true,
  searchText = "",
  filterStatus = null,
  dateRange = [],
}) {
  const [rawReserves, setRawReserves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageStates, setImageStates] = useState({});

  const fetchReserves = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getMyCoursesReserve();
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setRawReserves(list);
    } catch (err) {
      console.error("خطا در دریافت رزروهای من:", err);
      setIsError(true);
      setRawReserves([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReserves();
  }, [fetchReserves]);

  const reserves = rawReserves.filter((item) => {
    const title = (item.courseName || "").toLowerCase();
    const teacher = (item.teacher || "").toLowerCase();
    const query = searchText.trim().toLowerCase();

    if (query && !title.includes(query) && !teacher.includes(query)) {
      return false;
    }

    if (filterStatus === "approved" && !item.accept) {
      return false;
    }
    if (filterStatus === "unapproved" && item.accept) {
      return false;
    }

    if (Array.isArray(dateRange) && dateRange.length > 0) {
      const start = dateRange[0]?.toDate
        ? dateRange[0].toDate().getTime()
        : null;
      const end = dateRange[1]?.toDate
        ? dateRange[1].toDate().getTime()
        : start;
      const itemStart = item.startDate
        ? new Date(item.startDate).getTime()
        : null;

      if (start && itemStart && (itemStart < start || itemStart > end)) {
        return false;
      }
    }

    return true;
  });

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    reserves.forEach((reserve) => {
      const currentId = reserve.id || reserve.reserveId;
      const imageUrl = reserve.image || defaultReactImg;

      if (!currentId || imageStates[currentId]) return;

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
    });
  }, [reserves, imageStates]);

  return (
    <div
      className="w-full min-w-0 rounded-[24px] bg-bg-light p-4 text-right lg:flex-[2] md:p-6"
      dir="rtl"
    >
      {showHeader && (
        <div className="mb-6 flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-text-muted">رزرو من</h3>

          <Link
            to="/dashboard/my-reserve"
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
      )}

      <div className="mb-4 hidden items-center rounded-2xl bg-bg-main px-4 py-3 text-center text-xs font-medium text-text-muted lg:grid lg:grid-cols-[60px_1.5fr_1fr_1fr_80px]">
        <span>#</span>
        <span>نام</span>
        <span>مدرس</span>
        <span>وضعیت</span>
        <span></span>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm lg:grid lg:grid-cols-[60px_1.5fr_1fr_1fr_80px] lg:items-center lg:gap-0 lg:border-none lg:p-0 lg:px-4 lg:text-center lg:shadow-none"
            >
              <div className="flex min-w-0 items-center gap-3 lg:contents">
                <Skeleton className="flex h-14 w-14 shrink-0 rounded-[14px] lg:mx-auto lg:h-12 lg:w-12">
                  <div className="h-full w-full rounded-[14px] bg-default-200"></div>
                </Skeleton>

                <div className="flex min-w-0 flex-col gap-2 lg:contents">
                  <Skeleton className="h-4 w-3/4 rounded-lg lg:mx-auto">
                    <div className="h-4 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>

                  <Skeleton className="h-3 w-1/2 rounded-lg lg:hidden">
                    <div className="h-3 w-full rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </div>

              <Skeleton className="hidden h-4 w-3/4 rounded-lg lg:mx-auto lg:block">
                <div className="h-4 w-full rounded-lg bg-default-200"></div>
              </Skeleton>

              <div className="flex items-center justify-between gap-3 border-t border-gray-50 pt-3 lg:contents lg:border-none lg:pt-0">
                <div className="flex items-center justify-center lg:mx-auto">
                  <Skeleton className="h-6 w-16 rounded-full">
                    <div className="h-6 w-full rounded-full bg-default-200"></div>
                  </Skeleton>
                </div>

                <div className="flex items-center justify-end gap-3 lg:justify-center">
                  <Skeleton className="h-[24px] w-[24px] rounded-full">
                    <div className="h-full w-full rounded-full bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="h-[20px] w-[20px] rounded-full">
                    <div className="h-full w-full rounded-full bg-default-200"></div>
                  </Skeleton>
                </div>
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="py-4 text-center text-sm font-medium text-danger">
            خطا در دریافت اطلاعات.
          </div>
        ) : reserves.length === 0 ? (
          <div className="py-4 text-center text-sm text-text-muted">
            رزروی برای نمایش وجود ندارد.
          </div>
        ) : (
          reserves.map((reserve) => {
            const currentId = reserve.id || reserve.reserveId;
            const isAccepted = Boolean(reserve.accept);
            const imgState = imageStates[currentId] || {
              isLoading: false,
              hasError: false,
              src: reserve.image || defaultReactImg,
            };

            return (
              <div
                key={currentId}
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
                        alt={reserve.courseName || "دوره"}
                        className={`h-full w-full rounded-[14px] ${
                          imgState.hasError
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-1 lg:contents">
                    <span className="truncate text-sm font-bold text-text-dark">
                      {reserve.courseName || "بدون عنوان"}
                    </span>

                    <span className="text-xs font-medium text-text-muted lg:hidden">
                      {reserve.teacher || "-"}
                    </span>
                  </div>
                </div>

                <span className="hidden text-sm font-medium text-text-muted lg:block">
                  {reserve.teacher || "-"}
                </span>

                <div className="flex items-center justify-between gap-3 border-t border-gray-50 pt-3 lg:contents lg:border-none lg:pt-0">
                  <div className="flex items-center justify-center lg:mx-auto">
                    <span
                      className={`rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wide text-text-light ${
                        isAccepted ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    >
                      {isAccepted ? "تایید شده" : "تایید نشده"}
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

                    <button
                      type="button"
                      className="transition-opacity hover:opacity-75"
                      aria-label="حذف"
                    >
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
