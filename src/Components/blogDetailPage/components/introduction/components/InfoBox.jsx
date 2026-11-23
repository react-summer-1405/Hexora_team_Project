import InfoItem from "./InfoItem";

const InfoBox = ({ items, className = "" }) => {
  return (
    <div
      className={`info-box grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border   ${className}`}
    >
      {items.map((item) => (
        <InfoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default InfoBox;