import Button from "../../../../common/Button";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import blackDislike from "../../../../../assets/icons/details/blackDislike.svg";

const CommentBox = ({
  title,
  text,
  authorName,
  authorImage,
  date,
  likes = 0,
  dislikes = 0,
  onLike,
  onDislike,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 items-start justify-between text-right w-81 h-70.5 rounded-[24px] bg-bg-light transition duration-300 hover:-translate-y-1">
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
            alt={authorName}
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
          <div className="flex flex-row items-center gap-1">
            <Button
              circle={true}
              color="bg-bg-main"
              icon={blackLike}
              customStyle="w-8 h-8"
              onClick={onLike}
            />
            <span className="text-base font-medium text-black">{likes}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Button
              circle={true}
              color="bg-bg-main"
              icon={blackDislike}
              customStyle="w-8 h-8"
              onClick={onDislike}
            />
            <span className="text-base font-medium text-black">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;