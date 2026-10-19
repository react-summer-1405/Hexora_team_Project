import InfoItem from "./InfoItem";

const InfoBox = ({ items }) => {
  return (
    <div className="flex flex-row flex-nowrap justify-evenly overflow-hidden rounded-2xl border border-border">
      {items.map((item) => (
        <InfoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default InfoBox;