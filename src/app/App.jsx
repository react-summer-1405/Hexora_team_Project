import "../assets/styles/app.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode } from "../Components/features/theme/themeSlice";
import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { closeNotification } from "../Components/features/notification/notificationSlice";
import NotificationDrawer from "../Components/header/components/NotificationDrawer";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const App = () => {
  const mode = useSelector(selectThemeMode);

  const isNotificationOpen = useSelector((state) => state.notification.isOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", mode);
    } catch {}
  }, [mode]);

  return (
    <>
      <Toaster containerStyle={{ top: 25 }} />
      <RouterProvider router={router} />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => dispatch(closeNotification())}
      />
    </>
  );
};

export default App;
