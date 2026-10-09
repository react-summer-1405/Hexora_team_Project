import BlogCard from "./blogCard/components/BlogCard"

const TopBlogsList = () => {
   const blogs=[
        {name:"وزه ریکت حیس",teacher:"استاد",date:'22 اردیبهشت 1403',view:"300"},
        {name:"وزه ریکت حیس",teacher:"استاد",date:'22 اردیبهشت 1403',view:"300"},
        {name:"وزه ریکت حیس",teacher:"استاد",date:'22 اردیبهشت 1403',view:"300"},
        {name:"وزه ریکت حیس",teacher:"استاد",date:'22 اردیبهشت 1403',view:"300"},
        {name:"وزه ریکت حیس",teacher:"استاد",date:'22 اردیبهشت 1403',view:"300"},

    ]
  return (
    <div className=" flex flex-row flex-wrap justify-center items-center gap-6">

    {blogs.map((blog,index)=>(
        <BlogCard blog={blog} index={index} />
    ))}
    
    
    </div>
  )

}

export default TopBlogsList