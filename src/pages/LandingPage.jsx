import HeroSection from "../Components/landing/components/heroSection/components/HeroSection";
import PresentServices from "../Components/landing/components/presentServices/components/PresentServices";
import Purposes from "../Components/landing/components/purposes/components/Purposes";
import TopBlogsSection from "../Components/landing/components/topBlogs/components/TopBlogsSection";
import TopCoursesSection from "../Components/landing/components/topCourses/components/TopCoursesSection";
import TopTeachersSection from "../Components/landing/components/topTeachers/components/TopTeachersSection";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-28">
      <HeroSection />
      <Purposes />
      <PresentServices />
      <TopCoursesSection />
      <TopBlogsSection />
      <TopTeachersSection />
    </div>
  );
};

export default LandingPage;
