import React from "react";
import imageAddIcon from "../../../assets/icons/dashboard/image-add-02-stroke-rounded 2.png";

export default function ProfilePhotos() {
  return (
    <div className="flex w-full flex-col gap-6" dir="rtl">
      <div className="flex w-full justify-start">
        <button className="flex h-[48px] w-[179px] items-center justify-center gap-2 rounded-[40px] bg-primary text-[16px] font-[600] text-bg-main transition-opacity hover:opacity-90">
          <img
            src={imageAddIcon}
            alt="اضافه کردن عکس"
            className="h-[20px] w-[20px]"
          />
          <span>اضافه کردن عکس</span>
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        محل قرارگیری عکس‌های پروفایل...
      </div>
    </div>
  );
}
