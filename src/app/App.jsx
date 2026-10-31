import "../assets/styles/app.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../Components/features/theme/themeSlice";
import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

const App = () => {
gsap.registerPlugin(ScrollTrigger,SplitText,DrawSVGPlugin);


  const mode = useSelector(selectThemeMode);
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
    </>
  );
};

export default App;
