import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../core/services/auth/login";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { registerProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function RegisterInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const phoneNumber = location.state?.phoneNumber ?? "";
  const isVerified = location.state?.verified === true;

  //   useEffect(() => {
  //     if (!phoneNumber || !isVerified) {
  //       navigate("/auth/register", { replace: true });
  //     }
  //   }, [phoneNumber, isVerified, navigate]);

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      navigate("/auth/login", {
        replace: true,
        state: {
          registered: true,
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};
      const email = values.email.trim();

      if (!email) {
        errors.email = "لطفاً ایمیل خود را وارد کنید.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "لطفاً یک ایمیل معتبر وارد کنید.";
      }

      if (!values.password) {
        errors.password = "لطفاً رمز عبور خود را وارد کنید.";
      }

      return errors;
    },

    onSubmit: (values) => {
      registerMutation.mutate({
        password: values.password,
        gmail: values.email.trim(),
        phoneNumber,
      });
    },
  });

  const errorMessage =
    registerMutation.error?.response?.data?.message ||
    registerMutation.error?.message;

  //api is not complete

  //   if (!phoneNumber || !isVerified) {
  //     return null;
  //   }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-white px-4 py-6 sm:px-6 md:min-h-[704px] md:max-w-[748px] md:pl-6 md:pr-[96px]"
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

      <div className="w-full max-w-[514px]">
        <AuthProgress steps={registerProgressSteps} activeStep={3} />
      </div>

      <div className="mt-4 flex w-full flex-col items-center gap-2 text-center md:mt-10 md:items-start md:text-right">
        <h1 className="w-full text-[26px] font-semibold text-text-dark md:text-[28px]">
          وارد کردن اطلاعات شخصی
        </h1>

        <p className="w-full max-w-[346px] text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
          لطفاً اطلاعات اولیه خواسته شده را وارد کنید.
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

          <InputGroup
            id="password"
            label="رمز عبور"
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          {formik.submitCount > 0 && formik.errors.password && (
            <p className="text-sm text-red-600" role="alert">
              {formik.errors.password}
            </p>
          )}
        </div>

        {registerMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage || "ثبت‌نام با خطا مواجه شد. لطفاً دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px]">
          <Button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending
              ? "در حال ثبت‌نام..."
              : "تأیید و ایجاد حساب"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center">
          <button
            type="button"
            onClick={() =>
              navigate("/auth/register-verification", {
                state: {
                  phoneNumber,
                },
              })
            }
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] text-sm font-semibold text-primary transition-colors hover:bg-gray-50 md:text-base"
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}
