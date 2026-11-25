import WelcomeHeader from "../../Components/dashboard/welcomeHeader/welcomeHeader";
import BioHeader from "../../Components/dashboard/BioHeader/BioHeader";
import MyCourses from "../../Components/dashboard/MyCourses/MyCourses";
import ProfileStatus from "../../Components/dashboard/ProfileStatus/ProfileStatus";
import MyReserves from "../../Components/dashboard/MyReserves/MyReserves";
import MyComments from "../../Components/dashboard/MyComments/MyComments";

export default function DashboardPage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden p-4">
      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <WelcomeHeader />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <BioHeader />
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <MyCourses />
        </div>
        <div className="flex min-w-0 flex-col lg:w-[340px] lg:shrink-0">
          <ProfileStatus />
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <MyReserves />
        </div>
        <div className="flex min-w-0 flex-col lg:w-[392px] lg:shrink-0">
          <MyComments />
        </div>
      </div>
    </div>
  );
}
