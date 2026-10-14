import BottomBlog from "./bottomBlog";
import TopBlog from "./TopBlog";

const BlogCard = ({ blog }) => {
  const {
    title,
    addUserFullName,
    insertDate,
    currentView: view,
    currentImageAddress: image,
  } = blog;
  const date = insertDate.split("T");
  const day = date[0];
  console.log("new date", day);
  return (
    <div
      className=" sm:w-108  h-91w-80 cursor-pointer  hover:-translate-y-2  transition duration-300 rounded-4xl"
      dir="rtl"
    >
      <TopBlog image={image} />
      <BottomBlog
        title={title}
        addUserFullName={addUserFullName}
        date={day}
        view={view}
      />
    </div>
  );
};

export default BlogCard;
