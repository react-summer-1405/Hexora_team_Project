import { useState } from "react";
import reactLogo from "../../../../../../../assets/images/react.png";
import purpose1 from "../../../../../../../assets/images/purpose1.png";
const TopCard = ({ levelName, subject , image }) => {
  const [isError, setIsError] = useState(false);
  return (
    <div className="relative h-73 bg-[#87DFFF] rounded-4xl">
      <div className="h-full flex flex-col justify-center items-center">
        <img
          src={!isError && image ? image : reactLogo}
          className={`${isError || !image ? "w-30 h-30 animate-bounce" : "w-full h-full object-contain"}`}
          onError={(e) => {
            e.currentTarget.onerror = null
            setIsError(true);
          }}
        />
      </div>
      <div className="absolute flex flex-row gap-2 top-2 right-4">
        <span className="text-[14px] font-medium text-text-white bg-badge-purple rounded-4xl px-2 py-0.5">
          {levelName}
        </span>
        <span className="text-[14px] font-medium text-text-white bg-primary rounded-4xl px-2 py-0.5">
          {subject}
        </span>
      </div>
    </div>
  );
};

export default TopCard;
