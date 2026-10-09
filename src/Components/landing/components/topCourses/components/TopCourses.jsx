import CourseCard from "./course/components/CourseCard"

const TopCourses = () => {
    const courses=[
        {name:"وزه ریکت حیس",teacher:"استاد",price:'124,000,000', level:"مقدماتی",subject:'رنامه نویسی'},
        {name:"وزه ریکت حیس",teacher:"استاد",price:'124,000,000', level:"مقدماتی",subject:'رنامه نویسی'},
        {name:"وزه ریکت حیس",teacher:"استاد",price:'124,000,000', level:"مقدماتی",subject:'رنامه نویسی'},
        {name:"وزه ریکت حیس",teacher:"استاد",price:'124,000,000', level:"مقدماتی",subject:'رنامه نویسی'},
        {name:"وزه ریکت حیس",teacher:"استاد",price:'124,000,000', level:"مقدماتی",subject:'رنامه نویسی'},
    ]
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6">

    {courses.map((course,index)=>(
        <CourseCard course={course} index={index} />
    ))}
    
    
    </div>
  )
}

export default TopCourses