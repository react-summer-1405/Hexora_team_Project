import { Skeleton } from "@heroui/react";

const Sk = ({ className }) => (
  <Skeleton animationType="shimmer" className={className} />
);

const InfoBoxPending = () => (
  <div className="flex flex-row flex-wrap rounded-2xl border border-border">
    {Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className="flex flex-col items-start justify-center gap-3 py-4 px-8 border-l border-border last:border-l-0"
      >
        <Sk className="h-4 w-12 rounded-lg" />
        <Sk className="h-6 w-24 rounded-[32px]" />
      </div>
    ))}
  </div>
);

const IntroductionPending = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-8">
        {/* تصویر */}
        <Sk className="rounded-[32px] h-106 w-[45%]" />

        <div className="w-[47%] flex flex-col gap-6 items-start">
          {/* عنوان */}
          <Sk className="h-10 w-2/3 rounded-lg" />

          {/* دو InfoBox */}
          <div className="flex flex-col gap-4 w-full">
            <InfoBoxPending />
            <InfoBoxPending />
          </div>

          {/* قیمت و امتیاز */}
          <div className="w-full flex flex-row-reverse justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Sk className="h-8 w-32 rounded-lg" />
              <Sk className="h-4 w-12 rounded-lg" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Sk className="h-5 w-8 rounded-lg" />
              <div className="flex flex-row gap-0.5">
                {Array.from({ length: 4 }, (_, i) => (
                  <Sk key={i} className="w-7 h-7 rounded-full" />
                ))}
              </div>
              <Sk className="h-5 w-24 rounded-lg" />
            </div>
          </div>

          {/* دکمه‌ها */}
          <div className="w-full flex flex-row justify-center gap-5">
            <Sk className="h-12 w-40 rounded-full" />
            <Sk className="h-12 w-60 rounded-full" />
            <Sk className="w-14 h-14 rounded-full" />
            <Sk className="w-14 h-14 rounded-full" />
          </div>
        </div>
      </div>

      {/* توضیحات */}
      <div className="flex flex-col gap-4 items-start w-full">
        <Sk className="h-6 w-32 rounded-lg" />
        <div className="flex flex-col gap-2 w-full">
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-full rounded-lg" />
          <Sk className="h-4 w-4/5 rounded-lg" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <Sk className="h-5 w-24 rounded-lg" />
          <div className="flex flex-row gap-0.5">
            {Array.from({ length: 4 }, (_, i) => (
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