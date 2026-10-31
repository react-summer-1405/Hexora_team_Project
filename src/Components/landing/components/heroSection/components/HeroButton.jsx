import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../../../common/Button";
import { useNavigate } from "react-router-dom";

const HeroButton = () => {
  const container = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 1,
      }).from(
        ".hero-btn",
        {
          scale: 0.6,
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "+=0.2",
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col gap-2.5 items-center w-63">
      <span className="flex flex-col items-start text-lg font-medium text-text-dark">
        <i className="hero-line">همین حالا</i>
        <i className="hero-line">شروع کن به یادگیری!</i>
      </span>
      <div className="hero-btn">
        <Button
          content="جدیدترین دوره‌ها"
          onClick={() => navigate("/courses")}
        />
      </div>
    </div>
  );
};

export default HeroButton;
