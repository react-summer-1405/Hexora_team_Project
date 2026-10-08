import teacher1 from "../../../../../assets/images/teacher1.png";
import teacher2 from "../../../../../assets/images/teacher2.png";
import teacher3 from "../../../../../assets/images/teacher3.png";

import student1 from "../../../../../assets/images/student1.png";
import student2 from "../../../../../assets/images/student2.png";
import student3 from "../../../../../assets/images/student3.png";
const AccountNum = () => {
      const randomImageTeachers = [
    { src: teacher1, bgColor: "#B2AFD4" },
    { src: teacher2, bgColor: "#FE8990" },
    { src: teacher3, bgColor: "#CDD4AF" },
  ];

    const randomImageStudents = [
    { src: student1, bgColor: "#B2AFD4" },
    { src: student2, bgColor: "#FE8990" },
    { src:student3 , bgColor: "#CDD4AF" },
  ];
  return (
         <div>
                <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row  justify-center items-center">
            {randomImageTeachers.map((image, index) => (
              <img
                className={`w-8 h-8 -mx-1 rounded-full border-white border-2 bg-[${image.bgColor}]`}
                key={index}
                src={image.src}
                alt={`استاد ${index + 1}`}
              />
            ))}
          </div>
          <span className="flex flex-row items-center font-semibold">+۱۰۰</span>
          <span>دانشجو فعال در دوره</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row  justify-center items-center">
            {randomImageStudents.map((image, index) => (
              <img
                className={`w-8 h-8 -mx-1 rounded-full border-white border-2 bg-[${image.bgColor}]`}
                key={index}
                src={image.src}
                alt={`دانشجو ${index + 1}`}
              />
            ))}
          </div>
          <span className="flex flex-row items-center font-semibold">+۵۰</span>
          <span>اساتید برتر جهان </span>
        </div>
      </div>
  )
}

export default AccountNum