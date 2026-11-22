import WelcomeHeader from "../../Components/dashboard/welcomeHeader/welcomeHeader";
import BioHeader from "../../Components/dashboard/BioHeader/BioHeader";
import MyCourses from "../../Components/dashboard/MyCourses/MyCourses";
import ProfileStatus from "../../Components/dashboard/ProfileStatus/ProfileStatus";
import MyReserves from "../../Components/dashboard/MyReserves/MyReserves";
import MyComments from "../../Components/dashboard/MyComments/MyComments";

export default function DashboardPage() {
  return (
    <div className="w-full min-w-0 p-4">
      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row">
        <WelcomeHeader />
        <BioHeader />
      </div>

      <div className="w-full min-w-0">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row">
          <MyCourses />
          <ProfileStatus />
        </div>
      </div>

      <div className="w-full min-w-0">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row">
          <MyReserves />
          <MyComments />
        </div>
      </div>
    </div>
  );
}
