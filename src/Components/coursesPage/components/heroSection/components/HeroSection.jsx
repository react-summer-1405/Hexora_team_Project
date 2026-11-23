import { useGSAP } from "@gsap/react";
import CaptionOfTitle from "../../../../common/texts/CaptionOfTitle";
import Title from "../../../../common/texts/Title";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const HeroSection = () => {

  
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
                stagger: 0.8,
              },"-=0.8"
              
            );
        },{scope:containerRef})
  return (
    <div className="flex flex-col justify-center items-center gap-5" ref={containerRef}>
      <Title content="شروع ماجراجویی جدید" className="title" />
      <CaptionOfTitle content="یک شروع قوی برای یادگیری یک مسئله جدید میتونه تو پیشرفت کمکت کنه" className="paragraph" />
    </div>
  );
};

export default HeroSection;
