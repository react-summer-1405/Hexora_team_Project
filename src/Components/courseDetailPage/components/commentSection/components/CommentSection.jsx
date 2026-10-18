import Button from "../../../../common/Button";
import CommentBox from "./CommentBox";
import commentIcon from '../../../../../assets/icons/details/comment-add.svg'


const CommentSection = () => {
    const comments = [
  {
    id: 1,
    title: "خوب بود بد نبود",
    text: "واقعا عالی بود. هم استادش و هم کلاس ها منظم برگزار شدن و اصلا از مباحث عقب نموندم و تونستم به مقدار ثابتی پیشرفت کنم توی کدنویسی جاوا اسکریپت. ممنون از آکادمی بحر که این دوره رو گذاشتن",
    authorName: "امیرحسین سهرابی",
    authorImage: "",
    date: "29 اردیبهشت 1403",
    likes: 2,
    dislikes: 2,
  },
  {
    id: 2,
    title: "دوره کاربردی",
    text: "مطالب کاربردی و به‌روز بود و پشتیبانی خوبی داشت.",
    authorName: "مریم احمدی",
    authorImage: "",
    date: "3 خرداد 1403",
    likes: 5,
    dislikes: 0,
  },
];
  return (
    <div className=" flex flex-col gap-6">
    <h3 className="text-[20px] font-bold text-text-muted self-start">نظرات دانشجو ها و اساتید</h3>
    <div className="flex flex-row flex-wrap items-start justify-start gap-4">
        <div className="flex flex-col justify-center items-center gap-4 text-center bg-primary text-text-white w-81 h-70.5 rounded-[24px] transition duration-300 hover:-translate-y-1">
            <img src={commentIcon} className="w-8 h-8"  />
            <h6 className="text-lg font-semibold">نظر شما</h6>
            <button className="cursor-pointer text-sm font-medium text-white transition-all duration-300 hover:scale-115 ">برای نظر دادن کلیک کنید</button>
        </div>
      {comments.map((comment) => (
        <CommentBox key={comment.id} {...comment} />
      ))}
    </div>
    
    <Button content="مشاهده بیشتر"  customStyle="self-center"/>
    </div>
  );
};

export default CommentSection;
