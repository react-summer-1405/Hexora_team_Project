import { useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BookOpen, Paperclip, User } from "react-feather";
import HomeWorkModal from "./detailModals/homework/HomeWorkModal";
import StudentAPModal from "./detailModals/studentAP/StudentAPModal";
import Modal from "./Modal";
import { getSessionFileAndGroup } from "../../../core/services/dashboard/mySchedule/schedule";
import { useQuery } from "@tanstack/react-query";
import FilesModal from "./detailModals/fileModal/FilesModal";

const formatJalali = (value) =>
  value
    ? new DateObject({ date: value.slice(0, 10), format: "YYYY-MM-DD" })
        .convert(persian, persian_fa)
        .format("dddd D MMMM YYYY")
    : "-";

const actions = [
  {
    key: "homeWork",
    label: "بارگذاری تکالیف",
    icon: BookOpen,
    className:
      "border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white",
  },
  {
    key: "status",
    label: "وضعیت حضور و غیاب دانشجو",
    icon: User,
    className: "border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white",
  },
    {
    key: "files",
    label: "فایل‌های جلسه",
    icon: Paperclip,
    className:
      "border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white",
  },
];

const ScheduleDetailModal = ({ isOpen, toggle, schedule, userId }) => {
  const [homeWorkOpen, setHomeWorkOpen] = useState(false);
  const [fileOpen,setFileOpen ] = useState(false);
  const [studentAPOpen, setStudentAPOpen] = useState(false);

  const openers = {
    homeWork: () => setHomeWorkOpen(true),
    files: ()=> setFileOpen(true),
    status: () => setStudentAPOpen(true),
  };

  const sessionId = schedule?.id

    const { data:detail = {} , isLoading:isDetailLoading } = useQuery({
    queryKey: ["course-groups-files",sessionId],
    queryFn: ()=>getSessionFileAndGroup(sessionId),
  });


  const info = schedule
    ? [
        { label: "گروه", value: detail.sessionTitle ?? "-" },
        { label: "تاریخ", value: formatJalali(schedule.startDate) },
        { label: "ساعت شروع", value: schedule.startTime },
        { label: "ساعت پایان", value: schedule.endTime },
      ]
    : [];

  return (
    <>
      <Modal isOpen={isOpen} onClose={toggle} title="جزئیات جلسه" size="lg">
        {schedule && (
          <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl bg-bg-field p-4 sm:grid-cols-2">
            {info.map((item) => (
              <div key={item.label}>
                <span className="block text-xs text-text-muted">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm font-semibold text-text-dark">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <h4 className="mb-6 text-sm font-bold text-text-dark">
          مدیریت جلسه
        </h4>

<div className="flex flex-col  md:flex-row justify-between">
          {actions.map(({ key, label, icon: Icon, className }) => (
            <button
              key={key}
              type="button"
              onClick={openers[key]}
              className={` flex cursor-pointer  items-center justify-center gap-2 rounded-lg border bg-transparent px-4 py-2.5 text-sm font-medium transition-colors ${className}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </Modal>

      <FilesModal
       isOpen={fileOpen}
        toggle={() => setFileOpen(false)}
        files = {detail?.sessionFileDtos}
        isLoading = {isDetailLoading}
      />

      <HomeWorkModal
        isOpen={homeWorkOpen}
        toggle={() => setHomeWorkOpen(false)}
        sessionId={sessionId}
        userId={userId}
      />

      <StudentAPModal
        isOpen={studentAPOpen}
        toggle={() => setStudentAPOpen(false)}
        sessionId={sessionId}
      />
    </>
  );
};

export default ScheduleDetailModal;