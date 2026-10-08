
const HeroButton = () => {
  return (
          <div className=" flex flex-col gap-2.5 items-center">
        <span className=" flex flex-col items-start text-lg font-medium text-text-dark ">
         <i> همین حالا</i>
         <i> شروع کن به یادگیری!</i>
        </span>
<span className="rounded-full bg-bg-dark text-text-white px-5 py-3 transition transition-300 cursor-pointer hover:bg-surface-dark hover:-translate-y-0.5  hover:shadow-[0_5px_10px_1px_#666] active:shadow-[0_5px_20px_1px_#666] active:translate-y-0" >جدید ترین دوره ها</span>
      </div>
  )
}

export default HeroButton