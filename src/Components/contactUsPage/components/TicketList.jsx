import { useEffect, useRef, useState } from "react";
import { User, Headphones, Send, Check } from "react-feather";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import Button from "../../common/Button";
import {
  useCloseTicket,
  useCreateTicket,
  useSendUserMessage,
  useTicketChatDetailUser,
} from "../../hooks/useTicket";
import CreateTicketModal from "./CreateTicketModal";
import {
  removeItem,
  setTypeItem,
} from "../../../core/localStorage/localStorage";
import toast from "react-hot-toast";

const formatTime = (date) => {
  if (!date) return "";

  return new DateObject({
    date: new Date(date),
    calendar: persian,
    locale: persian_fa,
  }).format("D MMMM - HH:mm");
};

const ticketStorageKey = "activeTicketId";

const TicketList = ({selectedTicketId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const [ticketId, setTicketId] = useState(
  () => selectedTicketId || localStorage.getItem(ticketStorageKey) || ""
);
  const [msg, setMsg] = useState("");
  const chatArea = useRef(null);

  const { mutate: createTicket, isPending: isCreating } = useCreateTicket();

  const { mutate: closeTicket, isPending: isClosing } = useCloseTicket();

  const {
    data: ticket,
    isLoading: isTicketLoading,
    isError: isTicketError,
 
  } = useTicketChatDetailUser(ticketId);



  const { mutate: sendMessage, isPending: isSending } = useSendUserMessage();

  const messages = ticket?.ticketMessages || [];
  const lastMessageId = messages[messages.length - 1]?.id;


useEffect(() => {
  if (selectedTicketId !== undefined) {
    setTicketId(selectedTicketId);
  }
}, [selectedTicketId]);

  useEffect(() => {
    const container = chatArea.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [lastMessageId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const text = msg.trim();

    if (!text || isSending || !ticketId || ticket?.isDone) return;

    sendMessage(
      { text, ticketId },
      {
        onSuccess: () => {
          setMsg("");
        },
      },
    );
  };

  const handleCreateTicket = (values) => {
    createTicket(values, {
      onSuccess: (data) => {
        const id = data?.id;

        if (!id) return;

        setTypeItem(ticketStorageKey, id);
        setTicketId(id);
        setIsModalOpen(false);
      },
    });
  };

  const handleCloseTicket = () => {
  closeTicket(ticketId, {
    onSuccess: () => {
      
      localStorage.removeItem("activeTicketId");

      setTicketId("");
      setMsg("");

      console.log("Storage:", localStorage.getItem(ticketStorageKey));
    },
  });
};


  if (ticketId && isTicketLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (ticketId && isTicketError) {
    return (
      <div className="rounded-lg border border-danger/30 bg-danger/10 p-4 text-center text-sm text-danger">
        دریافت اطلاعات چت ناموفق بود.
      </div>
    );
  }

  return (
    <>
      {!ticketId ? (
        <div className="flex flex-col items-start justify-start gap-4 bg-bg-dark rounded-[16px] p-8">
          <h3 className="text-lg font-semibold text-text-white">
            دنبال پاسخ سریع‌تری؟
          </h3>
          <p className="text-text-white text-right">
            برای پاسخ به سوالات خود با پشتیبان در ارتباط باشید
          </p>
          <Button
            content="ثبت تیکت جدید"
            color="bg-primary"
            textColor="text-white"
            onClick={() => {
              const token = localStorage.getItem("token");

              if (!token) {
                toast.error("ابتدا باید وارد حساب کاربری خود شوید");
                return;
              }
              setIsModalOpen(true);
            }}
          />
        </div>
      ) : (
        <div className=" flex   h-[500px] max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-bg-main shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex flex-col gap-2 items-start" dir="rtl">
              <h5 className="mb-0 text-base font-bold text-text-dark">
                {ticket.problem || "گفتگو با پشتیبان"}
              </h5>

              <div>
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                    ticket.isDone
                      ? "bg-danger/10 text-danger"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {ticket.isDone ? "تیکت بسته شده" : "تیکت فعال"}
                </span>
              </div>
            </div>

            {!ticket.isDone && (
              <Button
                content={<Check size={20} />}
                circle
                color="bg-success"
                textColor="text-white"
                textSize="text-xs"
                disabled={isClosing}
                onClick={handleCloseTicket}
                customStyle="p-2 hover:shadow-none hover:opacity-90 disabled:opacity-50"
              />
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div ref={chatArea} className="flex-1 overflow-y-auto p-3">
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex w-full items-end gap-2 ${
                      message.isSupport ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-2 ${
                        message.isSupport ? "" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          message.isSupport
                            ? "bg-primary text-text-white"
                            : "bg-bg-field text-text-muted"
                        }`}
                      >
                        {message.isSupport ? (
                          <Headphones size={17} />
                        ) : (
                          <User size={17} />
                        )}
                      </div>

                      <div
                        className={`max-w-[75%] min-w-[130px] rounded-xl border px-3 py-2 ${
                          message.isSupport
                            ? "border-primary bg-primary"
                            : "border-border bg-bg-field"
                        }`}
                      >
                        <p
                          dir="rtl"
                          className={`mb-1 break-words text-right text-[13px] font-normal leading-relaxed ${
                            message.isSupport ? "text-white" : "text-text-dark"
                          }`}
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {message.text}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                          <small
                            className={`text-[10px] ${
                              message.isSupport
                                ? "text-white/70"
                                : "text-text-muted"
                            }`}
                          >
                            {formatTime(message.insertDate)}
                          </small>

                          <small
                            className={`text-[10px] font-semibold ${
                              message.isSupport
                                ? "text-white"
                                : "text-text-muted"
                            }`}
                          >
                            {message.isSupport ? "پشتیبان" : "کاربر"}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {messages.length === 0 && (
                  <div className="p-4 text-center text-sm text-text-muted">
                    هنوز پیامی در این تیکت ثبت نشده است.
                  </div>
                )}
              </div>
            </div>

            {!ticket.isDone && (
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 border-t border-border p-3"
              >
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  disabled={isSending}
                  dir="rtl"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-bg-field px-3 py-2.5 text-sm text-text-dark outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <Button
                  type="submit"
                  disabled={!msg.trim() || isSending}
                  circle
                  color="bg-primary"
                  textColor="text-white"
                  customStyle="h-10 w-10 hover:shadow-none hover:bg-primary-hover disabled:opacity-50"
                  content={
                    isSending ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : (
                      <Send size={18} />
                    )
                  }
                />
              </form>
            )}
          </div>
        </div>
      )}

      <CreateTicketModal
        isOpen={isModalOpen && !ticketId}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
        isPending={isCreating}
      />
    </>
  );
};
export default TicketList;
