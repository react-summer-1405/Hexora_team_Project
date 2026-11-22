import  { useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../core/services/auth/login";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { registerProgressSteps } from "../../../Components/common/auth/authProgress.config.js";
import toast from "react-hot-toast";

export default function RegisterInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";
  const isVerified = location.state?.verified === true;

  useEffect(() => {
    if (!email || !isVerified) {
      navigate("/auth/register", { replace: true });
    }
  }, [email, isVerified, navigate]);

const registerMutation = useMutation({
  mutationFn: registerApi,
  onSuccess: () => {
    toast.success("ثبت‌نام با موفقیت انجام شد. وارد حساب خود شوید");
    navigate("/auth/login", {
      replace: true,
      state: {
        registered: true,
      },
    });
  },
  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "ثبت‌نام انجام نشد. دوباره تلاش کنید."
    );
  },
});
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};
      const phoneNumber = values.phoneNumber.trim();

      if (!phoneNumber) {
        errors.phoneNumber = "لطفاً شماره همراه خود را وارد کنید.";
      } else if (!/^09\d{9}$/.test(phoneNumber)) {
        errors.phoneNumber =
          "لطفاً یک شماره معتبر وارد کنید (مثال: 09123456789).";
      }

      if (!values.password) {
        errors.password = "لطفاً رمز عبور خود را وارد کنید.";
      } else if (values.password.length < 6) {
        errors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
      }

      return errors;
    },

    onSubmit: (values) => {
      registerMutation.mutate({
        gmail: email,
        phoneNumber: values.phoneNumber.trim(),
        password: values.password,
      });
    },
  });

  const errorMessage =
    registerMutation.error?.response?.data?.message ||
    registerMutation.error?.message;

  if (!email || !isVerified) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full flex-col gap-6 bg-bg-main px-4 py-4 sm:px-6 md:min-h-[650px] md:max-w-[748px] md:py-6 md:px-8 lg:px-12 xl:px-24"
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

      <AuthProgress steps={registerProgressSteps} activeStep={3} />

      {/* فرم ریسپانسیو و وسط‌چین */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
            تکمیل اطلاعات حساب
          </h1>
          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            لطفاً شماره همراه و رمز عبور خود را برای نهایی کردن ثبت‌نام وارد
            کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[398px] flex-col gap-4 md:mt-6">
          <InputGroup
            id="phoneNumber"
            label="شماره همراه"
            type="tel"
            placeholder="مثال: 09123456789"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              (formik.touched.phoneNumber || formik.submitCount > 0) &&
              formik.errors.phoneNumber
                ? formik.errors.phoneNumber
                : null
            }
          />

          <InputGroup
            id="password"
            label="رمز عبور"
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              (formik.touched.password || formik.submitCount > 0) &&
              formik.errors.password
                ? formik.errors.password
                : null
            }
          />
        </div>

        {registerMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage || "ثبت‌نام با خطا مواجه شد. لطفاً دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending
              ? "در حال ایجاد حساب..."
              : "تأیید و ایجاد حساب"}
          </Button>
        </div>

        <div className="flex w-full max-w-[398px] justify-center md:flex">
          <button
            type="button"
            onClick={() =>
              navigate("/auth/register-verification", {
                state: { email },
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
