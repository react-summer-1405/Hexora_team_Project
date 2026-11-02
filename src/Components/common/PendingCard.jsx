import { Skeleton } from "@heroui/react";

const PendingCard = ({width = "w-80"}) => {
  return (
    <div className={`${width} h-91 rounded-4xl`}>
      <div className="relative h-73">
        <Skeleton
          animationType="shimmer"
          className="h-full w-full rounded-4xl"
        />

        <div className="absolute flex flex-row gap-2 top-2 right-4">
          <Skeleton animationType="shimmer" className="h-6 w-16 rounded-4xl" />
          <Skeleton animationType="shimmer" className="h-6 w-20 rounded-4xl" />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-2 mt-3">
        <Skeleton animationType="shimmer" className="h-6 w-4/5 rounded-lg" />

        <div className="w-full flex flex-row justify-between items-center">
          <Skeleton animationType="shimmer" className="h-4 w-24 rounded-lg" />
          <Skeleton animationType="shimmer" className="h-5 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PendingCard;