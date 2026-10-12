import AccountNum from "./AccountNum";
import HeroButton from "./HeroButton";
import HeroTitle from "./HeroTitle";


import RoadMap from "./RoadMap";

const HeroSection = () => {

  return (
  <div className="cursor-default flex flex-col gap-30">
    <div className="flex flex-log flex-wrap lg:flex-row justify-evenly items-center p-10 gap-12">
          <div className="lg:order-2">
        <HeroTitle />
      </div>  
      <div className="lg:order-1">
        <AccountNum />
      </div>

      <div className="lg:order-3">
        <HeroButton />
      </div>
    </div>
    <RoadMap />
  </div>
  );
};

export default HeroSection;
