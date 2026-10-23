import Button from "../../../../common/Button";
import commentIcon from "../../../../../assets/icons/details/comment-add.svg";
import { CommentRow } from "./CommentRow";
import { useState } from "react";
import { useCommentActions } from "../../../../hooks/useCommentAction";
import CommentForm from "../../commentSection/components/CommentForm";

const CommentModal = ({ isOpen, onClose, courseTitle, courseId, comments = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const { addComment } = useCommentActions(courseId);

  const handleAdd = (values, resetForm) =>
    addComment.mutate(values, {
      onSuccess: () => {
        resetForm();
        setShowForm(false);
      },
    });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

      <div
        className={`w-212 h-163 rounded-[32px] z-50 bg-bg-main py-6 px-8 flex flex-col overflow-y-scroll items-start justify-start gap-4 origin-center transition-transform duration-300 ease-out ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3">
            <h5 className="text-2xl font-bold text-text-dark">
              نظرات دانشجو ها و اساتید
            </h5>
            <span className="text-lg font-bold text-text-muted">
              ( {courseTitle} )
            </span>
          </div>
          <button
            className="rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] 
        bg-no-repeat bg-[90%] bg-5 ps-9 transition-[border-color,text-color,scale]
         duration-200 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
            <>
      <Button
        content={showForm ? "انصراف" : "نظر شما"}
        color="bg-primary"
        icon={commentIcon}
        onClick={() => setShowForm((s) => !s)}
      />
      {showForm && <CommentForm onSubmit={handleAdd} isPending={addComment.isPending} />}

      {comments.length === 0 && (
        <p className="text-base font-medium text-text-muted">هنوز نظری ثبت نشده.</p>
      )}
      {comments.map((comment) => (
        <CommentRow key={comment.id} {...comment} courseId={courseId} />
      ))}
    </>
      </div>
    </div>
  );
};

export default CommentModal;
