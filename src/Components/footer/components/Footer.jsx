import Title from "../../header/components/TitleSite";
import MiddlePart from "./MiddlePart";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <div className="  px-10 py-15 mx-10  border-t-2 border-border  dark:text-white  transition-colors duration-300 flex flex-row flex-wrap sm:flex-nowrap justify-between items-center gap-10">
      <div className="order-2 sm:order-1">
        <Title />
      </div>
      <div className="order-1 sm:order-2">
        <MiddlePart />
      </div>
      <div className="order-3">
        
        <SocialMedia />
      </div>
    </div>
  );
};

export default Footer;
