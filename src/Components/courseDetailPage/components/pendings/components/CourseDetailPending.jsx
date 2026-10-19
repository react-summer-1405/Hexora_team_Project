import IntroductionPending from "./IntroductionPending";
import CommentSectionPending from "./CommentSectionPending";
import RelatedOnesPending from "./RelatedOnesPending";

const CourseDetailPending = () => {
  return (
    <div className="flex flex-col gap-12">
      <IntroductionPending />
      <CommentSectionPending />
      <RelatedOnesPending />
    </div>
  );
};

export default CourseDetailPending;