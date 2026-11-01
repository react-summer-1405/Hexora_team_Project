import React from "react";
import bahrLogo from "../../../assets/images/login/bahrlogo.webp";
import bahrlogotext from "../../../assets/images/login/bahrlogotext.webp";
import dashIcon from "../../../assets/images/dashboard/dash-icon.png";
import mycourseIcon from "../../../assets/images/dashboard/mycourse-icon.png";
import myreserveIcon from "../../../assets/images/dashboard/myreserve-icon.png";
import favoriteIcon from "../../../assets/images/dashboard/favorite-icon.png";
import favoriteblogIcon from "../../../assets/images/dashboard/favoriteblog-icon.png";
import profileIcon from "../../../assets/images/dashboard/profile-icon.png";
import paymentIcon from "../../../assets/images/dashboard/payment-icon.png";

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
  { id: 7, title: "پرداخت‌ها", href: "/dashboard/profile", icon: paymentIcon },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-[250px] flex-col bg-bg-dark p-4 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
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

        <ul className="mt-[53px] w-full pr-4 text-right space-y-7 text-lg font-medium">
          {sidebarLinks.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="flex items-center gap-3 hover:text-gray-400"
              >
                <img src={item.icon} alt={item.title} className="h-5 w-5" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>

        <button className="mt-auto mx-auto flex w-full max-w-[214px] items-center justify-center rounded-full border border-[#e05656] bg-transparent px-6 py-3 text-[14px] font-semibold text-[#e05656] transition-all duration-300 hover:bg-[#e05656] hover:text-white">
          خروج از حساب کاربری
        </button>
      </div>
    </>
  );
}
