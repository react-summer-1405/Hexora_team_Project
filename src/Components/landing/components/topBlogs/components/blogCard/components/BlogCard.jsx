import BottomBlog from "./bottomBlog";
import TopBlog from "./TopBlog";

const BlogCard = ({ blog, index }) => {
    const { name, teacher, date,view  } = blog;
  return (
                <div  key={index}  className="max-w-107 min-w-80 h-91 cursor-pointer hover:scale-105  transition duration-300 rounded-4xl">
                    <TopBlog />
                    <BottomBlog name={name} teacher={teacher} date={date} view={view} />

        </div>
  )
}

export default BlogCard