import CaptionOfTitle from "../../../../common/texts/CaptionOfTitle";
import Title from "../../../../common/texts/Title";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Title content="اطلاعات بیشتر ، درک بهتر" />
      <CaptionOfTitle content="ما در بلاگ ها اطلاعات شما رو نسبت به تکنولوژی ای که یاد میگیرید بیشتر میکنیم" />
    </div>
  );
};

export default HeroSection;
