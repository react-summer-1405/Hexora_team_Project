import Header from "../header/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/components/Footer";
import ScrollToTop from "../common/navigation/ScrollToTop";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MainLayout = () => {
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
    <div className="flex flex-col gap-14 ">
      <ScrollToTop />
      <Header />
      <main ref={ref} className="pt-20 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
