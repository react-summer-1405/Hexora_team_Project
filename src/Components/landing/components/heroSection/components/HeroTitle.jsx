import CaptionOfTitle from "../../../../common/texts/CaptionOfTitle";
import Title from "../../../../common/texts/Title";

const HeroTitle = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Title content="آموزش مدرن پیشرفت سریع" />
      <CaptionOfTitle
        content="آکادمی آموزش تخصصی برنامه نویسی بحر
از کودکان تا بزرگسال"
      />
    </div>
  );
};

export default HeroTitle;
