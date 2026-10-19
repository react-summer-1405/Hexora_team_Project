import { useParams } from "react-router-dom";
import CommentSection from "../Components/courseDetailPage/components/commentSection/components/CommentSection";
import Introduction from "../Components/courseDetailPage/components/introduction/components/Introduction";
import CommentModal from "../Components/courseDetailPage/components/modals/components/CommentModal";
import ReserveModal from "../Components/courseDetailPage/components/modals/components/ReserveModal";
import RelatedOnes from "../Components/courseDetailPage/components/relatedOnes/components/RelatedOnes";
import useToggle from '../Components/hooks/useToggle'
import CourseDetailPending from '../Components/courseDetailPage/components/pendings/components/CourseDetailPending'
import { useQuery } from "@tanstack/react-query";
import getCourseById from "../core/services/courses/getCourseById";
import CourseDetailError from "../Components/courseDetailPage/components/error/CourseDetailError";
const CourseDetailPage = () => {
  const[isReserveModal,toggleReserve]=useToggle(false)
  const[isCommentModal,toggleComment]=useToggle(false)
const {id}=useParams()

  const { data:course, isError, error, isPending, refetch, isFetching }=useQuery({
    queryKey:["getCourseById",id],
    queryFn:()=>getCourseById(id),
    
  })

  

  if(isPending) return  <CourseDetailPending/>;

  if (isError)
  return (
    <CourseDetailError
      error={error}
      refetch={refetch}
      isFetching={isFetching}
    />
  );

  
if (course) {
  // API نظرها جداست؛ فعلاً آرایه خالی
  const comments = [];

  return (
    <div className="flex flex-col gap-12">
      <Introduction course={course} toggleReserve={toggleReserve} />
      <CommentSection comments={comments} toggleComment={toggleComment} />
      <RelatedOnes />

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
        comments={comments}
      />
    </div>
  );
}
}

export default CourseDetailPage