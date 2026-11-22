import Button from "../../../../common/Button";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../assets/icons/details/whiteLike.svg";
import { useCommentActionBlog } from "../../../../hooks/useCommentActionBlog";
import accountIcon from "../../../../../assets/icons/account.svg";

const CommentBox = ({
  id,
  blogId,
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  isLiked = false,
  likeId = null,
}) => {
  const { like } = useCommentActionBlog(blogId);

  const handleLike = () => {
    if (like.isPending) return;

    like.mutate({
      commentId: id,
      wasLiked: isLiked,
      commentLikeId: likeId,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 items-start justify-between text-right w-81 h-70.5 rounded-[24px] bg-bg-light transition duration-300 hover:-translate-y-1 overflow-hidden text-ellipsis">
      <div>
        <h6 className="cursor-default text-lg font-bold text-text-dark">
          {title}
        </h6>
        <p className="cursor-default text-base font-medium text-text-muted">
          {text}
        </p>
      </div>

      <div className="w-full flex flex-row justify-between">
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

        <div className="flex flex-row items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
