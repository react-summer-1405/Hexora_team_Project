import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendVerifyMessageApi } from "../../../core/services/auth/login.js";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { registerProgressSteps } from "../../../Components/common/auth/authProgress.config.js";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

const sendVerifyMutation = useMutation({
  mutationFn: sendVerifyMessageApi,
  onSuccess: (_, variables) => {
    toast.success("کد تأیید به ایمیل شما ارسال شد");
    navigate("/auth/register-verification", {
      state: {
        email: variables.email,
      },
    });
  },
  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "ارسال کد انجام نشد. دوباره تلاش کنید."
    );
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
      sendVerifyMutation.mutate({
        email: values.email.trim(),
      });
    },
  });

  const errorMessage =
    sendVerifyMutation.error?.response?.data?.message ||
    sendVerifyMutation.error?.message;

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-6 bg-white px-4 py-4 sm:px-6 md:max-w-[748px] md:py-6 md:px-8 lg:px-12 xl:px-24"
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

      <AuthProgress steps={registerProgressSteps} activeStep={1} />

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
            خوش اومدی!
          </h1>

          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            لطفاً ایمیل خود را وارد کنید تا کد تأیید برای شما ارسال شود.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[398px] flex-col gap-4 md:mt-6">
          <InputGroup
            id="email"
            label="ایمیل"
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
        </div>

        {sendVerifyMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage ||
              "ارسال کد تأیید با خطا مواجه شد. دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={sendVerifyMutation.isPending}>
            {sendVerifyMutation.isPending
              ? "در حال ارسال کد..."
              : "ارسال کد تأیید"}
          </Button>
        </div>

        <div className="mt-6 flex w-full max-w-[398px] flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span className="text-center text-[13px] font-bold text-text-dark md:text-base">
            حساب کاربری دارید؟
          </span>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="text-center text-[13px] font-bold text-primary hover:underline md:text-base"
          >
            ورود به حساب کاربری
          </button>
        </div>

        <div className="hidden w-full max-w-[398px] justify-center md:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] font-semibold text-primary transition-colors hover:bg-gray-50"
          >
            صفحه اصلی
          </button>
        </div>
      </form>
    </div>
  );
}
