import { useQuery } from "@tanstack/react-query";
import Button from "../../../../common/Button";
import useToggle from "../../../../hooks/useToggle";
import RelatedOnesPending from "../../pendings/components/RelatedOnesPending";
import getBlogsByPagination from "../../../../../core/services/blogs/getblogsByPagination";
import BlogCard from "../../../../landing/components/topBlogs/components/blogCard/components/BlogCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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

  const sectionRef = useRef();

useGSAP(
  () => {
    if (isPending || relatedBlogs.length === 0) return;

    gsap.from(".related-title", {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: ".related-title",
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(".related-grid > *", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: ".related-grid",
        start: "top 85%",
        once: true,
      },
    });
  },
  { scope: sectionRef, dependencies: [isPending, relatedBlogs.length] },
);

  if (isPending) return <RelatedOnesPending />;

  if (relatedBlogs.length !== 0)
    return (
      <div className="flex flex-col gap-6 "ref={sectionRef}>
        <h3 className="related-title text-[20px] font-bold text-text-muted items-start">
          دوره های مرتبط
        </h3>
        <div
          className={`related-grid flex flex-row flex-wrap  items-start justify-center md:justify-center p-4 gap-5 ${isOpen ? "h-max" : "h-96"} overflow-hidden  `}
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
