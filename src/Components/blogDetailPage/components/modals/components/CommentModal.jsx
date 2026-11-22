import Button from "../../../../common/Button";
import commentIcon from "../../../../../assets/icons/details/comment-add.svg";
import { CommentRow } from "./CommentRow";
import { useState } from "react";
import CommentForm from "../../commentSection/components/CommentForm";
import { useCommentActionBlog } from "../../../../hooks/useCommentActionBlog";
import { useSelector } from "react-redux";

const CommentModal = ({ isOpen, onClose, blogTitle, blogId, comments = [] }) => {
  const [showForm, setShowForm] = useState(false);
    const [isOpenSticker, toggle] = useState(false);

  const { addComment } = useCommentActionBlog(blogId);


    const userId = useSelector((state) => state.auth.userId);

  const handleAdd = (values, resetForm) =>   
    addComment.mutate({...values,userId}, {
      onSuccess: () => {
        resetForm();
        setShowForm(false);
      },
    }
  
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div onClick={()=> {onClose();
              toggle(false)
            }} className="absolute inset-0 bg-black/40"></div>

      <div
        className={`relative w-full max-w-212 h-full max-h-163 rounded-3xl md:rounded-[32px] z-50 bg-bg-main
        px-4 py-4 md:px-8 md:py-6 flex flex-col overflow-y-auto items-start justify-start gap-4
        origin-center transition-transform duration-300 ease-out ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-full flex flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-col md:flex-row md:gap-3">
            <h5 className="text-lg md:text-2xl font-bold text-text-dark">
              نظرات دانشجو ها و اساتید
            </h5>
            <span className="sm:block hidden text-sm md:text-lg font-bold text-text-muted">
              ( {blogTitle} )
            </span>
          </div>
          <button
            className="shrink-0 rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)]
            bg-no-repeat bg-[90%] bg-5 ps-9 transition-[border-color,text-color,scale]
            duration-200 cursor-pointer text-base md:text-lg font-medium py-1.5 px-4 active:scale-85"
            onClick={()=> {onClose();
              toggle(false)
            }}
          >
            بستن
          </button>
        </div>

        <div
          className="w-full flex flex-col items-start gap-4
          max-md:order-last max-md:sticky max-md:bottom-0 max-md:z-10 max-md:mt-auto
          max-md:flex-col-reverse max-md:items-stretch
          max-md:-mx-4 max-md:-mb-4 max-md:w-[calc(100%+2rem)]
          max-md:bg-bg-main max-md:px-4 max-md:pt-3 max-md:pb-4
          max-md:shadow-[0_-8px_16px_rgba(0,0,0,0.08)]"
        >
          <Button
            content={showForm ? "انصراف" : "نظر شما"}
            color="bg-primary "
            customStyle="mx-auto md:mx-0 px-20 md:px-5"
            icon={commentIcon}
            onClick={() => setShowForm((s) => !s)}
          />

          {showForm && (
            <div className="w-full max-md:max-h-[50vh] max-md:overflow-y-auto">
              <CommentForm onSubmit={handleAdd} isPending={addComment.isPending} isOpenSticker={isOpenSticker} toggle={toggle} />
            </div>
          )}
        </div>

        {comments.length === 0 && (
          <p className="text-base font-medium text-text-muted">هنوز نظری ثبت نشده.</p>
        )}

        {comments.map((comment) => (
          <CommentRow key={comment.id} {...comment} blogId={blogId} />
        ))}
      </div>
    </div>
  );
};

export default CommentModal;