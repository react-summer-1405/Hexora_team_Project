import React from "react";
import { useProfile } from "../../../hooks/dashboard/userProfile";

export default function BioHeader() {
  const { data: profile } = useProfile();

  return (
    <div className="flex w-full min-w-0 flex-col justify-center p-6 text-right lg:flex-1">
      <p className="break-words text-base font-medium text-text-dark">
        {profile?.userAbout ||
          "سلام  ، من پارسام اینم بیو پروفایلمه واقعا نمیدونم چی بنویسم خودتون بیایید منو بشناسید حال ندارم بخدا خستم"}
      </p>
    </div>
  );
}
