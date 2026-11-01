import React from "react";
import WelcomeHeader from "../../Components/dashboard/welcomeHeader/welcomeHeader";
import BioHeader from "../../Components/dashboard/BioHeader/BioHeader";
import MyCourses from "../../Components/dashboard/MyCourses/MyCourses";
import ProfileStatus from "../../Components/dashboard/ProfileStatus/ProfileStatus";
import MyReserves from "../../Components/dashboard/MyReserves/MyReserves";
import MyComments from "../../Components/dashboard/MyComments/MyComments";

export default function DashboardPage() {
  return (
    <div className="w-full p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <WelcomeHeader />

        <BioHeader />
      </div>
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <MyCourses />
          <ProfileStatus />
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <MyReserves />
          <MyComments />
        </div>
      </div>
    </div>
  );
}
