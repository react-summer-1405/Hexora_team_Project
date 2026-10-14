import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import computerImg from "../../../assets/images/login/computer.webp";
import bahrLogo from "../../../assets/images/login/bahrlogo.webp";
import bahrlogotext from "../../../assets/images/login/bahrlogotext.webp";

export default function AuthLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div
        dir="rtl"
        className="flex items-center justify-center min-h-screen bg-bg-main p-4"
      >
        <Outlet />
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center min-h-screen bg-bg-main p-6"
    >
      <div className="w-full max-w-[1600px] bg-white rounded-3xl shadow-lg border border-[var(--color-border)] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6 p-6 w-full max-w-[748px] min-h-[704px] border border-[var(--color-border)] rounded-2xl">
            <Outlet />
          </div>

          <div className="flex flex-col border border-[var(--color-border)] rounded-2xl p-6 w-full max-w-[748px] min-h-[704px] bg-text-light">
            <div className="flex items-center gap-3 mt-2">
              <img
                src={bahrLogo}
                alt="Bahr Logo"
                className="w-[42px] h-[40px]"
              />
              <img
                src={bahrlogotext}
                alt="Bahr Logo Text"
                className="w-[189px] h-[38px]"
              />
            </div>

            <p className="text-[32px] font-bold text-title-black mt-12">
              شروع یک ماجراجویی
            </p>
            <p className="text-xl text-text-muted mt-2">
              هر دوره‌ای که بخوای رو به راحتی پیدا کن و یاد بگیر
            </p>

            <img
              src={computerImg}
              alt="computer"
              className="w-full max-w-[368px] h-auto mr-auto mt-auto ml-[190px] mb-[75px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
