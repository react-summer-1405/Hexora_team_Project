import InfoBox from "./InfoBox";
import PointAndPrice from "./PointAndPrice";
import ButtonsHandler from "./ButtonsHandler";
import Description from "./Description";
const Introduction = () => {
  const itemsRow1 = [
    { id: 1, label: "وضعیت", value: "درحال برگزاری", variant: "danger" },
    { id: 2, label: "مدت دوره", value: "۱۲ ساعت", variant: "primary" },
    { id: 3, label: "مدرس", value: "علی رضایی", variant: "purple" },
    { id: 4, label: "ظرفیت", value: "۲۰ نفر" },
  ];

  const itemsRow2 = [
    { id: 1, label: "وضعیت", value: "درحال برگزاری" },
    { id: 2, label: "مدت دوره", value: "۱۲ ساعت" },
    { id: 3, label: "مدرس", value: "علی رضایی" },
    { id: 4, label: "ظرفیت", value: "۲۰ نفر" },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-8 ">
        <img src="" className="rounded-[32px] h-106 w-[45%] " />
        <div className="w-[47%] flex flex-col gap-6 items-start">
          <h3 className="text-[32px] font-bold text-text-dark text-right">
            دوره جاوااسکریپت
          </h3>
          <div className="flex flex-col gap-4 w-full">
            <InfoBox items={itemsRow1} />
            <InfoBox items={itemsRow2} />
          </div>
          <PointAndPrice />
          <ButtonsHandler />
        </div>
      </div>
      <Description/>

    </div>
  );
};

export default Introduction;
