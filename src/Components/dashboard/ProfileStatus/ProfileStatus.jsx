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
      className="mt-6 flex w-full flex-col items-center justify-between rounded-[24px] bg-bg-light p-4 shadow-sm md:p-6 lg:w-[25%] dark:bg-bg-field"
      dir="rtl"
    >
      <div className="mb-8 flex w-full items-center justify-between">
        <span className="text-sm font-bold text-text-dark">
          وضعیت اطلاعات حساب کاربری
        </span>
        <button onClick={()=>{navigate("profile")}}  className="transition-opacity hover:opacity-75">
          <img src={editPen} alt="ویرایش" />
        </button>
      </div>

      <div className="mb-6 h-[120px] w-[120px] font-sans font-bold">
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