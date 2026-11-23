import teacher1 from "../../../../../assets/images/teacher1.png";
import teacher2 from "../../../../../assets/images/teacher2.png";
import teacher3 from "../../../../../assets/images/teacher3.png";

import student1 from "../../../../../assets/images/student1.png";
import student2 from "../../../../../assets/images/student2.png";
import student3 from "../../../../../assets/images/student3.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const AccountNum = () => {
  const container = useRef(null);

  const randomImageTeachers = [
    { src: teacher1, bgColor: "bg-[#B2AFD4]" },
    { src: teacher2, bgColor: "bg-[#DBC0DD]" },
    { src: teacher3, bgColor: "bg-[#CDD4AF]" },
  ];

  const randomImageStudents = [
    { src: student1, bgColor: "bg-[#B2AFD4]" },
    { src: student2, bgColor: "bg-[#FE8990]" },
    { src: student3, bgColor: "bg-[#CDD4AF]" },
  ];

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".row");

      rows.forEach((row, i) => {
        const tl = gsap.timeline({ delay: i * 0.3 });

        tl.from(row.querySelectorAll(".images"), {
          scale: 0,
          y: 20,
          opacity: 0,
          rotation: -15,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.12,
        }).from(
          row.querySelectorAll(".text"),
          {
            x: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.3,
          },
          "-=0.3",
        );
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col lg:gap-4 gap-5">
      <div className="row flex flex-row gap-2 items-center">
        <div className="flex flex-row justify-center items-center">
          {randomImageTeachers.map((image, index) => (
            <img
              className={`images w-8 h-8 -mx-1 rounded-full border-white border-2 ${image.bgColor}`}
              key={index}
              src={image.src}
              alt={`استاد ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex flex-row items-center font-semibold whitespace-nowrap gap-2">
        <span className="text ">
          + ۱۰۰
        </span>
        <span className="text">دانشجو فعال در دوره</span>
        </div>
      </div>

      <div className="row flex flex-row gap-2 items-center ms-9">
        <div className="flex flex-row justify-center items-center ">
          {randomImageStudents.map((image, index) => (
            <img
              className={`images w-8 h-8 -mx-1 rounded-full border-white border-2 ${image.bgColor}`}
              key={index}
              src={image.src}
              alt={`دانشجو ${index + 1}`}
            />
          ))}
        </div>
                <div className="flex flex-row items-center font-semibold whitespace-nowrap gap-2">

        <span className="text">
          + ۵۰
        </span>
        <span className="text">اساتید برتر جهان </span>
        </div>
      </div>
    </div>
  );
};

export default AccountNum;
