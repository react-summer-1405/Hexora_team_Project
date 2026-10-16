import React from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { resetPasswordApi } from "../../../core/services/auth/login";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { loginProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { configValue } = useParams();
  const [searchParams] = useSearchParams();

  const stateEmail = location.state?.email ?? "";

  const urlResetValue =
    configValue || searchParams.get("resetValue") || searchParams.get("code") || "";

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordApi,
    // onSuccess: (data) => {
    //   toast.success(data?.message || "رمز عبور شما با موفقیت تغییر کرد.");
    //   navigate("/auth/login", { replace: true });
    // },
  });

  const formik = useFormik({
    initialValues: {
      email: stateEmail,
      resetValue: urlResetValue,
      newPassword: "",
    },

    validate: (values) => {
      const errors = {};
      const email = values.email.trim();

      if (!email) {
        errors.email = "لطفاً ایمیل خود را وارد کنید.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "لطفاً یک ایمیل معتبر وارد کنید.";
      }

      if (!values.resetValue.trim()) {
        errors.resetValue = "لطفاً کد بازیابی ارسال شده به ایمیل را وارد کنید.";
      }

      if (!values.newPassword) {
        errors.newPassword = "لطفاً رمز عبور جدید خود را وارد کنید.";
      } else if (values.newPassword.length < 6) {
        errors.newPassword = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
      }

      return errors;
    },

    onSubmit: (values) => {
      resetPasswordMutation.mutate({
        email: values.email.trim(),
        resetValue: values.resetValue.trim(),
        newPassword: values.newPassword,
      });
    },
  });

  const errorMessage =
    resetPasswordMutation.error?.response?.data?.message ||
    resetPasswordMutation.error?.response?.data?.errors?.[0]?.msg ||
    resetPasswordMutation.error?.message;

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-white px-4 py-4 sm:px-6 md:min-h-[704px] md:max-w-[748px] md:py-6 md:px-8 lg:px-12 xl:px-24"
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

      <AuthProgress steps={loginProgressSteps} activeStep={2} />

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
            تغییر رمز عبور
          </h1>

          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            کد بازیابی ارسال شده به ایمیل{" "}
            {stateEmail && (
              <span dir="ltr" className="inline-block text-primary">
                {stateEmail}
              </span>
            )}{" "}
            و رمز عبور جدید خود را وارد کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[398px] flex-col gap-4 md:mt-6">
          {/* اگر ایمیل از صفحه قبل نیامده بود (مثلاً با کلیک روی لینک ایمیل)، فیلد ایمیل نمایش داده شود */}
          {!stateEmail && (
            <InputGroup
              id="email"
              label="ایمیل"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                (formik.touched.email || formik.submitCount > 0) &&
                formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
          )}

          <InputGroup
            id="resetValue"
            label="کد بازیابی"
            type="text"
            placeholder="کد ارسال شده به ایمیل را وارد کنید"
            value={formik.values.resetValue}
            onChange={formik.handleChange}
            error={
              (formik.touched.resetValue || formik.submitCount > 0) &&
              formik.errors.resetValue
                ? formik.errors.resetValue
                : null
            }
          />

          <InputGroup
            id="newPassword"
            label="رمز عبور جدید"
            type="password"
            placeholder="رمز عبور جدید خود را وارد کنید"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              (formik.touched.newPassword || formik.submitCount > 0) &&
              formik.errors.newPassword
                ? formik.errors.newPassword
                : null
            }
          />
        </div>

        {resetPasswordMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-right text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage ||
              "تغییر رمز عبور با خطا مواجه شد. لطفاً دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending
              ? "در حال ثبت..."
              : "تأیید و تغییر رمز عبور"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center">
          <button
            type="button"
            onClick={() => navigate("/auth/forget-password")}
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] text-sm font-semibold text-primary transition-colors hover:bg-gray-50 md:text-base"
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}