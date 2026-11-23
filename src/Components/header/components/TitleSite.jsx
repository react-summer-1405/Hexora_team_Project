import text from "../../../assets/icons/Untitled-1.svg";
import title from "../../../assets/images/Title.png";
const TitleSite = () => {
  return (
    <div className="title flex flex-row items-center justify-center mx-2  ">
      <img src={text} className="w-10 h-10" />
      <img src={title} className="hidden lg:block w-47 h-10" />
    </div>
  );
};

export default TitleSite;
