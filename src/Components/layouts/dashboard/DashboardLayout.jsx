import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../dashboard/sidebar/sidebar.jsx";
import Header from "../../dashboard/Header/Header.jsx";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex bg-bg-dark overflow-hidden"
    >
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="flex flex-1 flex-col overflow-y-auto">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 bg-white rounded-[30px] p-4 md:p-8 m-4 md:m-6 mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
