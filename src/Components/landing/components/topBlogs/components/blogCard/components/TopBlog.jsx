import { useState } from "react";
import figmaLogo from "../../../../../../../assets/images/figma.png";
// import purpose1 from "./../../../../../../assets/images/purpose1.png";

const TopBlog = ({image}) => {
   const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  
  const showLogo = !image || isError || !isLoaded;
  const showImage = image && !isError;  

  return (
    <div className={` h-73 ${showLogo && "bg-[#FF6C6C]"}  rounded-4xl relative  overflow-hidden`}>
      <div className="h-full flex flex-col justify-center items-center">
 {showLogo && (
          <img
            src={figmaLogo}
            className="w-30 h-30 animate-bounce absolute"
          />
        )}

        {showImage && (
          <img
            src={image}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
            className={`w-full h-full object-cover  transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default TopBlog;
