import PendingCard from "../../../../common/PendingCard";

const RelatedOnesPending = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[20px] font-bold text-text-muted items-start">
        دوره های مرتبط
      </h3>
      <div className="flex flex-row flex-wrap md:items-start md:justify-start items-center justify-center gap-4">
        {Array.from({ length: 3 }, (_, i) => (
          <PendingCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedOnesPending;
