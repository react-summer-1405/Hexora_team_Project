import { useQuery } from "@tanstack/react-query";
import Button from "../../../../common/Button";
import reload from '../../../../../assets/icons/Arrows_Reload.svg'
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../assets/icons/details/whiteLike.svg";
import useToggle from "../../../../hooks/useToggle";
import CommentForm from "../../commentSection/components/CommentForm";
import { getBlogReplyComments } from "../../../../../core/services/blogs/blogComments";
import normalizeBlogComment from "../../commentSection/utils/commentUtils";
import { useCommentActionBlog } from "../../../../hooks/useCommentActionBlog";
import { useSelector } from "react-redux";

import accountIcon from "../../../../../assets/icons/account.svg"

export const CommentRow = ({
  id,
  blogId,
  parentId = null,
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  isLiked,
  likeId
}) => {
  const isReply = !!parentId;
      const userId = useSelector((state) => state.auth.userId);
      
  const [isReplyOpen, toggleReply] = useToggle(false);
  const [showReplies, toggleReplies] = useToggle(false);

  const { like, addReply } = useCommentActionBlog(blogId, parentId);

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["blogReplies", blogId, id],
    queryFn: () => getBlogReplyComments(id),
    select: (data) => data.map(normalizeBlogComment),
    enabled: showReplies && !isReply,
  });

  const handleReply = (values, resetForm) => {
    addReply.mutate(
      { id: parentId, ...values , userId },
      {
        onSuccess: () => {
          resetForm();
          toggleReply();
          toggleReplies
        },
      }
    );
  }

      const handleLike = () => {
    if (like.isPending) return;

    

    like.mutate({
      commentId: id,
      wasLiked: isLiked,
      commentLikeId: likeId,
    });
  };
  return (
    <div className="flex flex-col items-start justify-start gap-3 w-full">
      <div className="cursor-default flex flex-row gap-2 w-43.6 overflow-hidden">
        <img src={authorImage}             onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = accountIcon;
                    }} className="w-10 h-10 rounded-full border shrink-0" />
        <div className="text-right flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-text-dark truncate">{authorName}</span>
          <span className="text-xs font-medium text-text-muted truncate">{date}</span>
        </div>
      </div>

      <div className="flex flex-col text-right text-text-dark">
        <span className="sm:text-lg text-sm  sm:font-bold font-semibold">{title}</span>
        <span className="sm:text-base text-xs sm:font-medium  whitespace-pre-line">{text}</span>
      </div>

      <div className="flex w-3/4 flex-row items-center justify-start gap-5 p-2">
        <div className="flex flex-row items-center gap-2">
          <Button
            circle
            color={isLiked ? "bg-primary" : "bg-bg-main"}
            icon={isLiked ? whiteLike : blackLike}
            customStyle="w-8 h-8"
            onClick={handleLike}
    />
          <span className="text-base font-medium text-text-dark">{likes}</span>
        </div>


        {!isReply && (
          <>
            <Button
              content={isReplyOpen ? "انصراف" : "جواب دادن"}
              textColor="text-primary"
              customStyle="border border-primary px-2 py-1.5 shrink-0"
              circle={false}
              color="bg-bg-main"
              onClick={toggleReply}
            />
            <button
              type="button"
              className="text-sm font-medium text-primary cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={toggleReplies}
            >
              {showReplies ? "بستن جواب‌ها" : "مشاهده جواب‌ها"}
            </button>
          </>
        )}
      </div>

      {isReplyOpen && (
        <CommentForm onSubmit={handleReply} isPending={addReply.isPending} />
      )}

      {showReplies && !isReply && (
        <div className="w-full ps-8 flex flex-col gap-4 border-s border-border">
          {isLoading && <div className="flex flex-row gap-1"><p className="text-sm text-text-muted">در حال بارگذاری</p> <img src={reload} className="w-6 h-6 animate-spin"/></div>}
          {!isLoading && replies.length === 0 && (
            <p className="text-sm text-text-muted">جوابی ثبت نشده.</p>
          )}
          {replies.map((r) => (
            <CommentRow key={r.id} {...r} blogId={blogId} parentId={id} />
          ))}
        </div>
      )}
    </div>
  );
};