import CaptionOfTitle from "../../../../common/texts/CaptionOfTitle";
import Title from "../../../../common/texts/Title";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


const HeroTitle = () => {

  const containerRef=useRef()

  useGSAP(
    () => {
      
       
          const titleSplit = SplitText.create(".title", {
            type: "words",
          });
          const paragraphSplit = SplitText.create(".paragraph", {
            type: "lines",
          });

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(titleSplit.words, {
              yPercent: 100,
              opacity: 0,
              duration: 1.7,
              stagger: 0.1,
            })
            .from(
              paragraphSplit.lines,
              {
                yPercent: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
              },"-=0.8"
              
            );
        },{scope:containerRef})
      
    

  return (
    <div ref={containerRef}
      className="flex flex-col justify-center items-center gap-5"
    >
      <Title content="آموزش مدرن پیشرفت سریع" className="title" />
      <CaptionOfTitle content="آکادمی آموزش تخصصی برنامه نویسی بحر از کودکان تا بزرگسال" className="paragraph" />
    </div>
  );
};

export default HeroTitle;
