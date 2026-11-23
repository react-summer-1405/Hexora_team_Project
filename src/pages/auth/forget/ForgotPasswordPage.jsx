import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../../../core/services/auth/login";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { loginProgressSteps } from "../../../Components/common/auth/authProgress.config.js";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();

const forgetPasswordMutation = useMutation({
  mutationFn: forgotPasswordApi,
  onSuccess: (data, variables) => {
    toast.success(
      data?.message || "لینک بازیابی رمز عبور به ایمیل شما ارسال شد."
    );

    navigate("/auth/reset-password", {
      state: {
        email: variables.email,
      },
    });
  },
  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "ارسال لینک انجام نشد. دوباره تلاش کنید."
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
      forgetPasswordMutation.mutate({
        email: values.email.trim(),
        baseUrl: `${window.location.origin}/auth/reset-password`,
      });
    },
  });

  const errorMessage =
    forgetPasswordMutation.error?.response?.data?.message ||
    forgetPasswordMutation.error?.response?.data?.errors?.[0]?.msg ||
    forgetPasswordMutation.error?.message;

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

      <AuthProgress steps={loginProgressSteps} activeStep={1} />

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-center gap-2 text-center md:mt-0 md:items-start md:text-right">
          <h1 className="w-full text-[26px] font-bold text-text-dark md:text-[28px]">
            فراموشی رمز عبور
          </h1>

          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            لطفاً ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال
            شود.
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
              (formik.touched.email || formik.submitCount > 0) &&
              formik.errors.email
                ? formik.errors.email
                : null
            }
          />
        </div>

        {forgetPasswordMutation.isError && (
          <p
            className="mt-4 w-full max-w-[398px] text-right text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {errorMessage ||
              "ارسال درخواست بازیابی رمز عبور با خطا مواجه شد. دوباره تلاش کنید."}
          </p>
        )}

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={forgetPasswordMutation.isPending}>
            {forgetPasswordMutation.isPending
              ? "در حال ارسال..."
              : "ارسال لینک بازیابی"}
          </Button>
        </div>

        <div className="mt-6 flex w-full max-w-[398px] flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span className="text-center text-[13px] font-bold text-text-dark md:text-base">
            رمز عبور خود را به خاطر دارید؟
          </span>

          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer text-center text-[13px] font-bold text-primary hover:underline md:text-base"
          >
            ورود به حساب کاربری
          </button>
        </div>

        <div className="hidden w-full max-w-[398px] justify-center md:flex">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 flex h-10 w-[141px] cursor-pointer items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] font-semibold text-primary transition-colors hover:bg-gray-50"
          >
            بازگشت
          </button>
        </div>
      </form>
    </div>
  );
}