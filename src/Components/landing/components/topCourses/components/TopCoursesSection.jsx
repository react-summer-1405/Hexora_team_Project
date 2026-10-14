import Button from "../../../../common/Button";
import Topic from "../../../../common/texts/Topic";
import TopCourses from "./TopCourses";

const TopCoursesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 ">
      <Topic content="دوره های برتر هفته"/>
   
      <TopCourses />

      <Button content="مشاهده بیشتر" color="bg-lightDark" />
    </div>
  );
};

export default TopCoursesSection;
