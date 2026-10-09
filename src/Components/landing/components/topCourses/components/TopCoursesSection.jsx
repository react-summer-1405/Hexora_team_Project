import Button from '../../../../common/Button'
import TopCourses from './TopCourses';

const TopCoursesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-30">
    <h3 className='text-3xl font-bold text-center '>دوره های برتر هفته</h3>
    <TopCourses/>

<Button content="مشاهده بیشتر"/>
    
    
    </div>
  )
}

export default TopCoursesSection