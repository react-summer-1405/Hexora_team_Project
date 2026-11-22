import React, { useRef, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import gsap from "gsap";
import { Skeleton } from "@heroui/react";
import { useProfile } from "../../../hooks/dashboard/userProfile";
import { useNavigate } from "react-router-dom";

export default function ProfileStatus() {
  const { data: profile, isLoading } = useProfile();
  const percentage = profile?.profileCompletionPercentage || 0;
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );

    if (!isLoading) {
      gsap.fromTo(
        progressRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="mt-6 flex w-full min-w-0 flex-col items-center justify-between rounded-[24px] bg-bg-light p-4 shadow-sm lg:flex-[1] md:p-6"
      dir="rtl"
    >
      <div className="mb-8 flex w-full items-center justify-between gap-2">
        <span className="text-sm font-bold text-gray-800">
          وضعیت اطلاعات حساب کاربری
        </span>

        <button
          onClick={() => navigate("/dashboard/profile")}
          className="shrink-0 text-blue-500 transition-colors hover:text-blue-700"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
      </div>

      {isLoading ? (
        <>
          <Skeleton className="mb-6 h-[120px] w-[120px] shrink-0 rounded-full">
            <div className="h-full w-full rounded-full bg-default-200"></div>
          </Skeleton>
          <Skeleton className="h-3 w-48 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </>
      ) : (
        <>
          <div
            ref={progressRef}
            className="mb-6 h-[120px] w-[120px] shrink-0 font-sans font-bold"
          >
            <CircularProgressbar
              value={percentage}
              text={`${percentage.toLocaleString("fa-IR")}٪`}
              strokeWidth={10}
              styles={buildStyles({
                pathTransitionDuration: 1,
                pathColor: "var(--color-account-yellow, #ffde37)",
                trailColor: "var(--color-border, #dcdcdc)",
                textColor: "var(--color-text-dark, #2f2f2f)",
                textSize: "22px",
              })}
            />
          </div>

          <span className="text-xs font-bold text-text-muted">
            اطلاعات حساب کاربری شما کامل نیست
          </span>
        </>
      )}
    </div>
  );
}
