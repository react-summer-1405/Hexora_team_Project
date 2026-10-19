import Button from "../../../../common/Button";
import CommentBox from "./CommentBox";
import commentIcon from "../../../../../assets/icons/details/comment-add.svg";

const CommentSection = ({ comments = [], toggleComment }) => {
  return (
    <div className=" flex flex-col gap-6">
      <h3 className="text-[20px] font-bold text-text-muted self-start">
        نظرات دانشجو ها و اساتید
      </h3>
      <div className="flex flex-row flex-wrap items-start justify-start gap-4">
        <div
          v
          className="flex flex-col justify-center items-center gap-4 text-center bg-primary text-text-white w-81 h-70.5 rounded-[24px] transition duration-300 hover:-translate-y-1"
        >
          <img src={commentIcon} className="w-8 h-8" />
          <h6 className="text-lg font-semibold">نظر شما</h6>
          <button
            onClick={toggleComment}
            className="cursor-pointer text-sm font-medium text-white transition-all duration-300 hover:scale-115 "
          >
            برای نظر دادن کلیک کنید
          </button>
        </div>
        {comments.map((comment) => (
          <CommentBox key={comment.id} {...comment} />
        ))}
      </div>
      {comments.length === 0 && (
        <p className="self-center text-base font-medium text-text-muted">
          هنوز نظری ثبت نشده. اولین نفر باشید!
        </p>
      )}
      {comments.length > 0 && (
        <Button content="مشاهده بیشتر" customStyle="self-center" />
      )}
    </div>
  );
};

export default CommentSection;
