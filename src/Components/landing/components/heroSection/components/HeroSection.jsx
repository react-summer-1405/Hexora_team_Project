import AccountNum from "./AccountNum";
import HeroButton from "./HeroButton";
import HeroTitle from "./HeroTitle";


import RoadMap from "./RoadMap";

const HeroSection = () => {

  return (
    <div className="flex flex-col  gap-30">
    <div className="flex flex-row justify-between items-center p-10">
      <AccountNum />
      <HeroTitle />
      <HeroButton />
    </div>
<RoadMap/>
    </div>
  );
};

export default HeroSection;
