import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../core/services/auth/login";
import {  setItem } from "../../../core/localStorage/localStorage";
import { loginInputs } from "../../../core/constants/auth/login/loginInputs/loginInputs.js";
import InputGroup from "../../../Components/common/auth/InputGroup.jsx";
import Button from "../../../Components/common/auth/Button.jsx";
import AuthProgress from "../../../Components/common/auth/AuthProgress.jsx";
import { loginProgressSteps } from "../../../Components/common/auth/authProgress.config.js";
import { useDispatch } from "react-redux";
import { setUserId } from "../../../Components/features/auth/authSlice.js";
import toast from "react-hot-toast";
import home from "../../../assets/icons/home-04.svg"
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()
  }, [])
  

    const dispatch = useDispatch();

  const loginMutation = useMutation({
  mutationFn: loginApi,
onSuccess: (data) => {
  if (data?.token) {
    setItem("token", data.token);
  }

  dispatch(setUserId(data.id));

  toast.success("با موفقیت وارد شدید");
  navigate("/");
},
  onError: (error) => { 

    toast.error(
      error?.response?.data?.message || "ورود انجام نشد. دوباره تلاش کنید."
    );
  },
});

  const formik = useFormik({
    initialValues: {
      phoneOrGmail: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      console.log("مقادیر فرم:", values);

      const errors = {};
      const emailValue = values.phoneOrGmail.trim();

      if (!emailValue) {
        errors.phoneOrGmail = "لطفاً ایمیل خود را وارد کنید.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errors.phoneOrGmail = "لطفاً یک ایمیل معتبر وارد کنید.";
      }

      if (!values.password) {
        errors.password = "لطفاً رمز عبور خود را وارد کنید.";
      }

      console.log("خطاهای اعتبارسنجی:", errors);

      return errors;
    },
    onSubmit: (values) => {
      console.log("فرم ارسال شد:", values);

      loginMutation.mutate({
        phoneOrGmail: values.phoneOrGmail.trim(),
        password: values.password,
        rememberMe: values.rememberMe,
      });
    },
  });
  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-6 bg-bg-main px-4 py-4 sm:px-6 md:min-h-[650px] md:max-w-[748px] md:py-6 md:px-8 lg:px-12 xl:px-24"
    >
      <AuthProgress steps={loginProgressSteps} activeStep={1} />

      <div className="mb-2 flex w-full items-center justify-end md:hidden">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-1.5 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-[13px] font-semibold text-primary transition-colors hover:bg-gray-50"
        >
          صفحه اصلی
        </button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-center"
      >
        <div className="mt-2 flex w-full max-w-[398px] flex-col items-start gap-2 text-right md:mt-0">
          <h1 className="text-[26px] font-bold text-text-dark md:text-[28px]">
            خوش برگشتی!
          </h1>

          <p className="w-full text-[13px] font-medium leading-relaxed text-text-muted md:text-base">
            لطفاً ایمیل و رمز عبور خود را برای ورود به حساب کاربری وارد کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-[398px] flex-col gap-4 md:mt-6">
          {loginInputs.map((input) => (
            <InputGroup
              key={input.id}
              id={input.id}
              label={input.id === "phoneOrGmail" ? "ایمیل" : input.label}
              type={input.id === "phoneOrGmail" ? "email" : input.type}
              placeholder={
                input.id === "phoneOrGmail"
                  ? "ایمیل خود را وارد کنید"
                  : input.placeholder
              }
              value={formik.values[input.id] ?? ""}
              onChange={formik.handleChange}
              error={
                formik.submitCount > 0 && formik.errors[input.id]
                  ? formik.errors[input.id]
                  : null
              }
            />
          ))}
        </div>

        <div className="mt-6 flex w-full max-w-[398px] flex-wrap items-center justify-between gap-x-3 gap-y-3 md:mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 bg-gray-100 accent-primary"
            />
            <label
              htmlFor="rememberMe"
              className="cursor-pointer text-[13px] font-bold text-text-dark md:text-base md:font-semibold"
            >
              مرا به خاطر بسپار
            </label>
          </div>

          <Link
            to="/auth/forget-password"
            className="flex items-center justify-center rounded-full bg-[#F0F5FF] px-3 py-2 text-[11px] font-bold text-primary transition-colors hover:bg-[#e0edff] sm:px-4 md:text-sm"
          >
            رمزعبور را فراموش کردید؟
          </Link>
        </div>

        <div className="mt-8 w-full max-w-[398px] md:mt-4">
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "در حال ورود..." : "ورود به حساب"}
          </Button>
        </div>

        <div className="mt-6 flex w-full max-w-[398px] flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span className="text-center text-[13px] font-bold text-text-dark md:text-base">
            حساب کاربری ندارید؟
          </span>
          <Link
            to="/auth/register"
            className="text-center text-[13px] font-bold text-primary hover:underline md:text-base"
          >
            ایجاد حساب کاربری
          </Link>
        </div>

        <div className="hidden w-full max-w-[398px] justify-center md:flex">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 flex h-10 w-[141px] cursor-pointer  gap-2 flex-row-reverse items-center justify-center rounded-[34px] border border-[#dcdcdc] bg-[#fcfcfc] font-semibold text-primary transition-colors hover:bg-gray-50"
          >
            <img src={home}  />
            صفحه اصلی
          </button>
        </div>
      </form>
    </div>
  );
}
