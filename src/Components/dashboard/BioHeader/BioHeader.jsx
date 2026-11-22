import { useProfile } from "../../../hooks/dashboard/userProfile";

export default function BioHeader() {
  const { data: profile } = useProfile();

  return (
    <div className="flex w-[424px]  flex-col justify-center p-6 text-right md:w-1/2">
      <p className="text-base font-medium text-text-dark">
        {profile?.userAbout || ""}
      </p>
    </div>
  );
}
