import  { useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../dashboard/sidebar/sidebar.jsx";
import Header from "../../dashboard/Header/Header.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const ref = useRef();
  const { pathname } = useLocation();
 
  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          clearProps: "transform,opacity",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    },
    { scope: ref, dependencies: [pathname] },
  );
 
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex overflow-hidden bg-bg-dark dark:bg-bg-field"
    >
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
 
      <main className="flex flex-1 flex-col overflow-y-auto ">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
 
        <div
          ref={ref}
          className="m-4 mt-0 flex-1 rounded-[30px] bg-white p-4 text-text-dark md:m-6 md:mt-0 md:p-8 dark:bg-bg-main"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}