
import calendarIcon from "../../../../assets/icons/dashboard/calendar.svg";


export const accountInfoFieldRows  = [
  [
    { name: "fName", label: "نام", placeholder: "نام خود را وارد کنید" },
    {
      name: "lName",
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی خود را وارد کنید",
    },
  ],
  [
    {
      name: "about",
      label: "درباره من",
      placeholder: "متن درباره خود را وارد کنید",
      type: "textarea",
    },
  ],
  [
    {
      name: "phone",
      label: "شماره همراه",
      placeholder: "شماره همراه خود را وارد کنید",
    },
    {
      name: "nationalId",
      label: "کد ملی",
      placeholder: "کد ملی خود را وارد کنید",
    },
  ],
  [
    {
      name: "birthDay",
      label: "تاریخ تولد",
      placeholder: "تاریخ تولد خود را وارد کنید",
       type: "date",
      icon: calendarIcon,
    },
    {
      name: "gender",
      label: "جنسیت",
      type: "radio",
      options: ["مرد", "زن"],
    },
  ],
  [
    {
      name: "email",
      label: "ایمیل",
      placeholder: "ایمیل خود را وارد کنید",
      type: "email",
    },
  ],
  [
    {
      name: "address",
      label: "آدرس سکونت",
      placeholder: "آدرس محل سکونت خود را وارد کنید",
    },
  ],
];