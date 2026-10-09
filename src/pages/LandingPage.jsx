import Header from "../Components/header/components/Header"
import HeroSection from "../Components/landing/components/heroSection/components/HeroSection"
import PresentServices from "../Components/landing/components/presentServices/components/PresentServices"
import Purposes from "../Components/landing/components/purposes/components/Purposes"
import TopBlogsSection from "../Components/landing/components/topBlogs/components/TopBlogsSection"
import TopCoursesSection from "../Components/landing/components/topCourses/components/TopCoursesSection"

const LandingPage = () => {
  return (
    <>
    <Header/>
    <HeroSection/>
    <Purposes/>
    <PresentServices/>
    <TopCoursesSection/>
    <TopBlogsSection/>
    
    </>
  )
}

export default LandingPage