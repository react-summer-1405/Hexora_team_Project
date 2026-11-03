import { useProfile } from "../../../hooks/dashboard/userProfile";
 
export default function WelcomeHeader() {
  const { data: profile } = useProfile();
 
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-6 md:w-1/2">
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-2 text-lg font-bold text-text-dark md:text-xl">
            <span>
              سلام {profile?.fName || "کاربر"} {profile?.lName || "ناشناس"}،
              روزت بخیر
            </span>
            <span>👋</span>
            <span className="text-xs font-normal text-text-dark">
              {profile?.userAbout || "امیدوارم امروز روز خوبی رو داشته باشید"}
            </span>
          </div>
        </div>
 
        <div className="mt-2 flex items-center gap-2 text-text-muted">
          <span className="text-sm">تاریخ دستی</span>
          <span className="text-lg">🕒</span>
        </div>
      </div>
    </>
  );
}
 