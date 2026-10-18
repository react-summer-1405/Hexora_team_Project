import CommentSection from "../Components/courseDetailPage/components/commentSection/components/CommentSection";
import Introduction from "../Components/courseDetailPage/components/introduction/components/Introduction";
import RelatedOnes from "../Components/courseDetailPage/components/relatedOnes/components/RelatedOnes";

const CourseDetailPage = () => {

  return (
    <div className="flex flex-col gap-12">
        <Introduction/>
        <CommentSection/>
        <RelatedOnes/>

    </div>
  )
}

export default CourseDetailPage