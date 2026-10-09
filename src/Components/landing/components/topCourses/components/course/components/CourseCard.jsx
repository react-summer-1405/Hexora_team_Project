import BottomCard from "./BottomCard"
import TopCard from "./TopCard"

const CourseCard = ({ course, index }) => {
    const { name, teacher, price, level, subject } = course;
  return (
                <div  key={index}  className="min-w-80 h-91 cursor-pointer hover:scale-105  transition duration-300 rounded-4xl">
                    <TopCard level={level} subject={subject} />
                    <BottomCard name={name} teacher={teacher} price={price} />

        </div>
  )
}

export default CourseCard