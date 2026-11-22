import { useParams } from "react-router-dom";
import CommentSection from "../Components/courseDetailPage/components/commentSection/components/CommentSection";
import Introduction from "../Components/courseDetailPage/components/introduction/components/Introduction";
import CommentModal from "../Components/courseDetailPage/components/modals/components/CommentModal";
import ReserveModal from "../Components/courseDetailPage/components/modals/components/ReserveModal";
import RelatedOnes from "../Components/courseDetailPage/components/relatedOnes/components/RelatedOnes";
import useToggle from "../Components/hooks/useToggle";
import CourseDetailPending from "../Components/courseDetailPage/components/pendings/components/CourseDetailPending";
import { useQuery } from "@tanstack/react-query";
import getCourseById from "../core/services/courses/getCourseById";
import CourseDetailError from "../Components/courseDetailPage/components/error/CourseDetailError";
import { getCourseComments } from "../core/services/courses/courseComments";
import { normalizeComment } from "../Components/courseDetailPage/components/commentSection/utils/commentUtils";
import MobileCourseBar from "../Components/courseDetailPage/components/mobileCourseBar.jsx/components/MobileCourseBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";


const CourseDetailPage = () => {
  const containerRef = useRef();
  const [isReserveModal, toggleReserve] = useToggle(false);
  const [isCommentModal, toggleComment] = useToggle(false);
  const { id } = useParams();

  const {
    data: course,
    isError,
    error,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["getCourseById", id],
    queryFn: () => getCourseById(id),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["courseComments", id],
    queryFn: () => getCourseComments(id),
    select: (data) => data.filter((c) => c.accept).map(normalizeComment),
    staleTime: 0,
  });

  useGSAP(
    () => {
      if (isPending || isError) return;

      const titleTarget = ".course-title";
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

  
  if (isPending) return <CourseDetailPending />;

  if (isError)
    return (
      <CourseDetailError
        error={error}
        refetch={refetch}
        isFetching={isFetching}
      />
    );

  return (
    <div ref={containerRef} className=" flex flex-col gap-12">
      <Introduction course={course} toggleReserve={toggleReserve} />
      <CommentSection
        comments={comments}
        courseId={id}
        toggleComment={toggleComment}
      />
      <RelatedOnes course={course} />
      
      {/* modals */}
      <ReserveModal
        isOpen={isReserveModal}
        onClose={toggleReserve}
        courseTitle={course.title}
      />
      <CommentModal
        isOpen={isCommentModal}
        onClose={toggleComment}
        courseTitle={course.title}
        courseId={id}
        comments={comments}
      />
      <MobileCourseBar
        cost={course.cost}
        isCourseReseve={course.isCourseReseve}
        toggleReserve={toggleReserve}
      />{" "}
    </div>
  );
};

export default CourseDetailPage;
