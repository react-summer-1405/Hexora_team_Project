import notificationIcon from "../../../assets/icons/Bell.svg";
import profileImage from "../../../assets/images/dashboard/Peppe – 07.png";
import { useProfile } from "../../../hooks/dashboard/userProfile";
import menu from "../../../assets/icons/menu-02.svg";
import account from "../../../assets/icons/account.svg";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode, toggleTheme } from "../../features/theme/themeSlice";
import moonIcon from "../../../assets/icons/moon-02.svg";
import sunIcon from "../../../assets/icons/sun.svg";
import { useUnseenAlerts } from "../../hooks/useNotification";
import { openNotification } from "../../features/notification/notificationSlice";

export default function Header({ toggleSidebar }) {
  const { data: profile, isLoading } = useProfile();



  const { data: unseenAlerts = [] } = useUnseenAlerts();
  const unseenCount = unseenAlerts.length;

  const avatar = profile?.currentPictureAddress || profile?.fname || account;

  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  return (
    <header className="flex w-full items-center justify-between  bg-bg-dark px-4 py-5 text-text-light md:px-8 dark:border-border dark:bg-bg-field">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center md:hidden"
        >
          <img src={menu} alt="Menu" className="h-6 w-6" />
        </button>

        <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-primary md:h-[50px] md:w-[50px]">
          <img
            src={avatar || profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hidden flex-col text-right sm:flex">
          {isLoading ? (
            <span className="text-[13px] text-text-light/70">
              در حال دریافت...
            </span>
          ) : (
            <>
              <span className="text-[15px] font-bold text-text-light">
                {profile?.fName} {profile?.lName}
              </span>
              <span className="mt-1 text-[12px] text-text-light/70">
                دانشجو
              </span>
            </>
          )}
        </div>
      </div>

      <nav className="hidden items-center gap-10 text-[14px] font-medium text-text-light md:flex">
        <Link to="/" className="transition-colors hover:opacity-80">
          صفحه اصلی
        </Link>

        <Link to="/contactUs" className=" transition-colors hover:opacity-80">
          ارتباط باما
        </Link>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          circle
          icon={notificationIcon}
          customStyle="p-3 "
          color="bg-surface-dark dark:bg-border"
          onClick={() => dispatch(openNotification())}
          content={
            unseenCount > 0 ? (
              <div className="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[11px] leading-none text-white">
                {unseenCount > 9 ? "9+" : unseenCount}
              </div>
            ) : null
          }
        ></Button>

        <Button
          circle
          icon={mode === "dark" ? sunIcon : moonIcon}
          customStyle="p-3"
          color="bg-surface-dark dark:bg-border"
          onClick={() => dispatch(toggleTheme())}
        />
      </div>


    </header>
  );
}
