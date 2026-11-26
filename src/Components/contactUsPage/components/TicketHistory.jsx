import {  MessageSquare, Clock } from "react-feather";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button from "../../common/Button";
import eye from "../../../assets/icons/eye.svg"
import { useMyAllTickets } from "../../hooks/useTicket";


const formatDate = (date) => {
  if (!date) return "-";

  return new DateObject({
    date: new Date(date),
    calendar: persian,
    locale: persian_fa,
  }).format("D MMMM YYYY - HH:mm");
};

const TicketHistory = ({ onSelectTicket }) => {
  const {
    data: tickets,
    isLoading,
    isError,
  } = useMyAllTickets();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-lg bg-danger/10 p-4 text-center text-sm text-danger">
        دریافت لیست تیکت‌ها ناموفق بود.
      </p>
    );
  }

  if (!tickets?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-bg-main p-10">
        <MessageSquare size={35} className="text-text-muted" />
        <p className="text-sm text-text-muted">
          هنوز هیچ تیکتی ثبت نکرده‌اید.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4" dir="rtl">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-text-dark">
          تیکت‌های من
        </h3>

        <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs text-primary">
          {tickets.length} تیکت
        </span>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex  flex-col gap-4 rounded-xl border border-border bg-bg-main p-4 transition hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-text-dark">
                  {ticket.problem || "بدون عنوان"}
                </h4>

                <span
                  className={`rounded-md px-2 py-1 text-xs font-medium ${
                    ticket.isDone
                      ? "bg-danger/10 text-danger"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {ticket.isDone ? "بسته شده" : "فعال"}
                </span>
              </div>

              <p className="line-clamp-2 break-words text-sm text-text-muted">
                {ticket.describe || "بدون توضیحات"}
              </p>

              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Clock size={14} />
                <span>{formatDate(ticket.insetDate)}</span>
              </div>
            </div>

            <Button
              content="مشاهده گفتگو"
              icon={eye}
              color="bg-primary"
              textColor="text-text-white"
              textSize="text-xs"
              customStyle="px-3 py-2 hover:shadow-none hover:opacity-90 shrink-0"
              onClick={() => onSelectTicket(ticket.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketHistory;