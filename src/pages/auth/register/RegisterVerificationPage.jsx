import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyMessageApi } from "../../../core/services/auth/login";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { registerProgressSteps } from "../../../Components/common/auth/authProgress.config.js";
import toast from "react-hot-toast";

export default function RegisterVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // دریافت ایمیل ارسال شده از صفحه ثبت‌نام
  const email = location.state?.email ?? "";
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/auth/register", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

const verifyMutation = useMutation({
  mutationFn: verifyMessageApi,
  onSuccess: (_, variables) => {
    toast.success("ایمیل شما با موفقیت تأیید شد");
    navigate("/auth/register-info", {
      state: {
        email: variables.email,
        verified: true,
      },
    });
  },
  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "کد وارد شده معتبر نیست. دوباره تلاش کنید."
    );
  },
});
  const formik = useFormik({
    initialValues: {
      verifyCode: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.verifyCode.trim()) {
        errors.verifyCode = "لطفاً کد تأیید را وارد کنید.";
      }
      return errors;
    },
    onSubmit: (values) => {
      verifyMutation.mutate({
        email,
        verifyCode: values.verifyCode.trim(),
      });
    },
  });

  const errorMessage =
    verifyMutation.error?.response?.data?.message ||
    verifyMutation.error?.message;

  if (!email) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-6 bg-bg-main px-4 py-4 sm:px-6 md:min-h-[650px] md:py-6 md:px-8 lg:px-12 xl:px-24"
    >
      <div className="mb-2 flex w-full items-center justify-end md:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center rounded-full border border-[#e5e7eb] px-3 py-1.5 text-[13px] font-semibold text-primary transition-colors hover:bg-gray-50"
        >
          صفحه اصلی
        </button>
      </div>

      <AuthProgress steps={registerProgressSteps} activeStep={2} />

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
            تأیید کد ارسال شده
          </h1>

          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            لطفاً کد ارسال شده به ایمیل{" "}
            <span dir="ltr" className="inline-block text-primary">
              {email}
            </span>{" "}
            را وارد کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[398px] flex-col gap-4 md:mt-6">
          <InputGroup
            id="verifyCode"
            label="کد تأیید"
            type="text"
            placeholder="کد تأیید خود را وارد کنید"
            value={formik.values.verifyCode}
            onChange={formik.handleChange}
            error={
              (formik.touched.verifyCode || formik.submitCount > 0) &&
              formik.errors.verifyCode
                ? formik.errors.verifyCode
                : null
            }
          />
        </div>

        <div className="mt-3 flex w-full max-w-[398px] justify-start">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-4 py-2 text-[11px] font-medium text-primary">
            <span>ارسال مجدد کد تأیید</span>
            <span dir="ltr">
              {minutes}:{seconds}
            </span>
          </div>
        </div>

        {verifyMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage || "تأیید کد با خطا مواجه شد. دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={verifyMutation.isPending}>
            {verifyMutation.isPending ? "در حال بررسی..." : "تأیید"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] text-sm font-semibold text-primary transition-colors hover:bg-gray-50 md:text-base"
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}
