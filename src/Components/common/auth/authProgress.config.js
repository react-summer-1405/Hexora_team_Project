export const loginProgressSteps = [
  {
    id: "login",
    label: "واردکردن شماره همراه",
    paths: ["/auth/login"],
  },
  {
    id: "verification",
    label: "تایید کد ارسال شده دو مرحله‌ای",
    description: "(در صورت فعال بودن دو مرحله‌ای)",
    paths: ["/auth/verification"],
  },
];

export const registerProgressSteps = [
  {
    id: "register",
    label: "ایجاد حساب کاربری",
    paths: ["/auth/register"],
  },
  {
    id: "register-verification",
    label: "تأیید کد",
    paths: ["/auth/register-verification"],
  },
  {
    id: "register-info",
    label: "اطلاعات شخصی",
    paths: ["/auth/register-info"],
  },
];

export const forgotPasswordProgressSteps = [
  {
    id: "forgot-password",
    label: "وارد کردن ایمیل",
    paths: ["/auth/forget-password"],
  },
  {
    id: "reset-password",
    label: "تایید کد ارسال شده دو مرحله ای ",
    description: "(در صورت فعال بودن دو مرحله‌ای)",
    paths: ["/auth/reset-password/"],
  },
];
