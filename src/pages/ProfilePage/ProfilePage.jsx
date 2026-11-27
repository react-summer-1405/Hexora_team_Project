import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AccountInfo from "../../Components/dashboard/Profile/AccountInfo";
import ProfilePhotos from "../../Components/dashboard/Profile/ProfilePhotos";
import ProfileLocation from "../../Components/dashboard/Profile/ProfileLocation";
import ProfileLinks from "../../Components/dashboard/Profile/ProfileLinks";
import ChangePassword from "../../Components/dashboard/Profile/ChangePassword";
import SecurityInfo from "../../Components/dashboard/Profile/SecurityInfo";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const contentRef = useRef(null);

  const tabs = [
    { id: "account", label: "اطلاعات حساب کاربری" },
    { id: "password", label: "تغییر رمز حساب" },
    { id: "security", label: "اطلاعات امنیتی" },
    { id: "photos", label: "عکس ها" },
    { id: "location", label: "محل سکونت" },
    { id: "links", label: "لینک ها" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    },
    { scope: contentRef, dependencies: [activeTab], revertOnUpdate: true },
  );

  return (
    <div
      className="flex h-full w-full flex-col gap-8 rounded-[24px] p-6 lg:flex-row"
      dir="rtl"
    >
      <div className="flex shrink-0 flex-col lg:w-[248px] lg:border-l lg:border-border lg:pl-6">
        <h2 className="mb-6 text-[24px] font-[800] text-text-dark">
          پروفایل من
        </h2>

        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-[48px] w-[192px] shrink-0 cursor-pointer items-center justify-center rounded-[48px] transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-bg-field text-[18px] font-semibold text-primary dark:bg-border"
                  : "bg-bg-main text-[16px] font-semibold text-text-muted hover:bg-bg-field"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="w-full flex-1 lg:pr-4">
        {activeTab === "account" && <AccountInfo />}

        {activeTab === "password" && <ChangePassword />}

        {activeTab === "security" && <SecurityInfo/>}

        {activeTab === "photos" && <ProfilePhotos />}

        {activeTab === "location" && <ProfileLocation />}

        {activeTab === "links" && <ProfileLinks />}
      </div>
    </div>
  );
}