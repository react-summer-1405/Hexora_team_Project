
import Topic from "../../../../common/Topic";
import ServicesDivisions from "./ServicesDivisions";

const PresentServices = () => {

  return (
    <div className="flex flex-col items-center justify-center gap-15 ">
      <div className=" w-85 text-3xl font-bold text-center cursor-default ">
        <Topic content="خدماتی که ما در طی دوره‌ها
به شما ارائه میدیم"/>
      </div>
      <ServicesDivisions/>

    </div>
  );
};

export default PresentServices;
