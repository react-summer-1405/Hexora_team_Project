import React, { useState } from "react";
import calendarIcon from "../../../assets/icons/dashboard/calendar-02-stroke-rounded 2.png";

export default function AccountInfo() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    about: "",
    phone: "",
    nationalId: "",
    birthDay: "",
    gender: "مرد",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      fName: formData.fName,
      lName: formData.lName,
      birthDay: formData.birthDay,
    };
    console.log("دیتای آماده ارسال به API:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-right"
      dir="rtl"
    >
      <div className="flex w-[576px] items-center justify-between gap-[40px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">نام</label>
          <input
            type="text"
            name="fName"
            placeholder="نام خود را وارد کنید"
            value={formData.fName}
            onChange={handleChange}
            className="h-[48px] w-[268px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">
            نام خانوادگی
          </label>
          <input
            type="text"
            name="lName"
            placeholder="نام خانوادگی خود را وارد کنید"
            value={formData.lName}
            onChange={handleChange}
            className="h-[48px] w-[268px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-800">درباره من</label>
        <textarea
          name="about"
          placeholder="متن درباره خود را وارد کنید"
          value={formData.about}
          onChange={handleChange}
          className="h-[123px] w-[576px] resize-none rounded-[24px] border border-[#dcdcdc] bg-transparent p-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex w-[576px] items-center justify-between gap-[40px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">شماره همراه</label>
          <input
            type="text"
            name="phone"
            placeholder="شماره همراه خود را وارد کنید"
            value={formData.phone}
            onChange={handleChange}
            className="h-[48px] w-[268px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">کد ملی</label>
          <input
            type="text"
            name="nationalId"
            placeholder="کد ملی خود را وارد کنید"
            value={formData.nationalId}
            onChange={handleChange}
            className="h-[48px] w-[268px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex w-[576px] items-center justify-between gap-[40px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">تاریخ تولد</label>
          <div className="relative">
            <input
              type="text"
              name="birthDay"
              placeholder="تاریخ تولد خود را وارد کنید"
              value={formData.birthDay}
              onChange={handleChange}
              className="h-[48px] w-[268px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 pl-12 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#707070]">
              <img
                src={calendarIcon}
                alt="تقویم"
                className="h-[24px] w-[24px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">جنسیت</label>
          <div className="flex h-[48px] w-[268px] items-center justify-between px-2">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="مرد"
                  checked={formData.gender === "مرد"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-500"
                />
                مرد
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="زن"
                  checked={formData.gender === "زن"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-500"
                />
                زن
              </label>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-blue-500 hover:text-blue-600"
            >
              انتخاب کنید
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-800">ایمیل</label>
        <input
          type="email"
          name="email"
          placeholder="ایمیل خود را وارد کنید"
          value={formData.email}
          onChange={handleChange}
          className="h-[48px] w-[576px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-800">آدرس سکونت</label>
        <input
          type="text"
          name="address"
          placeholder="آدرس محل سکونت خود را وارد کنید"
          value={formData.address}
          onChange={handleChange}
          className="h-[48px] w-[576px] rounded-[24px] border border-[#dcdcdc] bg-transparent px-4 text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="mt-4 flex w-[576px] justify-end">
        <button
          type="submit"
          className="flex h-[48px] items-center justify-center rounded-[24px] bg-blue-500 px-8 text-sm font-bold text-white transition-colors hover:bg-blue-600"
        >
          اعمال تغییرات
        </button>
      </div>
    </form>
  );
}
