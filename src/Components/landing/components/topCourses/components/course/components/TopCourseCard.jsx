import { useState } from "react";
import reactLogo from "../../../../../../../assets/images/react.png";
const TopCard = ({ levelName, subject , image }) => {
   const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const showLogo = !image || isError || !isLoaded;
  const showImage = image && !isError;
  return (
    <div className="relative h-73 bg-[#87DFFF] rounded-4xl">
      <div className="h-full flex flex-col justify-center items-center">
 {showLogo && (
          <img
            src={reactLogo}
            className="w-30 h-30 animate-bounce absolute"
          />
        )}

        {showImage && (
          <img
            src={image}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
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
