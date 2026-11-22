import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import html5Pic from "../../../../../assets/images/html5.png";
import css3Pic from "../../../../../assets/images/css3.png";
import figmaPic from "../../../../../assets/images/figma.png";
import reactPic from "../../../../../assets/images/react.png";
import jsPic from "../../../../../assets/images/js.png";

const RoadMap = () => {
  const container = useRef(null);
  const logoImages = [figmaPic, reactPic, jsPic, css3Pic, html5Pic];

  useGSAP(
    () => {
      const dots = gsap.utils.toArray(".road-dot");
      const icons = gsap.utils.toArray(".road-icon");
      const total = 3;
      const n = logoImages.length;

      const tl = gsap.timeline();

      tl.fromTo(
        ".road-line",
        { scaleX: 0 },
        { scaleX: 1, duration: total, ease: "none" },
        0,
      );

      dots.forEach((dot, i) => {
        const t = ((i + 0.5) / n) * total;

        tl.to(
          dot,
          {
            borderColor: "#3B82F6",
            duration: 0.3,
          },
          t,
        ).from(
          icons[i],
          {
            scale: 0,
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
          },
          t,
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative bg-[#eee] h-1.5 flex flex-row justify-around items-center mt-15 -mx-3.5"
    >
      <div className="road-line absolute inset-0 bg-primary origin-right" />

      {logoImages.map((image, index) => (
        <div key={index} className="relative ">
          <div className="road-dot w-6 h-6 rounded-full border-6 border-[#D9D9D9] bg-[#FCFCFC]" />
          <div className="road-icon absolute -top-18 sm:-top-23 -left-5 sm:-left-8 w-15 sm:w-22 h-15 sm:h-22 rounded-full">
            <img src={image} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadMap;