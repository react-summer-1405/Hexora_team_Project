import { Skeleton } from "@heroui/react";

const Sk = ({ className }) => (
  <Skeleton animationType="shimmer" className={className} />
);

const CommentBoxPending = () => (
  <div className="flex flex-col gap-4 p-4 items-start justify-between w-81 h-70.5 rounded-[24px] bg-bg-light">
    <div className="flex flex-col gap-3 w-full">
      <Sk className="h-6 w-1/2 rounded-lg" />
      <Sk className="h-4 w-full rounded-lg" />
      <Sk className="h-4 w-full rounded-lg" />
      <Sk className="h-4 w-4/5 rounded-lg" />
    </div>

    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <Sk className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-1.5">
          <Sk className="h-4 w-24 rounded-lg" />
          <Sk className="h-3 w-16 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Sk className="w-8 h-8 rounded-full" />
        <Sk className="w-8 h-8 rounded-full" />
      </div>
    </div>
  </div>
);

const CommentSectionPending = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[20px] font-bold text-text-muted self-start">
        نظرات دانشجو ها و اساتید
      </h3>

      <div className="flex flex-row flex-wrap items-start justify-start gap-4">
        <Sk className="w-81 h-70.5 rounded-[24px]" />
        {Array.from({ length: 2 }, (_, i) => (
          <CommentBoxPending key={i} />
        ))}
      </div>

      <Sk className="h-12 w-32 rounded-full self-center" />
    </div>
  );
};

export default CommentSectionPending;