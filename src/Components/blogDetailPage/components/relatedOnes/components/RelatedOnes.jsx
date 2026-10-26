import { useQuery } from "@tanstack/react-query";
import Button from "../../../../common/Button";
import useToggle from "../../../../hooks/useToggle";
import RelatedOnesPending from "../../pendings/components/RelatedOnesPending";
import getBlogsByPagination from "../../../../../core/services/blogs/getblogsByPagination";
import BlogCard from "../../../../landing/components/topBlogs/components/blogCard/components/BlogCard";

const RelatedOnes = ({ blog }) => {
  const [isOpen, toggle] = useToggle(false);

  const techName = blog?.newsCatregoryName;

  const { data, isPending } = useQuery({
    queryKey: ["getRelatedBlogs"],
    queryFn: getBlogsByPagination,
  });

  const blogs = data?.news ?? [];

console.log(blogs , techName);


  const relatedBlogs = blogs.filter(
    (blog) => blog.newsCatregoryName === techName,
  );

  if (isPending) return <RelatedOnesPending />;

  if (relatedBlogs.length !== 0)
    return (
      <div className="flex flex-col gap-6 ">
        <h3 className="text-[20px] font-bold text-text-muted items-start">
          دوره های مرتبط
        </h3>
        <div
          className={`flex flex-row flex-wrap  items-start justify-center md:justify-start p-4 gap-5 ${isOpen ? "h-max" : "h-96"} overflow-hidden  `}
        >
          {relatedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {relatedBlogs.length >= 3 && (
          <Button
            content={isOpen ? "مشاهده کمتر" : "مشاهده بیشتر"}
            customStyle="self-center"
            onClick={toggle}
          />
        )}
      </div>
    );
};

export default RelatedOnes;
