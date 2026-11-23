import Explanation from "./Explanation";
import TopThreeTeachers from "./TopThreeTeachers";
const TopTeachersSection = () => {
  return (
    <div className="w-full lg:h-105 py-8 px-4 bg-bg-dark rounded-4xl flex flex-col lg:flex-row gap-12 justify-around items-center overflow-hidden">
      <Explanation />
      <TopThreeTeachers />
    </div>
  );
};

export default TopTeachersSection;
