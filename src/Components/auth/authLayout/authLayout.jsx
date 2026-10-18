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
      // min-h-screen removed havaset bashe ekhtelal nandaze

      <div
        dir="rtl"
        className="flex items-center justify-center bg-bg-main p-4"
      >
        <Outlet />
      </div>
    );
  }

  return (
    // min-h-screen removed havaset bashe ekhtelal nandaze
    <div dir="rtl" className="flex  items-start justify-center px-6 pt-3 pb-3">
      <div className="w-full max-w-[1600px] rounded-3xl bg-white p-8 shadow-lg">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex min-h-[704px] w-full max-w-[748px] flex-col gap-6 rounded-2xl p-6">
            <Outlet />
          </div>

          <div className="flex min-h-[704px] w-full max-w-[748px] flex-col rounded-2xl bg-text-light p-6">
            <div className="mt-2 flex items-center gap-3">
              <img
                src={bahrLogo}
                alt="Bahr Logo"
                className="h-[40px] w-[42px]"
              />
              <img
                src={bahrlogotext}
                alt="Bahr Logo Text"
                className="h-[38px] w-[189px]"
              />
            </div>

            <p className="mt-12 text-[32px] font-bold text-title-black">
              شروع یک ماجراجویی
            </p>

            <p className="mt-2 text-xl text-text-muted">
              هر دوره‌ای که بخوای رو به راحتی پیدا کن و یاد بگیر
            </p>

            <img
              src={computerImg}
              alt="computer"
              className="mb-[75px] ml-[190px] mt-auto h-auto w-full max-w-[368px] mr-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
