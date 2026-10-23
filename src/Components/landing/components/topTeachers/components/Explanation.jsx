import Button from '../../../../common/Button'

const Explanation = () => {
  return (
          <div className="cursor-default max-w-131 w-fit text-right flex flex-col items-start gap-6">
        <h3 className="text-2xl font-bold text-text-white">
          اساتید برتر هفته آکادمی
        </h3>
        <p className="text-[20px] font-medium text-text-light">
          در هفته جاری، اکادمی برنامه‌نویسی ما مفتخر است که از اساتید برتر خود
          تقدیر کند. این اساتید با دانش عمیق و تجربه گسترده خود در زمینه‌های
          مختلف برنامه‌نویسی، نه تنها به ارتقاء مهارت‌های دانشجویان کمک
          کرده‌اند، بلکه با برگزاری کارگاه‌ها و جلسات مشاوره، فضایی پویا و
          انگیزشی را برای یادگیری فراهم آورده‌اند.
        </p>
        <Button content="صفحه اساتید" color='bg-primary' />
      </div>
  )
}

export default Explanation