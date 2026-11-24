import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../../Modal";
import { sendStudent_AP } from "../../../../../core/services/dashboard/mySchedule/schedule";

const StudentAPModal = ({ toggle, isOpen, sessionId }) => {
  const [present, setPresent] = useState(true);
  const [studentHand, setStudentHand] = useState(false);
  const [absentReason, setAbsentReason] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setPresent(true);
    setStudentHand(false);
    setAbsentReason("");
  }, [isOpen]);

  const { mutate: absentOrPresent, isPending } = useMutation({
    mutationFn: sendStudent_AP,
    onSuccess: (data) => {
      toast.success(data?.message ?? "وضعیت جلسه تغییر کرد");
      toggle();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "تغییر وضعیت جلسه ناموفق بود");
    },
  });

  const isInvalid = !sessionId || (!present && !absentReason.trim());

  const handleClose = () => {
    if (isPending) return;
    toggle();
  };

  const handleSubmit = () => {
    if (isPending || isInvalid) return;

    absentOrPresent({
      sessionId,
      present,
      studentHand,
      absentReason: present ? null : absentReason.trim(),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="حضور و غیاب"
      footer={
        <>
          <button
            type="button"
            disabled={isPending}
            onClick={handleClose}
            className="cursor-pointer rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-bg-field disabled:cursor-not-allowed disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || isInvalid}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                <span>در حال ارسال...</span>
              </>
            ) : (
              "ثبت"
            )}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
          <span className="text-sm font-medium text-text-dark">
            {present ? "حاضر" : "غایب"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={present}
            aria-label="وضعیت حضور"
            disabled={isPending}
            onClick={() => setPresent((prev) => !prev)}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              present ? "bg-emerald-500" : "bg-disabled"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                present ? "right-0.5" : "right-[22px]"
              }`}
            ></span>
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
          <span className="text-sm font-medium text-text-dark">
            دست بلند کرده
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={studentHand}
            aria-label="دست بلند کرده"
            disabled={isPending}
            onClick={() => setStudentHand((prev) => !prev)}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              studentHand ? "bg-emerald-500" : "bg-disabled"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                studentHand ? "right-0.5" : "right-[22px]"
              }`}
            ></span>
          </button>
        </div>

        {!present && (
          <div>
            <label
              htmlFor="absentReason"
              className="mb-1.5 block text-sm font-medium text-text-dark"
            >
              دلیل غیبت
            </label>
            <textarea
              id="absentReason"
              rows="3"
              value={absentReason}
              onChange={(e) => setAbsentReason(e.target.value)}
              disabled={isPending}
              className="w-full resize-none rounded-lg border border-border bg-bg-field px-3 py-2 text-sm text-text-dark outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            ></textarea>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StudentAPModal;