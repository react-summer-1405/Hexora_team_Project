import { useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BookOpen, User } from "react-feather";
import HomeWorkModal from "./detailModals/homework/HomeWorkModal";
import StudentAPModal from "./detailModals/studentAP/StudentAPModal";
import Modal from "./Modal";

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
];

const ScheduleDetailModal = ({ isOpen, toggle, schedule, groups, userId }) => {
  const [homeWorkOpen, setHomeWorkOpen] = useState(false);
  const [studentAPOpen, setStudentAPOpen] = useState(false);

  const openers = {
    homeWork: () => setHomeWorkOpen(true),
    status: () => setStudentAPOpen(true),
  };

  const group = groups.find((g) => g.id === schedule?.courseGroupId);

  const info = schedule
    ? [
        { label: "گروه", value: group?.groupName ?? "-" },
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

        <h4 className="mb-3 text-sm font-bold text-text-dark">
          مدیریت جلسه
        </h4>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map(({ key, label, icon: Icon, className }) => (
            <button
              key={key}
              type="button"
              onClick={openers[key]}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border bg-transparent px-4 py-2.5 text-sm font-medium transition-colors ${className}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </Modal>

      <HomeWorkModal
        isOpen={homeWorkOpen}
        toggle={() => setHomeWorkOpen(false)}
        sessionId={schedule?.id}
        userId={userId}
      />

      <StudentAPModal
        isOpen={studentAPOpen}
        toggle={() => setStudentAPOpen(false)}
        sessionId={schedule?.id}
      />
    </>
  );
};

export default ScheduleDetailModal;