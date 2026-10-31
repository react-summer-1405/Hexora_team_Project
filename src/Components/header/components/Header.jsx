import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import Title from "./TitleSite";
import Toolbar from "./Toolbar";
import name from "../../../assets/icons/Untitled-1.svg";
import title from "../../../assets/images/Title.png";
import Button from "../../common/Button";
import cancel from "../../../assets/icons/cancel-01.svg";
import instagram from "../../../assets/icons/footer/instagram.svg";
import telegram from "../../../assets/icons/footer/telegram.svg";
import youtube from "../../../assets/icons/footer/youtube.svg";
import twitter from "../../../assets/icons/footer/twitter.svg";
import menu from "../../../assets/icons/menu-02.svg";
import { NavLink } from "react-router-dom";

const Header = () => {

  const navItems = [
    { name: "خانه", link: "/" },
    { name: "دوره ها", link: "/courses" },
    { name: "بلاگ ها", link: "/blogs" },
    { name: "ارتباط با ما", link: "/contactUs" },
  ];

  const medias = [instagram, telegram, youtube, twitter];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 639.98);

    const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1030);
      console.log(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-4 px-10">
        <Title />
        <NavigationBar navItems={navItems} />
        <Button
          circle
          icon={menu}
          customStyle="p-3 sm:hidden"
          onClick={() => setIsOpen(true)}
        />
        <Toolbar />
      </div>

      {isMobile && isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-around overflow-y-auto bg-bg-main px-5"
        >
          <div className="flex flex-row justify-between items-center">
            <Title />
            <Button
              circle
              color="bg-bg-main"
              customStyle="p-3"
              icon={cancel}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex flex-col items-start gap-15">
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                end={item.link === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-[32px] font-bold cursor-pointer w-full text-right hover:text-primary border-b border-border transition-all duration-300 ${
                    isActive ? "bg-bg-lightGray text-primary" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-row w-full border-t border-border p-6 justify-center gap-6">
            {medias.map(({ name, icon }) => (
              <img key={name} src={icon} alt={name} className="dark:invert" />
            ))}
          </div>
        </div>
      )}
    </>
  );
};


export default Header;
