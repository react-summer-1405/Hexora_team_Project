import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { registerProgressSteps } from "../../../Components/common/auth/authProgress.config.js";

export default function RegisterPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.phoneNumber.trim()) {
        errors.phoneNumber = "لطفاً شماره همراه خود را وارد کنید.";
      }

      return errors;
    },

    onSubmit: (values) => {
      navigate("/auth/register-verification", {
        state: {
          phoneNumber: values.phoneNumber.trim(),
        },
      });
    },
  });

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-white px-4 py-4 sm:px-6 md:min-h-[704px] md:max-w-[748px] md:py-6 md:pl-6 md:pr-[96px]"
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

      <div className="mt-2 flex w-full flex-col items-center gap-2 text-center md:mt-6 md:items-start md:text-right">
        <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
          خوش اومدی{" "}
        </h1>

        <p className="w-full max-w-[346px] text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
          لطفاً شماره همراه خود را وارد کنید تا کد تأیید برای شما ارسال شود.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col">
        <div className="mt-6 flex w-full max-w-[398px] flex-col gap-4">
          <InputGroup
            id="phoneNumber"
            label="شماره همراه"
            type="tel"
            placeholder="شماره همراه خود را وارد کنید"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />

          {formik.submitCount > 0 && formik.errors.phoneNumber && (
            <p className="text-right text-sm text-red-600" role="alert">
              {formik.errors.phoneNumber}
            </p>
          )}
        </div>

        <div className="mt-4 w-full max-w-[398px]">
          <Button type="submit">ارسال کد تأیید</Button>
        </div>

        <div className="mt-3 flex w-full max-w-[398px] flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[13px] md:text-sm">
          <span className="font-semibold text-text-dark">
            حساب کاربری دارید؟
          </span>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer font-semibold text-primary hover:underline"
          >
            ورود به حساب کاربری
          </button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
          >
            صفحه اصلی
          </button>
        </div>
      </form>
    </div>
  );
}
