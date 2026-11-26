import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Skeleton } from "@heroui/react";
import {
  paymentStepOne,
  paymentStepTwo,
} from "../../core/services/dashboard/payment.api";
import Api_client from "../../core/interceptor/interceptor";

const LAST_PAYING_RESERVE_KEY = "active_payment_reserve_id";

const fetchMyReservesList = async () => {
  const candidates = [
    "/SharePanel/GetMyCoursesReserve",
    "/SharePanel/GetMyCoursesReserves",
    "/CourseReserve/GetMyCoursesReserve",
  ];

  for (const endpoint of candidates) {
    try {
      const res = await Api_client.get(endpoint);
      const data = res?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.myCoursesReserves)) return data.myCoursesReserves;
      if (Array.isArray(data?.reserves)) return data.reserves;
      if (Array.isArray(data?.list)) return data.list;
    } catch {
      // ادامه به مسیر بعدی
    }
  }
  return [];
};

const fetchPaidCourseIds = async () => {
  const paidIds = new Set();

  // ۱. بررسی دوره‌های ثبت‌شده در «دوره‌های من»
  try {
    const res = await Api_client.get("/SharePanel/GetMyCourses", {
      params: { PageNumber: 1, RowsOfPage: 100 },
    });
    const list =
      res?.data?.listOfMyCourses ||
      res?.data?.myCourses ||
      (Array.isArray(res?.data) ? res.data : []);
    list.forEach((c) => {
      if (c?.courseId) paidIds.add(String(c.courseId));
      if (c?.id) paidIds.add(String(c.id));
    });
  } catch {
    // نادیده گرفتن در صورت خطا
  }

  // ۲. بررسی لیست پرداخت‌های دانشجو
  const payEndpoints = [
    "/NewVersion/CoursePayment/StudentUserPayList",
    "/CoursePayment/StudentUserPayList",
  ];
  for (const ep of payEndpoints) {
    try {
      const res = await Api_client.get(ep);
      const list = Array.isArray(res?.data)
        ? res.data
        : res?.data?.list || res?.data?.payments || [];
      list.forEach((p) => {
        if (p?.accept === true || p?.isPay === true || p?.status === true) {
          if (p?.courseId) paidIds.add(String(p.courseId));
          if (p?.reserveId) paidIds.add(String(p.reserveId));
        }
      });
      break;
    } catch {
      // ادامه به مسیر بعدی
    }
  }

  return paidIds;
};

export default function PaymentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reserves, setReserves] = useState([]);
  const [paidIds, setPaidIds] = useState(new Set());
  const [isLoadingReserves, setIsLoadingReserves] = useState(true);
  const [selectedReserve, setSelectedReserve] = useState(null);
  const [manualReserveId, setManualReserveId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [authorityCode, setAuthorityCode] = useState("");
  const [gatewayStatus, setGatewayStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [loadingStep, setLoadingStep] = useState(null);

  useEffect(() => {
    const urlAuthority =
      searchParams.get("Authority") || searchParams.get("authority");
    const urlStatus = searchParams.get("Status") || searchParams.get("status");

    if (urlAuthority) {
      setAuthorityCode(urlAuthority);
    }
    if (urlStatus) {
      setGatewayStatus(urlStatus);
      if (urlStatus.toUpperCase() === "OK") {
        setStatusMessage(
          "بازگشت از درگاه با وضعیت OK انجام شد. اکنون «تایید نهایی پرداخت» را بزنید.",
        );
        setIsError(false);
      }
    }
  }, [searchParams]);

  const loadReserves = useCallback(async () => {
    setIsLoadingReserves(true);
    try {
      const [list, alreadyPaidSet] = await Promise.all([
        fetchMyReservesList(),
        fetchPaidCourseIds(),
      ]);

      setReserves(list);
      setPaidIds(alreadyPaidSet);

      const savedReserveId = localStorage.getItem(LAST_PAYING_RESERVE_KEY);
      const savedMatch = savedReserveId
        ? list.find(
            (item) =>
              (item.reserveId || item.id) === savedReserveId &&
              Boolean(item.accept) &&
              !alreadyPaidSet.has(String(item.courseId)) &&
              !alreadyPaidSet.has(String(item.reserveId || item.id)),
          )
        : null;

      const firstPayable =
        savedMatch ||
        list.find(
          (item) =>
            Boolean(item.accept) &&
            !alreadyPaidSet.has(String(item.courseId)) &&
            !alreadyPaidSet.has(String(item.reserveId || item.id)),
        );

      if (firstPayable) {
        const resId = firstPayable.reserveId || firstPayable.id || "";
        setSelectedReserve(firstPayable);
        setManualReserveId(resId);
      } else {
        setSelectedReserve(null);
        setManualReserveId("");
      }
    } catch (err) {
      console.error("خطا در دریافت لیست رزروها:", err);
    } finally {
      setIsLoadingReserves(false);
    }
  }, []);

  useEffect(() => {
    loadReserves();
  }, [loadReserves]);

  const activeReserveId = (
    manualReserveId ||
    selectedReserve?.reserveId ||
    selectedReserve?.id ||
    ""
  ).trim();

  const handleSelectReserve = (item) => {
    const resId = item.reserveId || item.id || "";
    setSelectedReserve(item);
    setManualReserveId(resId);
    localStorage.setItem(LAST_PAYING_RESERVE_KEY, resId);
    setPaymentLink("");
    setStatusMessage("");
    setIsError(false);
    setIsPaymentCompleted(false);
  };

  const handleStepOne = async () => {
    if (!activeReserveId) {
      setIsError(true);
      setStatusMessage("ابتدا یک دوره قابل پرداخت را از لیست انتخاب کنید.");
      return;
    }

    localStorage.setItem(LAST_PAYING_RESERVE_KEY, activeReserveId);
    setLoadingStep("step1");
    setIsError(false);
    setStatusMessage("");
    setPaymentLink("");

    try {
      const callbackUrl =
        typeof window !== "undefined" && window.location.origin
          ? `${window.location.origin}/dashboard/payments`
          : "http://localhost:5173/dashboard/payments";

      const data = await paymentStepOne(activeReserveId, callbackUrl);
      setPaymentLink(data?.link || "");
      setStatusMessage(
        data?.message ||
          "لینک پرداخت با موفقیت آماده شد. وارد درگاه شوید و پس از بازگشت مرحله دوم را بزنید.",
      );
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      setIsError(true);
      setStatusMessage(
        status === 500
          ? `${serverMsg || "خطای داخلی سرور رخ داد."} (کد ۵۰۰ از سمت سرور)`
          : serverMsg || "خطا در دریافت لینک مرحله اول پرداخت.",
      );
    } finally {
      setLoadingStep(null);
    }
  };

  const handleStepTwo = async () => {
    if (!activeReserveId) {
      setIsError(true);
      setStatusMessage("شناسه رزرو معتبر نیست.");
      return;
    }

    setLoadingStep("step2");
    setIsError(false);
    setStatusMessage("");

    try {
      const cleanAuthority = authorityCode.trim();
      const cleanStatus = (gatewayStatus || "OK").trim();
      const payload = {
        ...(cleanAuthority
          ? { authority: cleanAuthority, Authority: cleanAuthority }
          : {}),
        status: cleanStatus,
        Status: cleanStatus,
      };

      const data = await paymentStepTwo(activeReserveId, payload);
      localStorage.removeItem(LAST_PAYING_RESERVE_KEY);
      setIsPaymentCompleted(true);
      setAuthorityCode("");
      setSearchParams({});
      setStatusMessage(
        data?.message || "پرداخت دوره با موفقیت تایید و تکمیل شد.",
      );
      await loadReserves();
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      setIsError(true);
      setStatusMessage(
        status === 500
          ? `${serverMsg || "خطای داخلی سرور رخ داد."} (کد ۵۰۰ در StepTwoToPay)`
          : serverMsg || "خطا در تایید مرحله دوم پرداخت.",
      );
    } finally {
      setLoadingStep(null);
    }
  };

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-6 rounded-[24px] bg-bg-light p-4 text-right text-text-dark md:p-6"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-text-dark">پرداخت دوره‌ها</h2>
          <p className="text-xs text-text-muted">
            دوره تاییدشده را انتخاب کنید، لینک درگاه را بگیرید و پس از بازگشت
            تایید نهایی را بزنید.
          </p>
        </div>

        <button
          type="button"
          onClick={loadReserves}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-text-dark transition-colors hover:border-primary hover:text-primary"
        >
          بروزرسانی لیست رزروها
        </button>
      </div>

      {/* بخش ۱: انتخاب از لیست رزروها */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-dark">
            ۱. انتخاب دوره از رزروهای شما
          </h3>
          {selectedReserve && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              انتخاب‌شده: {selectedReserve.courseName}
            </span>
          )}
        </div>

        {isLoadingReserves ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-24 w-full rounded-2xl">
                <div className="h-24 w-full rounded-2xl bg-default-200" />
              </Skeleton>
            ))}
          </div>
        ) : reserves.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-5 text-center text-xs text-text-muted">
            رزروی یافت نشد.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {reserves.map((item, idx) => {
              const resId = item.reserveId || item.id || String(idx);
              const isAlreadyPaid =
                paidIds.has(String(item.courseId)) ||
                paidIds.has(String(resId));
              const isApproved = Boolean(item.accept);
              const isPayable = isApproved && !isAlreadyPaid;
              const isSelected = activeReserveId === resId && isPayable;

              return (
                <button
                  key={resId}
                  type="button"
                  disabled={!isPayable}
                  onClick={() => handleSelectReserve(item)}
                  className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 text-right transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : isPayable
                        ? "border-border bg-bg-dark/40 hover:border-primary/60"
                        : "cursor-not-allowed border-border/60 bg-bg-dark/20 opacity-65"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2 text-sm font-bold text-text-dark">
                      {item.courseName || "دوره"}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isAlreadyPaid
                          ? "bg-blue-500/15 text-blue-400"
                          : isApproved
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {isAlreadyPaid
                        ? "پرداخت شده"
                        : isApproved
                          ? "تایید شده (قابل پرداخت)"
                          : "تایید نشده"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span>مدرس: {item.teacher || "—"}</span>
                    <span className="font-mono text-[10px] opacity-80">
                      {resId.slice(0, 8)}...
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-1 flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-muted">
            شناسه رزرو فعال (ReserveId)
          </label>
          <input
            type="text"
            value={manualReserveId}
            onChange={(e) => {
              setManualReserveId(e.target.value);
              setSelectedReserve(null);
            }}
            placeholder="با انتخاب دوره تاییدشده خودکار پر می‌شود"
            dir="ltr"
            className="w-full rounded-2xl border border-border bg-bg-dark/50 px-4 py-2.5 text-left font-mono text-xs text-text-dark outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* بخش ۲: مرحله اول */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-bg-dark/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-dark">
              ۲. مرحله اول: دریافت لینک درگاه پرداخت
            </span>
            <span className="text-[11px] text-text-muted">
              ایجاد تراکنش و دریافت لینک پرداخت برای رزرو انتخاب‌شده
            </span>
          </div>

          <button
            type="button"
            disabled={!activeReserveId || loadingStep === "step1"}
            onClick={handleStepOne}
            className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingStep === "step1"
              ? "در حال دریافت لینک..."
              : "دریافت لینک پرداخت"}
          </button>
        </div>

        {paymentLink && (
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
            <span
              dir="ltr"
              className="break-all text-left font-mono text-xs text-text-dark"
            >
              {paymentLink}
            </span>
            <a
              href={paymentLink}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-primary-hover"
            >
              ورود به درگاه
            </a>
          </div>
        )}
      </div>

      {/* بخش ۳: مرحله دوم */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-bg-dark/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-text-dark">
              ۳. مرحله دوم: تایید نهایی پرداخت
            </span>
            <span className="text-[11px] text-text-muted">
              پس از بازگشت از درگاه، کد Authority خودکار پر می‌شود و می‌توانید
              تایید نهایی را بزنید
            </span>
          </div>

          <button
            type="button"
            disabled={!activeReserveId || loadingStep === "step2"}
            onClick={handleStepTwo}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingStep === "step2" ? "در حال تایید..." : "تایید نهایی پرداخت"}
          </button>
        </div>

        <input
          type="text"
          value={authorityCode}
          onChange={(e) => setAuthorityCode(e.target.value)}
          placeholder="کد Authority / پیگیری (پس از بازگشت از درگاه خودکار پر می‌شود)"
          dir="ltr"
          className="w-full rounded-xl border border-border bg-bg-dark/60 px-4 py-2.5 text-left font-mono text-xs text-text-dark outline-none placeholder:text-right placeholder:font-sans placeholder:text-text-muted focus:border-primary"
        />
      </div>

      {/* پیام وضعیت */}
      {statusMessage && (
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-xs font-bold ${
            isError
              ? "border-red-500/40 bg-red-500/15 text-red-400"
              : "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
          }`}
        >
          <span>{statusMessage}</span>
          {isPaymentCompleted && !isError && (
            <Link
              to="/dashboard/my-courses"
              className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
            >
              مشاهده در دوره‌های من
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
