import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../../../common/Button";

const Explanation = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(".exp-title", {
        x: -80,
        opacity: 0,
        duration: 1,
      })
        .from(
          ".exp-text",
          {
            x: -80,
            opacity: 0,
            duration: 1,
          },
          "<0.2",
        )
        .from(
          ".exp-btn",
          {
            x: -40,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.7)",
            clearProps: "transform,opacity",
          },
          "<0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="cursor-default max-w-131 w-fit text-right flex flex-col items-start gap-6"
    >
      <h3 className="exp-title text-2xl font-bold text-text-white">
        اساتید برتر هفته آکادمی
      </h3>
      <p className="exp-text text-[20px] font-medium text-text-white">
        در هفته جاری، اکادمی برنامه‌نویسی ما مفتخر است که از اساتید برتر خود
        تقدیر کند. این اساتید با دانش عمیق و تجربه گسترده خود در زمینه‌های
        مختلف برنامه‌نویسی، نه تنها به ارتقاء مهارت‌های دانشجویان کمک
        کرده‌اند، بلکه با برگزاری کارگاه‌ها و جلسات مشاوره، فضایی پویا و
        انگیزشی را برای یادگیری فراهم آورده‌اند.
      </p>
      <div className="exp-btn">
        <Button
          content="صفحه اساتید"
          color="bg-primary"
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default Explanation;