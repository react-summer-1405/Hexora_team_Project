import { useParams } from "react-router-dom";
import CommentSection from "../Components/blogDetailPage/components/commentSection/components/CommentSection";
import Introduction from "../Components/blogDetailPage/components/introduction/components/Introduction";
import CommentModal from "../Components/blogDetailPage/components/modals/components/CommentModal";
import RelatedOnes from "../Components/blogDetailPage/components/relatedOnes/components/RelatedOnes";
import useToggle from "../Components/hooks/useToggle";
import BlogDetailPending from "../Components/blogDetailPage/components/pendings/components/BlogDetailPending";
import { useQuery } from "@tanstack/react-query";
import BlogDetailError from "../Components/blogDetailPage/components/error/BlogDetailError";
import getBlogById from "../core/services/blogs/getBlogById";
import { getBlogComments } from "../core/services/blogs/blogComments";
import normalizeBlogComment from "../Components/blogDetailPage/components/commentSection/utils/commentUtils";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
const BlogDetailPage = () => {
  const [isCommentModal, toggleComment] = useToggle(false);
  const { id } = useParams();

const containerRef = useRef();
  const {
    data: blog,
    isError,
    error,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["getBlogById", id],
    queryFn: () => getBlogById(id),
  });

  

  const { data: comments=[]  } = useQuery({
    queryKey: ["blogComments", id],
    queryFn: () => getBlogComments(id),
    select: (data)=>data.map(normalizeBlogComment),
    staleTime:0,
  });
  useGSAP(
    () => {
      if (isPending || isError) return;

      const titleTarget = ".blog-title";
     const paragraphTargets = ".description > .texts";

       const parSplit = SplitText.create(paragraphTargets, {
            type: "words",
          });
    
       const titleSplit = SplitText.create(titleTarget, {
            type: "words",
          });
    
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(titleSplit.words, {
              opacity: 0,
              y: 20,
              duration: 0.7,
              stagger: 0.5,
            })
            .from(parSplit.words, {
              opacity: 0,
              duration: 0.2,
              stagger: 0.03,
            },"-=1.5")

      



      const clear = "transform,opacity,clipPath";
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".intro-image",
          {
            clipPath: "inset(100% 0% 0% 0% round 32px)",
            opacity: 0,
            y: 40,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            opacity: 1,
            y: 0,
            duration: 1.2,
            clearProps: clear,
          },
        )
        .from(
          ".info-box > *",
          {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.05,
            clearProps: clear,
          },
          "-=0.8",
        )
        .from(
          ".point-price",
          { opacity: 0, y: 20, duration: 0.6, clearProps: clear },
          "-=0.4",
        )
        .from(
          ".point-price .star",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(2.5)",
            clearProps: clear,
          },
          "<0.1",
        )


      gsap.from(".description > h6", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        clearProps: clear,
        scrollTrigger: {
          trigger: ".description > h6",
          start: "top 90%",
          once: true,
        },
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: ".rate-row",
            start: "top 92%",
            once: true,
          },
        })
        .from(".rate-row", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          clearProps: clear,
        })
        .from(
          ".rate-star",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(2.5)",
            clearProps: clear,
          },
          "<0.1",
        );
    },

    { scope: containerRef, dependencies: [isPending, isError, id] },
  );
  

  if (isPending) return <BlogDetailPending/>;


  if (isError)
    return (
      <BlogDetailError
        error={error}
        refetch={refetch}
        isFetching={isFetching}
      />
    );

  if (blog) {
    return (
      <div className=" flex flex-col gap-12" ref={containerRef}>
        <Introduction blog={blog} />
        <CommentSection
          comments={comments}
          toggleComment={toggleComment}
        />
        <RelatedOnes blog={blog}/>
      

        <CommentModal
          isOpen={isCommentModal}
          onClose={toggleComment}
          blogTitle={blog.title}
          blogId={id}
          comments={comments}
        />

     </div>
    );
  }
};

export default BlogDetailPage;
