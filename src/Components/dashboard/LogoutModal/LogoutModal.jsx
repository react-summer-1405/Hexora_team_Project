import React from "react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="w-full max-w-md rounded-[24px] bg-bg-light p-6 shadow-2xl md:p-8">
        <h3 className="mb-2 text-text-dark font-bold text-gray-800">
          خروج از حساب کاربری
        </h3>
        <p className="mb-8 text-sm font-medium text-text-muted text-justify">
          آیا از خروج از حساب کاربری خود مطمئن هستید؟ برای ورود مجدد نیاز به
          اطلاعات کاربری خواهید داشت.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-bg-main py-3 text-sm font-bold text-text-dark transition-colors hover:bg-gray-200 hover:text-black"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600"
          >
            بله، خارج می‌شوم
          </button>
        </div>
      </div>
    </div>
  );
}
