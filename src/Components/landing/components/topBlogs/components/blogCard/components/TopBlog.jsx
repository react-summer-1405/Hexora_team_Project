import { useState } from "react";
import figmaLogo from "../../../../../../../assets/images/figma.png";
// import purpose1 from "./../../../../../../assets/images/purpose1.png";

const TopBlog = ({image}) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className=" h-73 bg-[#FF6C6C] rounded-4xl">
      <div className="h-full flex flex-col justify-center items-center">
        <img
          src={!isError && image ? image : figmaLogo}
          className={`${isError || !image ? "w-30 h-30 animate-bounce" : "w-full h-full object-contain"}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            setIsError(true);
          }}
        />
      </div>  
    </div>
  );
};

export default TopBlog;
