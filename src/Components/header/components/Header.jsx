import { Fragment, useEffect, useRef, useState } from "react";
import NavigationBar from "./NavigationBar";
import Title from "./TitleSite";
import Toolbar from "./Toolbar";
import Button from "../../common/Button";
import cancel from "../../../assets/icons/cancel-01.svg";
import instagram from "../../../assets/icons/footer/instagram.svg";
import telegram from "../../../assets/icons/footer/telegram.svg";
import youtube from "../../../assets/icons/footer/youtube.svg";
import twitter from "../../../assets/icons/footer/twitter.svg";
import menu from "../../../assets/icons/menu-02.svg";
import name from "../../../assets/icons/Untitled-1.svg";
import title from "../../../assets/images/Title.png";
import moonIcon from "../../../assets/icons/moon-02.svg";
import sunIcon from "../../../assets/icons/sun.svg";
import bellIcon from "../../../assets/icons/notification-02.svg";

import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode, toggleTheme } from "../../features/theme/themeSlice";

const Header = () => {
  const containerRef = useRef();
    const menuRef = useRef()
    const menuTl = useRef(null);
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

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
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      const showAnim = gsap.from(containerRef.current, {
        yPercent: -100,
        duration: 0.35,
        ease: "power2.out",
      });
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === -1) showAnim.play();
          else showAnim.reverse();
        },
      });
    },
    { scope: containerRef },
  );

  useGSAP(
  () => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, { autoAlpha: 0, yPercent: -8 });

    menuTl.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.35,
        ease: "power2.out",
      })
      .from(
        ".menu-item",
        {
          opacity: 0,
          x: 20,
          stagger: 0.07,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.15",
      );
  },
  { scope: menuRef, dependencies:[isMobile] },
);

useEffect(() => {
  if (!menuTl.current) return;
  if (isOpen) menuTl.current.timeScale(1).play();
  else menuTl.current.timeScale(1.5).reverse();
}, [isOpen ]);
  return (
    <Fragment>
      <div
        ref={containerRef}
        className="header  fixed top-0  inset-x-0 z-40 bg-[#ffffffa1] dark:bg-[#0000001b] backdrop-blur-sm flex flex-row justify-between items-center gap-4   px-2 sm:px-10 py-3 "
      >
        <Title />
        <div className="flex sm:contents gap-1 ">
          <NavigationBar navItems={navItems} />
          <Button
            circle
            icon={menu}
            color="bg-surface-dark"
            customStyle="p-3 sm:hidden"
            onClick={() => setIsOpen(true)}
          />
        </div>
        <Toolbar />
      </div>

      {isMobile &&  (
        <div
            ref={menuRef}
 className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto p-2 bg-bg-main px-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-between items-center">
              <div className=" flex gap-2 justify-center items-center">
                <img src={name} />
                <img src={title} />
              </div>
              <Button
                circle
                color="bg-bg-main"
                customStyle="p-3"
                icon={cancel}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex w-full justify-end items-center gap-3">
              <Button
                circle
                icon={bellIcon}
                customStyle="p-3 border border-border"
                color="bg-bg-field"
                content={
                  <div className="absolute -bottom-0.5 -right-0.5  w-4 h-4 rounded-full bg-danger border-white text-white text-[12px] leading-[20px]">
                    2
                  </div>
                }
              />
              <Button
                circle
                icon={mode === "dark" ? sunIcon : moonIcon}
                customStyle="p-3"
                color="bg-text-dark"
                onClick={() => 
                  dispatch(toggleTheme())
                 
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                end={item.link === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `menu-item text-[32px] font-bold cursor-pointer w-full text-right hover:text-primary border-b border-border transition-colors py-1.5 px-2 duration-300 ${
                    isActive ? "bg-bg-lightGray text-primary" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-row w-full border-t border-border p-6 justify-center gap-6">
            {medias.map((icon, i) => (
              <img key={i} src={icon} className="dark:invert " />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
