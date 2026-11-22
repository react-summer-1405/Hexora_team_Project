import { useQuery } from "@tanstack/react-query";
import Button from "../../../../common/Button";
import reload from "../../../../../assets/icons/Arrows_Reload.svg";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../assets/icons/details/whiteLike.svg";
import blackDislike from "../../../../../assets/icons/details/blackDislike.svg";
import whiteDislike from "../../../../../assets/icons/details/whiteDislike.svg";
import cancel from "../../../../../assets/icons/cancel-01.svg";
import pen from "../../../../../assets/icons/pen.svg";
import useToggle from "../../../../hooks/useToggle";
import CommentForm from "../../commentSection/components/CommentForm";
import { normalizeComment } from "../../commentSection/utils/commentUtils";
import { useCommentActions } from "../../../../hooks/useCommentActionCourse";
import { getCourseReplies } from "../../../../../core/services/courses/courseComments";
import accountIcon from "../../../../../assets/icons/account.svg";
import { useSelector } from "react-redux";

export const CommentRow = ({
  id,
  courseId,
  parentId = null,
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  dislikes = 0,
  isLiked,
  isDisliked,
  userId,
}) => {
  const isReply = !!parentId;
  const [isReplyOpen, toggleReply] = useToggle(false);
  const [showReplies, toggleReplies] = useToggle(false);

  const { like, dislike, addReply, editComment, deleteComment } =
    useCommentActions(courseId, parentId);
  const [isEditOpen, toggleEdit] = useToggle(false);

  const currentUserId = useSelector((state) => state.auth.userId);
  const isOwner = currentUserId !== null && currentUserId === userId;

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
          toggleReplies;
        },
      },
    );
  };

  const handleEdit = (values, resetForm) => {
    editComment.mutate(
      { commentId: id, ...values },
      {
        onSuccess: () => {
          resetForm();
          toggleEdit();
        },
      },
    );
  };

  return (
    <div className="flex  flex-col items-start justify-start gap-3 w-full">
      <div className="cursor-default flex flex-row gap-2 w-43.6 overflow-hidden">
        <img
          src={authorImage}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = accountIcon;
          }}
          className="w-10 h-10 rounded-full border shrink-0"
        />
        <div className="text-right flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold text-text-dark truncate">
            {authorName}
          </span>
          <span className="text-xs font-medium text-text-muted truncate">
            {date}
          </span>
        </div>
      </div>

      <div className="flex flex-col text-right text-text-dark">
        <span className="sm:text-lg text-sm  sm:font-bold font-semibold">
          {title}
        </span>
        <span className="sm:text-base text-xs sm:font-medium  whitespace-pre-line">
          {text}
        </span>
      </div>

      <div className="flex w-full flex-row items-center justify-between gap-5 p-2 ">
        <div className="flex justify-center items-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <Button
              circle
              color={isLiked ? "bg-primary" : "bg-bg-main"}
              icon={isLiked ? whiteLike : blackLike}
              customStyle="w-8 h-8"
              onClick={() =>
                !like.isPending &&
                like.mutate(id) &&
                console.log("commentId", id)
              }
            />
            <span className="text-base font-medium text-text-dark">
              {likes}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button
              circle
              color={isDisliked ? "bg-primary" : "bg-bg-main"}
              icon={isDisliked ? whiteDislike : blackDislike}
              customStyle="w-8 h-8"
              onClick={() => !dislike.isPending && dislike.mutate(id)}
            />
            <span className="text-base font-medium text-text-dark">
              {dislikes}
            </span>
          </div>
        </div>
        
          {isOwner && (
            <div className="flex flex-row justify-center gap-2">
              <Button
                circle
                icon={pen}
                customStyle="border border-primary p-1 shrink-0"
                color="bg-bg-main"
                onClick={toggleEdit}
              />

              <Button
                circle
                icon={cancel}
                customStyle="border border-danger p-1 shrink-0"
                color="bg-bg-main"
                disabled={deleteComment.isPending}
                onClick={() => deleteComment.mutate(id)}
              />
            </div>
          )}
        
        {!isReply && (
          <div className="flex justify-center gap-5">
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
          </div>
        )}
      </div>

      {isReplyOpen && (
        <CommentForm onSubmit={handleReply} isPending={addReply.isPending} />
      )}
      {isEditOpen && (
        <CommentForm
          onSubmit={handleEdit}
          isPending={editComment.isPending}
          initialValues={{ title, describe: text }}
        />
      )}

      {showReplies && !isReply && (
        <div className="w-full ps-8 flex flex-col gap-4 border-s border-border">
          {isLoading && (
            <div className="flex flex-row gap-1">
              <p className="text-sm text-text-muted">در حال بارگذاری</p>{" "}
              <img src={reload} className="w-6 h-6 animate-spin" />
            </div>
          )}
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
