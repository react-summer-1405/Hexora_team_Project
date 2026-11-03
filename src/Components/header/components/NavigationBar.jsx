import { NavLink, useNavigate } from "react-router-dom";
import { getItem } from "../../../core/localStorage/localStorage";
import accountIcon from "../../../assets/icons/account.svg";
import arrow from "../../../assets/icons/arrow-down-01.svg";
import { useProfile } from "../../../hooks/dashboard/userProfile";
import useToggle from "../../hooks/useToggle";

const NavigationBar = ({ navItems }) => {
  const navigate = useNavigate();

  const [isOpen, toggle] = useToggle();
  const { data: profile } = useProfile();

  const avatar =
    profile?.currentPictureAddress || profile?.fname || accountIcon;

  console.log("profile", profile);

  const token = getItem("token");

  return (
    <div className="flex flex-row items-center justify-center  rounded-full text-xs lg:text-base font-medium bg-bg-dark text-text-white">
      <div className="hidden mx-6 my-3 sm:flex flex-row items-center justify-center gap-6 ">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className="relative cursor-pointer w-max hover:text-primary transition-all duration-300"
          >
            {({ isActive }) => (
              <>
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-bg-main" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      {token ? (
        <div
          onClick={toggle}
          className="relative flex justify-center items-center gap-2 cursor-pointer"
        >
          <img
            src={arrow}
            className={`select-none w-4 h-4 dark:invert transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />

          {isOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="
      whitespace-nowrap
        select-none absolute top-12 left-0 z-50
        min-w-30 p-2
        flex flex-col gap-1
        bg-bg-dark
        border border-white/10
        rounded-2xl
        shadow-xl shadow-black/20
      "
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="
          w-full text-right px-4 py-3
          rounded-xl text-sm
          text-text-white
                    hover:bg-bg-lightDark
cursor-pointer
          transition-all duration-200
        "
              >
                داشبورد
              </button>

              <button
                onClick={() => navigate("/auth/login")}
                className="
          w-full text-right px-4 py-3
          cursor-pointer

          rounded-xl text-sm
          text-text-white
          hover:bg-bg-lightDark
          transition-all duration-200
        "
              >
                ورود به حساب
              </button>
            </div>
          )}

          <img
            src={avatar}
            alt="Profile"
            className="
    select-none
      rounded-full border-2 border-primary
      h-10 w-10 object-cover
      hover:ring-4 hover:ring-primary/20
      transition-all duration-300
    "
          />
        </div>
      ) : (
        <button
          onClick={() => navigate("/auth/login")}
          className="m-1 w-max cursor-pointer rounded-full bg-primary px-4 py-2"
        >
          ثبت نام یا ورود
        </button>
      )}
    </div>
  );
};

export default NavigationBar;
