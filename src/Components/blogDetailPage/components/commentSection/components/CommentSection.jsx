import Button from "../../../../common/Button";
import CommentBox from "./CommentBox";
import commentIcon from "../../../../../assets/icons/details/comment-add.svg";
import useToggle from "../../../../hooks/useToggle";

const CommentSection = ({ comments = [], toggleComment }) => {
  
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className=" flex flex-col gap-6">
      <h3 className="text-[20px] font-bold text-text-muted self-start">
        نظرات دانشجو ها و اساتید
      </h3>
      <div
        className={`flex flex-row flex-wrap items-start md:justify-start justify-center gap-4 p-3 ${isOpen ? "h-max" : "h-75"}  overflow-hidden`}
      >
        <div
          onClick={toggleComment}
          
          className="group flex flex-col justify-center items-center gap-4 text-center cursor-pointer bg-primary text-text-white w-81 h-70.5 rounded-[24px] transition duration-300 hover:-translate-y-1"
        >
          <img src={commentIcon} className="w-8 h-8 group-hover:scale-115 transition-all duration-300" />
          <h6 className="text-lg text-white font-semibold group-hover:scale-120 transition-all duration-300">نظر شما</h6>
          <button
          
            className="cursor-pointer text-sm font-medium text-white transition-all duration-300 group-hover:scale-115 "
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
      {comments.length >=2 && (
        <Button
          content={isOpen ? "مشاهده کمتر" : "مشاهده بیشتر"}
          customStyle="self-center"
          onClick={toggle}
        />
      )}
    </div>
  );
};

export default CommentSection;
