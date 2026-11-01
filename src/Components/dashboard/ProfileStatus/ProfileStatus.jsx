import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useProfile } from "../../../hooks/dashboard/userProfile";

export default function ProfileStatus() {
  const { data: profile } = useProfile();
  const percentage = profile?.profileCompletionPercentage || 70;

  return (
    <div
      className="mt-6 flex w-full flex-col items-center justify-between rounded-[24px] bg-bg-light p-4 shadow-sm md:p-6 lg:w-[25%]"
      dir="rtl"
    >
      <div className="mb-8 flex w-full items-center justify-between">
        <span className="text-sm font-bold text-gray-800">
          وضعیت اطلاعات حساب کاربری
        </span>
        <button className="text-blue-500 transition-colors hover:text-blue-700">
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

      <div className="mb-6 h-[120px] w-[120px] font-sans font-bold">
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toLocaleString("fa-IR")}٪`}
          strokeWidth={10}
          styles={buildStyles({
            pathTransitionDuration: 1,
            pathColor: "#FDE047",
            trailColor: "#E5E7EB",
            textColor: "#1f2937",
            textSize: "22px",
          })}
        />
      </div>

      <span className="text-xs font-bold text-gray-600">
        اطلاعات حساب کاربری شما کامل نیست
      </span>
    </div>
  );
}
