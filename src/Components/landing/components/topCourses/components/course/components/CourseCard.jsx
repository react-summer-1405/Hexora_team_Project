import BottomCard from "./BottomCourseCard"
import TopCard from "./TopCourseCard"

const CourseCard = ({ course }) => {
    const { title, teacherName, cost:price, levelName, statusName:subject , imageAddress:image } = course;
   
    
  return (
                <div  className="select-none  min-w-80 max-w-80 h-91 cursor-pointer  hover:-translate-y-2 transition duration-300 rounded-4xl" >
                    <TopCard levelName={levelName} subject={subject} image={image} />
                    <BottomCard title={title} teacherName={teacherName} price={price} />

        </div>
  )
}

export default CourseCard