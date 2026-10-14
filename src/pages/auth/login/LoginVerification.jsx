import React from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { loginTelegramApi } from "../../../core/services/auth/loginTelegram";
import { setItem } from "../../../core/localStorage/localStorage";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { loginProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function LoginVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const phoneOrGmail = location.state?.phoneOrGmail ?? "";

  const loginMutation = useMutation({
    // mutationFn: loginTelegramApi,

    onSuccess: (data) => {
      const token = data?.token ?? data?.data?.token;

      if (token) {
        setItem("token", token);
      }

      navigate("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.code.trim()) {
        errors.code = "لطفاً کد تأیید را وارد کنید.";
      }

      return errors;
    },

    onSubmit: (values) => {
      loginMutation.mutate({
        code: values.code.trim(),
        phoneOrGmail,
      });
    },
  });

  const errorMessage =
    loginMutation.error?.response?.data?.message ||
    loginMutation.error?.message;

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-white px-4 py-4 sm:px-6 md:min-h-[704px] md:max-w-[748px] md:py-6 md:pl-6 md:pr-8 lg:pr-12 xl:pr-24"
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

      <AuthProgress steps={loginProgressSteps} />

      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col">
        <div className="mt-2 flex flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="text-[26px] font-bold text-text-dark md:text-[28px]">
            تأیید کد دو مرحله‌ای!
          </h1>

          <p className="w-full max-w-[346px] text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            کد دو مرحله‌ای به شماره همراه یا ایمیل شما ارسال شده است. لطفاً کد
            را وارد کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full flex-col gap-4 md:mt-6">
          <InputGroup
            id="code"
            label="کد دو مرحله‌ای"
            type="text"
            placeholder="کد دو مرحله‌ای خود را وارد کنید"
            value={formik.values.code}
            onChange={formik.handleChange}
          />

          {formik.touched.code && formik.errors.code && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.code}
            </p>
          )}
        </div>

        {loginMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage || "تأیید کد با خطا مواجه شد. دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "در حال بررسی کد..." : "تأیید و ورود"}
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
