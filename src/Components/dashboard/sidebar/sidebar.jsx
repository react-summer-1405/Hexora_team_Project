import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bahrLogo from "../../../assets/images/login/bahrlogo.webp";
import bahrlogotext from "../../../assets/images/login/bahrlogotext.webp";
import dashIcon from "../../../assets/images/dashboard/dash-icon.png";
import mycourseIcon from "../../../assets/images/dashboard/mycourse-icon.png";
import myreserveIcon from "../../../assets/images/dashboard/myreserve-icon.png";
import favoriteIcon from "../../../assets/images/dashboard/favorite-icon.png";
import favoriteblogIcon from "../../../assets/images/dashboard/favoriteblog-icon.png";
import profileIcon from "../../../assets/images/dashboard/profile-icon.png";
import calendar from "../../../assets/icons/dashboard/Calendar_Days.svg"
import LogoutModal from "../LogoutModal/LogoutModal";

const sidebarLinks = [
  { id: 1, title: "داشبورد", href: "/dashboard", icon: dashIcon },
  {
    id: 2,
    title: "دوره‌های من",
    href: "/dashboard/my-courses",
    icon: mycourseIcon,
  },
  {
    id: 3,
    title: "رزرو من",
    href: "/dashboard/my-reserve",
    icon: myreserveIcon,
  },
  {
    id: 4,
    title: "دوره‌های مورد علاقه",
    href: "/dashboard/my-FavoriteCourses",
    icon: favoriteIcon,
  },
  {
    id: 5,
    title: "بلاگ‌های مورد علاقه",
    href: "/dashboard/my-FavoriteBlogs",
    icon: favoriteblogIcon,
  },
  { id: 6, title: "پروفایل", href: "/dashboard/profile", icon: profileIcon },
  { id: 7, title: "برنامه کلاسی", href: "/dashboard/schedule", icon: calendar },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    localStorage.clear() 

    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-[250px] flex-col bg-bg-dark p-4 text-text-light transition-transform duration-300 ease-in-out md:static md:translate-x-0 dark:border-border dark:bg-bg-field ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-2 flex items-center gap-3">
          <img src={bahrLogo} alt="Bahr Logo" className="h-[40px] w-[42px]" />
          <img
            src={bahrlogotext}
            alt="Bahr Logo Text"
            className="h-[38px] w-[189px]"
          />
        </div>
        <ul className="mt-[53px] w-full space-y-7 pr-4 text-right text-lg font-medium">
          {sidebarLinks.map((item) => (
            <li key={item.id} onClick={closeSidebar}>
              <Link
                to={item.href}
                className="flex cursor-pointer items-center gap-3 transition-colors hover:text-text-light/70"
              >
                <img src={item.icon} alt={item.title} className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="mx-auto mt-auto flex w-full max-w-[214px] items-center justify-center rounded-full border border-danger bg-transparent px-6 py-3 text-[14px] font-semibold text-danger transition-all duration-300 hover:bg-danger hover:text-text-light"
        >
          خروج از حساب کاربری
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
