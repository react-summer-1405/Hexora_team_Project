import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../../../../common/Button";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../assets/icons/details/whiteLike.svg";
import blackDislike from "../../../../../assets/icons/details/blackDislike.svg";
import whiteDislike from "../../../../../assets/icons/details/whiteDislike.svg";
import useToggle from "../../../../hooks/useToggle";
import CommentForm from "../../commentSection/components/CommentForm";
import { normalizeComment } from "../../commentSection/utils/commentUtils";
import { useCommentActions } from "../../../../hooks/useCommentAction";
import { getCourseReplies } from "../../../../../core/services/courses/courseComments";

export const CommentRow = ({
  id,
  courseId,
  parentId = null, // اگه این ردیف خودش ریپلای است
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  dislikes = 0,
  isLiked,
  isDisliked,
}) => {
  const isReply = !!parentId;
  const [isReplyOpen, toggleReply] = useToggle(false);
  const [showReplies, setShowReplies] = useState(false);

  const { like, dislike, addReply } = useCommentActions(courseId, parentId);

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ["courseReplies", courseId, id],
    queryFn: () => getCourseReplies(courseId, id),
    select: (data) => data.map(normalizeComment),
    enabled: showReplies && !isReply,
  });

  const handleReply = (values, resetForm) => {
    addReply.mutate(
      { commentId: id, ...values },
      {
        onSuccess: () => {
          resetForm();
          toggleReply();
          setShowReplies(true);
        },
      }
    );
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3 w-full">
      <div className="cursor-default flex flex-row gap-2 w-43.6 overflow-hidden">
        <img src={authorImage} className="w-10 h-10 rounded-full border shrink-0" />
        <div className="text-right flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-text-dark truncate">{authorName}</span>
          <span className="text-xs font-medium text-text-muted truncate">{date}</span>
        </div>
      </div>

      <div className="flex flex-col text-right text-text-dark">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-base font-medium whitespace-pre-line">{text}</span>
      </div>

      <div className="flex w-3/4 flex-row items-center justify-start gap-5 p-2">
        <div className="flex flex-row items-center gap-1">
          <Button
            circle
            color={isLiked ? "bg-primary" : "bg-bg-main"}
            icon={isLiked ? whiteLike : blackLike}
            customStyle="w-8 h-8"
            onClick={() => !like.isPending && like.mutate(id)}
          />
          <span className="text-base font-medium text-black">{likes}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Button
            circle
            color={isDisliked ? "bg-primary" : "bg-bg-main"}
            icon={isDisliked ? whiteDislike : blackDislike}
            customStyle="w-8 h-8"
            onClick={() => !dislike.isPending && dislike.mutate(id)}
          />
          <span className="text-base font-medium text-black">{dislikes}</span>
        </div>

        {!isReply && (
          <>
            <Button
              content={isReplyOpen ? "انصراف" : "جواب دادن"}
              textColor="primary"
              customStyle="border border-primary px-2 py-1.5 shrink-0"
              circle={false}
              color="bg-bg-main"
              onClick={toggleReply}
            />
            <button
              type="button"
              className="text-sm font-medium text-primary"
              onClick={() => setShowReplies((s) => !s)}
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
          {isLoading && <p className="text-sm text-text-muted">در حال بارگذاری...</p>}
          {!isLoading && replies.length === 0 && (
            <p className="text-sm text-text-muted">جوابی ثبت نشده.</p>
          )}
          {replies.map((r) => (
            <CommentRow key={r.id} {...r} courseId={courseId} parentId={id} />
          ))}
        </div>
      )}
    </div>
  );
};