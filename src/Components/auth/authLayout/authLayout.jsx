import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import computerImg from "../../../assets/images/login/computer.webp";
import bahrLogo from "../../../assets/images/login/bahrlogo.webp";
import bahrlogotext from "../../../assets/images/login/bahrlogotext.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AuthLayout() {
  const formRef = useRef(null);
  const authRef = useRef(null);
  const { pathname } = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    },
    {
      scope: authRef,
    },
  );

  useGSAP(
    () => {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    },
    {
      scope: formRef,
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  );
  if (isMobile) {
    return (
      <div
        ref={authRef}
        dir="rtl"
        className="flex min-h-screen w-full flex-col justify-center bg-bg-main p-4"
      >
        <div ref={formRef} className="my-auto w-full">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={authRef}
      dir="rtl"
      className="flex min-h-screen w-full flex-col justify-center px-12 py-7 "
    >
      <div className="my-auto w-full max-w-[1600px] mx-auto rounded-3xl bg-bg-main px-8 py-4 shadow-lg">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div
            ref={formRef}
            className="flex max-h-[650px]  w-full max-w-[748px] flex-col gap-6 rounded-2xl px-6"
          >
            <Outlet />
          </div>

          <div className="flex max-h-[640px] w-full  flex-col items-start gap-14 rounded-2xl bg-bg-light text-right  p-6">
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
            <div className="flex flex-col gap-3">
              <p className="mt-12 text-[32px] font-bold text-title-black">
                شروع یک ماجراجویی
              </p>

              <p className="mt-2 text-xl text-text-muted">
                هر دوره‌ای که بخوای رو به راحتی پیدا کن و یاد بگیر
              </p>
            </div>
            <img
              src={computerImg}
              alt="computer"
              className="mb-[75px] ml-[190px] mt-auto w-full max-w-[368px] mr-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
