import { useNavigate } from "react-router-dom";
import Button from "../../../../common/Button";
import Topic from "../../../../common/texts/Topic";
import TopCourses from "./TopCourses";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const TopCoursesSection = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(".title-text", {
        type: "words",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });
      tl.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
      }).from(
        ".button",
        {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          clearProps: "transform,opacity",
        },
        "+=0.5",
      );
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center p-3  gap-10 overflow-hidden"
    >
      <Topic content="دوره های برتر هفته" className="title-text" />
      <TopCourses />
      <div className="button">
        <Button content="مشاهده بیشتر" onClick={() => navigate("/courses")} />
      </div>
    </div>
  );
};

export default TopCoursesSection;
س;
