import { useNavigate } from "react-router-dom";
import Button from "../../../../common/Button";
import Topic from "../../../../common/texts/Topic";
import TopBlogsList from "./TopBlogsList";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const TopBlogsSection = () => {
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
      className=" p-3 flex flex-col items-center justify-center gap-12 overflow-hidden"
    >
      <Topic content="بلاگ های برتر هفته" className="title-text" />
      <TopBlogsList />
      <div className="button">
        <Button content="مشاهده بیشتر" onClick={() => navigate("/blogs")} />
      </div>
    </div>
  );
};

export default TopBlogsSection;
