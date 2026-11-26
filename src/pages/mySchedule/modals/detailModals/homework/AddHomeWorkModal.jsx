import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../../Modal";
import UploadFile from "./UploadFile";
import { addHomeWork } from "../../../../../core/services/dashboard/mySchedule/schedule";

const homeWorkKey = ["session-allHomeWork"];

const AddHomeWorkModal = ({ isOpen, toggle, homeWorkId, courseStudentId }) => {
  const queryClient = useQueryClient();
  const [started, setStarted] = useState(false);
  const [courseUserHomeWorkId, setCourseUserHomeWorkId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStarted(false);
      setCourseUserHomeWorkId(null);
    }
  }, [isOpen]);
  const { mutate: startHomeWork, isPending } = useMutation({
    mutationFn: addHomeWork,
    onSuccess: (data) => {
      if (!data?.id) {
        toast.error("شناسه‌ی تحویل تکلیف دریافت نشد");
        return;
      }
      toast.success(data?.message ?? "تحویل تکلیف آغاز شد");
      queryClient.invalidateQueries({ queryKey: homeWorkKey });
      setCourseUserHomeWorkId(data.id);
      setStarted(true);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "شروع تحویل تکلیف ناموفق بود",
      );
    },
  });

  const handleClose = () => {
    if (isPending) return;
    toggle();
  };

  const handleStart = () => {
    if (isPending || !homeWorkId || !courseStudentId) return;

    startHomeWork({ hwid: homeWorkId, cstudentId: courseStudentId });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="افزودن تکلیف"
      footer={
        <>
          <button
            type="button"
            disabled={isPending}
            onClick={handleClose}
            className="cursor-pointer rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-bg-field disabled:cursor-not-allowed disabled:opacity-50"
          >
            {started ? "بستن" : "انصراف"}
          </button>

          {!started && (
            <button
              type="button"
              onClick={handleStart}
              disabled={isPending || !homeWorkId || !courseStudentId}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  <span>در حال ارسال...</span>
                </>
              ) : (
                "شروع تحویل"
              )}
            </button>
          )}
        </>
      }
    >
      {started ? (
        <UploadFile
          courseUserHomeWorkId={courseUserHomeWorkId}
          onUploaded={toggle}
        />
      ) : (
        <span className="text-sm text-text-dark">
          برای ارسال فایل تکلیف، ابتدا «شروع تحویل» را بزنید.
        </span>
      )}
    </Modal>
  );
};

export default AddHomeWorkModal;
