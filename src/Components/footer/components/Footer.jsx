import Title from "../../header/components/TitleSite";
import MiddlePart from "./MiddlePart";
import SocialMedia from "./SocialMedia";


const Footer = () => {
  return (
    <footer className="
      mx-4 sm:mx-6 lg:mx-10
      px-2 sm:px-4 lg:px-10
      py-8 sm:py-10 lg:py-15
      border-t-2 border-border
      dark:text-white
      transition-colors duration-300
      flex flex-col sm:flex-row
      flex-wrap sm:flex-nowrap
      justify-between items-center
      gap-6 sm:gap-8 lg:gap-10
      text-center
    ">
      <div className="order-2 sm:order-1 w-full sm:w-auto">
        <Title />
      </div>

      <div className="order-1 sm:order-2 w-full sm:w-auto">
        <MiddlePart />
      </div>

      <div className="order-3 w-full sm:w-auto flex justify-center">
        <SocialMedia />
      </div>
    </footer>
  );
};



export default Footer;
