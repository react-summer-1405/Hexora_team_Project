import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import editPen from "../../../assets/icons/dashboard/edit.svg"
import { useProfile } from "../../../hooks/dashboard/userProfile";

export default function ProfileStatus() {
  const { data: profile } = useProfile();
  const percentage = profile?.profileCompletionPercentage || 0;

  return (
    <div 
      className="mt-6  flex w-full flex-col items-center justify-between rounded-[24px] bg-bg-light p-4 shadow-sm md:p-6 lg:w-[25%]"
      dir="rtl"
    >
      <div className="mb-8 flex w-full items-center justify-between">
        <span className="text-sm font-bold text-gray-800">
          وضعیت اطلاعات حساب کاربری
        </span>
        <button className="text-blue-500 transition-colors hover:text-blue-700">
<img src={editPen} />
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
