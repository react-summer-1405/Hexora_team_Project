import InfoItem from "./InfoItem";

const InfoBox = ({ items }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-border">
      {items.map((item) => (
        <InfoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default InfoBox;