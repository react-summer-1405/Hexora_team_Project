import React from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";

import { resetPasswordApi } from "../../../core/services/auth/login";
// import { resetPasswordInputs } from "../../../core/constants/auth/login/resetPasswordInputs/resetPasswordInputs";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { forgotPasswordProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  // گاهی اوقات ایمیل یا کد تایید از طریق URL یا State از صفحه قبل میاد
  // const location = useLocation();

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("رمز عبور شما با موفقیت تغییر کرد.");
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "تغییر رمز عبور با خطا مواجه شد.";
      toast.error(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      resetValue: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.resetValue.trim()) {
        errors.resetValue = "لطفاً کد تایید را وارد کنید.";
      }

      if (!values.newPassword) {
        errors.newPassword = "لطفاً رمز عبور جدید خود را وارد کنید.";
      } else if (values.newPassword.length < 8) {
        errors.newPassword = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "لطفاً تکرار رمز عبور را وارد کنید.";
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "رمز عبور و تکرار آن باید یکسان باشند.";
      }

      return errors;
    },
    onSubmit: (values) => {
      resetPasswordMutation.mutate({
        resetValue: values.resetValue.trim(),
        newPassword: values.newPassword,
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
        <AuthProgress steps={forgotPasswordProgressSteps} activeStep={3} />
      </div>

      <div className="mt-4 flex w-full flex-col items-center gap-2 text-center md:mt-10 md:items-start md:text-right">
        <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
          تغییر رمز عبور
        </h1>

        <p className="w-full max-w-[346px] mt-2 text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
          لطفا کد تایید و رمز عبور جدید خود را وارد کنید و آن را تایید نمایید.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col">
        <div className="mt-6 flex w-full max-w-[398px] flex-col gap-4">
          <InputGroup
            id="resetValue"
            label="کد تایید"
            type="text"
            placeholder="کدی که برای شما ارسال شده"
            value={formik.values.resetValue}
            onChange={formik.handleChange}
          />
          {formik.submitCount > 0 && formik.errors.resetValue && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.resetValue}
            </p>
          )}

          <InputGroup
            id="newPassword"
            label="رمز عبور جدید"
            type="password"
            placeholder="رمز عبور جدید خود را وارد کنید"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.submitCount > 0 && formik.errors.newPassword && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.newPassword}
            </p>
          )}

          <InputGroup
            id="confirmPassword"
            label="تکرار رمز عبور"
            type="password"
            placeholder="رمز عبور جدید را دوباره وارد کنید"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.submitCount > 0 && formik.errors.confirmPassword && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mt-8 w-full max-w-[398px]">
          <Button type="submit" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending
              ? "در حال تایید..."
              : "تایید رمز عبور"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center md:justify-center">
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
