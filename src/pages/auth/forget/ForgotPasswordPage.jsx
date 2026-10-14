import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { forgotPasswordApi } from "../../../core/services/auth/login";

import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { forgotPasswordProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد.");

      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "ارسال لینک با خطا مواجه شد.";
      toast.error(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      const email = values.email.trim();

      if (!email) {
        errors.email = "لطفاً ایمیل خود را وارد کنید.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "لطفاً یک ایمیل معتبر وارد کنید.";
      }

      return errors;
    },
    onSubmit: (values) => {
      forgotPasswordMutation.mutate({
        email: values.email.trim(),

        baseUrl: window.location.origin + "/auth/reset-password",
      });
    },
  });

  const HomeIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-white px-4 py-6 sm:px-6 md:min-h-[704px] md:max-w-[748px] md:pl-6 md:pr-[96px]"
    >
      <div className="mb-2 flex w-full items-center justify-end md:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-1.5 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-[13px] font-semibold text-primary transition-colors hover:bg-gray-50"
        >
          <HomeIcon />
          صفحه اصلی
        </button>
      </div>

      <div className="w-full max-w-[514px]">
        <AuthProgress steps={forgotPasswordProgressSteps} activeStep={1} />
      </div>

      <div className="mt-4 flex w-full flex-col items-center gap-2 text-center md:mt-10 md:items-start md:text-right">
        <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
          فراموشی رمزعبور!
        </h1>

        <p className="w-full max-w-[346px] mt-2 text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
          اگر رمزعبور خود را فراموش کرده‌اید ایمیل خود را وارد کنید تا لینک صفحه
          تغییر رمزعبور برای شما ارسال شود
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col">
        <div className="mt-6 flex w-full max-w-[398px] flex-col gap-4">
          <InputGroup
            id="email"
            label="ایمیل"
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          {formik.submitCount > 0 && formik.errors.email && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="mt-8 w-full max-w-[398px]">
          <Button type="submit" disabled={forgotPasswordMutation.isPending}>
            {forgotPasswordMutation.isPending
              ? "در حال ارسال..."
              : "ارسال لینک"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center md:justify-center">
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center gap-1.5 rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] text-sm font-semibold text-primary transition-colors hover:bg-gray-50 md:text-base"
          >
            <ChevronLeftIcon />
            <span>بازگشت</span>
          </button>
        </div>
      </form>
    </div>
  );
}
