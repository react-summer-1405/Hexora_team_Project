import notificationIcon from "../../../assets/images/dashboard/notification-02.png";
import moonIcon from "../../../assets/icons/moon-02.svg";
import profileImage from "../../../assets/images/dashboard/Peppe – 07.png";
import { useProfile } from "../../../hooks/dashboard/userProfile";
import menu from "../../../assets/icons/menu-02.svg"
import account from "../../../assets/icons/account.svg"
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const { data: profile, isLoading } = useProfile();

const avatar = profile?.currentPictureAddress || profile?.fname || account;

  return (
    <header className="flex w-full items-center justify-between bg-bg-dark px-4 md:px-8 py-5">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="flex items-center justify-center text-white md:hidden">
        
<img src={menu} alt="Menu" className="w-6 h-6"/>
        </button>

        <div className="flex h-[40px] w-[40px] md:h-[50px] md:w-[50px] items-center justify-center overflow-hidden rounded-full border-2 border-blue-400 bg-blue-500">
          <img
            src={avatar || profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hidden flex-col text-right sm:flex">
          {isLoading ? (
            <span className="text-[13px] text-bg-light">در حال دریافت...</span>
          ) : (
            <>
              <span className="text-[15px] font-bold text-bg-main">
                {profile?.fName} {profile?.lName}
              </span>
              <span className="mt-1 text-[12px] text-bg-light">دانشجو</span>
            </>
          )}
        </div>
      </div>

      <nav className="hidden items-center gap-10 text-[14px] font-medium text-bg-main md:flex">
        <Link to="/" className="transition-colors hover:opacity-80">
          صفحه اصلی
        </Link>
        {/* <a href="/reports" className="transition-colors hover:opacity-80">
          گزارش
        </a> */}
        <Link to="/contactUs" className="transition-colors hover:opacity-80">
          ارتباط باما
        </Link>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative flex h-[40px] w-[40px] md:h-[46px] md:w-[46px] items-center justify-center rounded-full bg-surface-dark text-bg-main transition-colors hover:opacity-80">
          <img
            src={notificationIcon}
            alt="اعلان‌ها"
            className="h-5 w-5 md:h-6 md:w-6 object-contain"
          />
        </button>

        <button className="flex h-[40px] w-[40px] md:h-[46px] md:w-[46px] items-center justify-center rounded-full bg-surface-dark text-bg-main transition-colors hover:opacity-80">
          <img
            src={moonIcon}
            alt="تغییر تم"
            className="h-5 w-5 md:h-6 md:w-6 object-contain"
          />
        </button>
      </div>
    </header>
  );
}
