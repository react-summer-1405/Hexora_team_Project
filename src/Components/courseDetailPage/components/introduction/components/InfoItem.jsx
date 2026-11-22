const InfoItem = ({ label, value, variant }) => {
  const badgeStyles = {
    danger: "bg-danger text-text-white",
    primary: "bg-primary text-text-white",
    purple: "bg-badge-purple text-text-white",
  };

  return (
    <div className="min-w-0 flex flex-col items-start justify-start gap-3 p-3 md:p-4 border-l  border-b md:border-b-0  cursor-default border-border">
      <span className="text-text-muted text-sm font-medium">
        {label}
      </span>

      {variant ? (
        <span
          className={`max-w-full rounded-[32px] text-sm md:text-base font-medium py-1 px-3 wrap-break-word ${
            badgeStyles[variant]
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-sm md:text-base font-medium wrap-break-word">
          {value}
        </span>
      )}
    </div>
  );
};

export default InfoItem;