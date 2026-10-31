import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import Topic from "../../../../common/texts/Topic";
import PurposeDivisions from "./PurposeDivisions";

function Purposes() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(".title", {
        yPercent: 50,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      })
        .from(
          ".divisions",
          {
            xPercent: 20,
            opacity: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.3",
        )
        .from(
          ".curly-line path",
          {
            drawSVG: "0%",
            duration: 1.6,
            ease: "power2.inOut",
            stagger: 0.2,
          },
          "<",
        )

    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-10"
    >
      <div className="title">
        <Topic content="اهداف ما در آکادمی" />
      </div>
      <PurposeDivisions />
    </div>
  );
}

export default Purposes;
