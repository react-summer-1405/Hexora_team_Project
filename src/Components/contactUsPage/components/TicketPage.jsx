import { useState } from "react";
import TicketList from "./TicketList";
import TicketHistory from "./TicketHistory";
import { setTypeItem } from "../../../core/localStorage/localStorage";

const TicketPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

const [selectedTicketId, setSelectedTicketId] = useState(
  () => localStorage.getItem("activeTicketId") || ""
);

const handleSelectTicket = (id) => {
  setTypeItem("activeTicketId", id);
  setSelectedTicketId(id);
  setActiveTab("chat");
};

  return (
    <div className="w-full space-y-5">
      <div className="flex w-full gap-2 border-b border-border" dir="rtl">
        <button
          onClick={() => setActiveTab("chat")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition cursor-pointer ${
            activeTab === "chat"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted"
          }`}
        >
          گفتگو با پشتیبانی
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition cursor-pointer ${
            activeTab === "history"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted"
          }`}
        >
          تیکت‌های من
        </button>
      </div>

      {activeTab === "chat" ? (
        <TicketList selectedTicketId ={selectedTicketId }/>
      ) : (
        <TicketHistory onSelectTicket={handleSelectTicket} />
      )}
    </div>
  );
};

export default TicketPage;