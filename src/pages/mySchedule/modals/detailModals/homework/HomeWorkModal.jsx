import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Upload } from "react-feather";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Modal from "../../Modal";
import AddHomeWorkModal from "./AddHomeWorkModal";
import { getSessionHomeWork } from "../../../../../core/services/dashboard/mySchedule/schedule";

const homeWorkKey = ["session-allHomeWork"];

const formatJalali = (value) =>
  value
    ? new DateObject({ date: value.slice(0, 10), format: "YYYY-MM-DD" })
        .convert(persian, persian_fa)
        .format("D MMMM YYYY")
    : "-";

const HomeWorkModal = ({ isOpen, toggle, sessionId }) => {
  const [addOpen, setAddOpen] = useState(false);
  const [homeWorkId, setHomeWorkId] = useState(null);
  const [courseStudentId, setCourseStudentId] = useState(null);

  const {
    data: allHomeWork = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...homeWorkKey],
    queryFn: getSessionHomeWork,
    enabled: isOpen && Boolean(sessionId),
  });

  
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={toggle}
        title={`تکالیف جلسه (${allHomeWork.length})`}
        size="lg"
        footer={
          <button
            type="button"
            onClick={toggle}
            className="cursor-pointer rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-bg-field"
          >
            بستن
          </button>
        }
      >
        {isLoading && (
          <div className="flex justify-center py-6">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            دریافت تکالیف ناموفق بود.
          </div>
        )}

        {!isLoading && !isError && allHomeWork.length === 0 && (
          <div className="py-8 text-center text-sm text-text-muted">
            تکلیفی برای این جلسه ثبت نشده.
          </div>
        )}

        <div className="space-y-3">
          {allHomeWork.map((homeWork) => (
            <div
              key={homeWork.homeWorkId}
              className="rounded-xl border border-border p-4"
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-12">
                <div className="col-span-2 md:col-span-3">
                  <span className="block text-xs text-text-muted">
                    عنوان
                  </span>
                  <span className="mt-1 block break-words text-sm font-semibold text-text-dark">
                    {homeWork.hwTitle}
                  </span>
                </div>

                <div className="col-span-2 md:col-span-4">
                  <span className="block text-xs text-text-muted">
                    توضیحات
                  </span>
                  <span className="mt-1 block break-words text-sm text-text-dark">
                    {homeWork.hwDescribe || "-"}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <span className="block text-xs text-text-muted">
                    گروه
                  </span>
                  <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {homeWork.groupName ?? "-"}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-3">
                  <span className="block text-xs text-text-muted">
                    تاریخ
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-sm text-text-dark">
                    {formatJalali(homeWork.homeWorkDate)}
                  </span>
                </div>

                <div className="col-span-2 md:col-span-12">
                  <button
                    type="button"
                    onClick={() => {
                      setHomeWorkId(homeWork.homeWorkId);
                      setCourseStudentId(homeWork.courseStudentId);
                      setAddOpen(true);
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                  >
                    <Upload size={14} />
                    <span>بارگذاری تکلیف</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <AddHomeWorkModal
        isOpen={addOpen}
        toggle={() => setAddOpen(false)}
        homeWorkId={homeWorkId}
        courseStudentId={courseStudentId}
      />
    </>
  );
};

export default HomeWorkModal;