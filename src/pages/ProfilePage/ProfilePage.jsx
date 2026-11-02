import React, { useState } from "react";
import AccountInfo from "../../Components/dashboard/Profile/AccountInfo";
import ProfilePhotos from "../../Components/dashboard/Profile/ProfilePhotos";
import ProfileLocation from "../../Components/dashboard/Profile/ProfileLocation";
import ProfileLinks from "../../Components/dashboard/Profile/ProfileLinks";
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  
  const tabs = [
    { id: "account", label: "اطلاعات حساب کاربری" },
    { id: "photos", label: "عکس ها" },
    { id: "location", label: "محل سکونت" },
    { id: "links", label: "لینک ها" },
  ];

  return (
    <div
      className="flex w-full flex-col gap-8 rounded-[24px] h-full p-6 lg:flex-row"
      dir="rtl"
    >
      <div className="flex flex-col lg:w-[248px] shrink-0 lg:border-l lg:border-gray-200 lg:pl-6">
        <h2 className="mb-6 text-[24px] font-[800] text-[#2f2f2d]">
          پروفایل من
        </h2>

        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-[48px] w-[192px] shrink-0 items-center justify-center rounded-[48px] transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#f1f1f1] text-[18px] font-semibold text-blue-500"
                  : "bg-[#fcfcfc] text-[16px] font-semibold text-text-muted hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex-1 lg:pr-4">
        {activeTab === "account" && <AccountInfo />}

        {activeTab === "photos" && <ProfilePhotos />}

        {activeTab === "location" && <ProfileLocation />}

        {activeTab === "links" && <ProfileLinks />}
      </div>
    </div>
  );
}
