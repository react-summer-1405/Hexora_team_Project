import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../../hooks/formatters";
import BottomBlog from "./bottomBlog";
import TopBlog from "./TopBlog";

const BlogCard = ({ blog }) => {
  const {
    id,
    title,
    addUserFullName,
    insertDate,
    currentView: view,
    currentImageAddress: image,
  } = blog;
  const date = insertDate.split("T");
  const day = date[0];
   
     const navigate=useNavigate()
const handleClick = ()=>{
   navigate(`/blogs/${id}`);
}
  return (
    <div onClick={handleClick}
      className=" sm:w-108  h-91 w-80 cursor-pointer  hover:-translate-y-2  transition duration-300 rounded-4xl"
      dir="rtl"
    >
      <TopBlog image={image} />
      <BottomBlog
        title={title}
        addUserFullName={addUserFullName}
        date={formatDate(day)}
        view={view}
      />
    </div>
  );
};

export default BlogCard;
