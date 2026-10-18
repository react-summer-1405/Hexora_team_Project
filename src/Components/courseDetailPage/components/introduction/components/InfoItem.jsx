
const InfoItem = ({ label, value, variant }) => {
    const badgeStyles = {
  danger: "bg-danger text-text-white",
  primary: "bg-primary text-text-white",
  purple:"bg-badge-purple text-text-white"
};
  return (
    <div className="flex flex-col items-start justify-center gap-3 py-4 px-8 border-l border-border last:border-l-0">
      <span className="text-text-muted text-sm font-medium">{label}</span>

      {variant ? (
        <span
          className={`rounded-[32px] text-base font-medium py-1 px-3 ${badgeStyles[variant]}`}
        >
          {value}
        </span>
      ) : (
        <span className="text-base font-medium">{value}</span>
      )}
    </div>
  );
}

export default InfoItem