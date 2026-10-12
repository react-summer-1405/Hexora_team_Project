import topTeacher1 from "../../../../../assets/images/topTeacher1.jpg";
import topTeacher2 from "../../../../../assets/images/topTeacher2.png";
import topTeacher3 from "../../../../../assets/images/topTeacher3.png";
import medalFirst from "../../../../../assets/icons/medal-first-place.svg";
import medalSecond from "../../../../../assets/icons/medal-second-place.svg";
import medalThird from "../../../../../assets/icons/medal-third-place.svg";

const topTeachers = [
  {
    pic: topTeacher1,
    name: "محمدحسین بحرالعلومی",
    rate: "۴.۸",
    medal: medalFirst,
    position: "lg:top-1/5 lg:left-2/5",
  },
  {
    pic: topTeacher2,
    name: "محسن اسفندیاری",
    rate: "۴.۲",
    medal: medalSecond,
    position: "lg:top-2/5 lg:left-1/8",
  },
  {
    pic: topTeacher3,
    name: "محمدحسین خلیل‌پور",
    rate: "۴.۱",
    medal: medalThird,
    position: "lg:top-2/5 lg:left-2/3",
  },
];

const TopThreeTeachers = () => {
  return (
    <div className="relative w-full lg:w-191 h-179 lg:h-89 lg:block flex flex-col items-center justify-evenly  bg-bg-lightDark rounded-3xl bg-[url('../../assets/icons/Vertical_Vector.svg')]  lg:bg-[url('../../assets/icons/curlyLineTeachers.svg')] bg-contain bg-no-repeat bg-center">
      {topTeachers.map((teacher) => (
        <div
          key={teacher.name}
          className={`lg:absolute ${teacher.position} flex flex-col items-center justify-center gap-2.5 text-text-white`}
        >
          <img
            src={teacher.pic}
            alt={teacher.name}
            className="w-22 h-22 rounded-full"
          />
          <div
            className={`px-6 text-[20px] font-bold flex flex-row-reverse justify-center items-center `}
          >
             <img src={teacher.medal} alt="" className="w-8 h-8" />
           <h6> {teacher.rate}</h6>
          </div>
          <h6 className="font-medium text-md">{teacher.name}</h6>
        </div>

      ))}
              <div className="absolute left-10 -top-3 w-10 h-10 animate-spin bg-[url('../../assets/icons/blueStar.svg')] bg-no-repeat bg-contain bg-center"></div>
        <div className="absolute -bottom-3 right-2 w-10 h-10 animate-spin bg-[url('../../assets/icons/yellowStar.svg')] bg-no-repeat bg-contain bg-center"></div>
    </div>
  );
};

export default TopThreeTeachers;
