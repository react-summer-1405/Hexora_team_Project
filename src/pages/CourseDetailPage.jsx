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
const CourseDetailPage = () => {
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
    staleTime:0,
  });

  if (isPending) return <CourseDetailPending/>;

  
  if (isError)
    return (
      <CourseDetailError
        error={error}
        refetch={refetch}
        isFetching={isFetching}
      />
    );

  if (course) {
    return (
      <div className=" flex flex-col gap-12">
        <Introduction course={course} toggleReserve={toggleReserve} />
        <CommentSection
          comments={comments}
          courseId={id}
          toggleComment={toggleComment}
        />
        <RelatedOnes course={course}/>

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
  />      </div>
    );
  }
};

export default CourseDetailPage;
