import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Topic from "../../../../common/texts/Topic";
import ServicesDivisions from "./ServicesDivisions";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PresentServices = () => {
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
          start: "top 75%",
          once: true,
        },
      });

      tl.from(split.words, {
        yPercent: 110,
        opacity:0,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
      })
        .from(
          ".divisions",
          {
            opacity: 0,
            y: 60,
            x: (i) => (i % 2 === 0 ? 80 : -80),
            scale: 0.9,
            rotation: (i) => (i % 2 === 0 ? 3 : -3),
            duration: 1,
            stagger: 0.18,
            ease: "back.out(1.4)",
            clearProps: "transform,opacity",
          },
          "-=0.4",
        )
        .from(
          ".service-icon",
          {
            scale: 0,
            rotation: -90,
            duration: 0.7,
            stagger: 0.18,
            ease: "back.out(2.5)",
          },
          "<0.3",
        )
        .from(
          ".service-text > *",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
            stagger: 0.05,
          },
          "<0.1",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-15"
    >
      <div className="w-85 text-3xl font-bold text-center cursor-default">
        <div className="title-text">
          <Topic content="خدماتی که ما در طی دوره‌ها به شما ارائه میدیم" />
        </div>
      </div>
      <ServicesDivisions />
    </div>
  );
};

export default PresentServices;