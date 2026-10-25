import { useParams } from "react-router-dom";
import CommentSection from "../Components/blogDetailPage/components/commentSection/components/CommentSection";
import Introduction from "../Components/blogDetailPage/components/introduction/components/Introduction";
import CommentModal from "../Components/blogDetailPage/components/modals/components/CommentModal";
import RelatedOnes from "../Components/blogDetailPage/components/relatedOnes/components/RelatedOnes";
import useToggle from "../Components/hooks/useToggle";
import BlogDetailPending from "../Components/blogDetailPage/components/pendings/components/BlogDetailPending";
import { useQuery } from "@tanstack/react-query";
import BlogDetailError from "../Components/blogDetailPage/components/error/BlogDetailError";
import { normalizeBlogComment } from "../Components/blogDetailPage/components/commentSection/utils/commentUtils";
import getBlogById from "../core/services/blogs/getBlogById";
import { getBlogComments } from "../core/services/blogs/blogComments";
const BlogDetailPage = () => {
  const [isCommentModal, toggleComment] = useToggle(false);
  const { id } = useParams();

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

  const { data: comments = [] } = useQuery({
    queryKey: ["blogComments", id],
    queryFn: () => getBlogComments(id),
    select: (data) => data.filter((c) => c.accept).map(normalizeBlogComment),
    staleTime:0,
  });

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
      <div className=" flex flex-col gap-12">
        <Introduction blog={blog} />
        <CommentSection
          comments={comments}
          blogId={id}
          toggleComment={toggleComment}
        />
        <RelatedOnes blog={blog}/>


        <CommentModal
          isOpen={isCommentModal}
          onClose={toggleComment}
          courseTitle={blog.title}
          courseId={id}
          comments={comments}
        />

     </div>
    );
  }
};

export default BlogDetailPage;
