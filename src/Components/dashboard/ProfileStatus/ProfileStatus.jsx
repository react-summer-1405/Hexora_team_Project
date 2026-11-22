import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import editPen from "../../../assets/icons/dashboard/edit.svg";
import { useProfile } from "../../../hooks/dashboard/userProfile";
import { useNavigate } from "react-router-dom";

export default function ProfileStatus() {
  const { data: profile } = useProfile();
  const percentage = profile?.profileCompletionPercentage || 0;
  const navigate =useNavigate()

  return (
    <div
      className="mt-6 flex w-full min-w-0 flex-col items-center justify-between rounded-[24px] bg-bg-light p-4 shadow-sm lg:flex-[1] md:p-6"
      dir="rtl"
    >
      <div className="mb-8 flex w-full items-center justify-between gap-2">
        <span className="text-sm font-bold text-gray-800">
          وضعیت اطلاعات حساب کاربری
        </span>

        <button className="shrink-0 text-blue-500 transition-colors hover:text-blue-700">
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

      <div className="mb-6 h-[120px] w-[120px] shrink-0 font-sans font-bold">
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
    </div>
  );
}