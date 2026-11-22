import { Skeleton } from "@heroui/react";

const Sk = ({ className }) => (
  <Skeleton animationType="shimmer" className={className} />
);

const InfoBoxPending = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border">
    {Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className="min-w-0 flex flex-col items-start justify-start gap-3 p-3 md:p-4 border-l border-b md:border-b-0 border-border"
      >
        <Sk className="h-5 w-12 rounded-lg" />
        <Sk className="h-7 md:h-8 w-24 rounded-[32px]" />
      </div>
    ))}
  </div>
);

const IntroductionPending = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row flex-wrap justify-start gap-5">
<Sk className="rounded-[32px] h-106 lg:w-[45%] w-[70%] lg:order-1 order-2 min-w-90 mx-auto lg:mx-3" />
        <div className="lg:w-[48%] w-full mx-auto lg:mx-1 flex flex-col gap-6 items-start lg:order-2 order-1">
          <Sk className="h-8 md:h-10 w-2/3 rounded-lg" />

          <div className="flex flex-col gap-4 lg:w-full w-5/6 md:mx-0 mx-auto">
            <InfoBoxPending />
            <InfoBoxPending />
          </div>

          <div className="w-full flex flex-row-reverse justify-end items-center md:justify-between">
            <div className="hidden md:flex flex-row gap-1 items-center">
              <Sk className="h-8 w-32 rounded-lg" />
              <Sk className="h-4 w-12 rounded-lg" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Sk className="h-5 w-8 rounded-lg" />
              <div className="flex flex-row items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Sk key={i} className="w-7 h-7 rounded-full" />
                ))}
              </div>
              <Sk className="h-5 w-24 rounded-lg" />
            </div>
          </div>

          <div className="w-full flex flex-row flex-wrap justify-start items-center gap-4">
            <Sk className="hidden md:block h-14 w-44 rounded-full" />
            <Sk className="h-14 w-48 md:w-72 rounded-full" />
            <Sk className="w-14 h-14 rounded-full" />
            <Sk className="w-14 h-14 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 items-start w-full">
        <Sk className="h-7 w-32 rounded-lg" />
        <Sk className="h-6 w-1/2 rounded-lg" />
        <div className="flex flex-col gap-2 w-full">
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-4/5 rounded-lg" />
        </div>
        <div className="flex flex-row flex-wrap justify-start items-center gap-4">
          <Sk className="h-6 w-20 rounded-lg" />
          <div className="flex flex-row gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Sk key={i} className="w-7 h-7 rounded-full" />
            ))}
          </div>
          <Sk className="h-12 w-52 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default IntroductionPending;