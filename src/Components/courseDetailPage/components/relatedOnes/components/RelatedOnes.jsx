import CourseCard from "../../../../landing/components/topCourses/components/course/components/CourseCard"

const RelatedOnes = () => {
    const mockCourses = [
  {
    id: 1,
    title: "دوره جامع جاوا اسکریپت",
    teacherName: "محمد رضایی",
    cost: 2500000,
    levelName: "مقدماتی",
    statusName: "در حال برگزاری",
    imageAddress: "https://placehold.co/320x180?text=JavaScript",
  },
  {
    id: 2,
    title: "آموزش پروژه‌محور ری‌اکت",
    teacherName: "سارا کریمی",
    cost: 3200000,
    levelName: "متوسط",
    statusName: "ثبت‌نام باز",
    imageAddress: "https://placehold.co/320x180?text=React",
  },
  {
    id: 3,
    title: "طراحی رابط کاربری با Tailwind",
    teacherName: "علی احمدی",
    cost: 1800000,
    levelName: "مقدماتی",
    statusName: "تکمیل ظرفیت",
    imageAddress: "https://placehold.co/320x180?text=Tailwind",
  },
  {
    id: 4,
    title: "Node.js و ساخت API",
    teacherName: "مینا حسینی",
    cost: 4100000,
    levelName: "پیشرفته",
    statusName: "در حال برگزاری",
    imageAddress: "https://placehold.co/320x180?text=Node.js",
  },

];
  return (
    <div className="flex flex-col gap-6">
        <h3 className="text-[20px] font-bold text-text-muted items-start">دوره های مرتبط </h3>
            <div className="flex flex-row flex-wrap items-start justify-start gap-4">

      {mockCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
    </div>
  )
}

export default RelatedOnes