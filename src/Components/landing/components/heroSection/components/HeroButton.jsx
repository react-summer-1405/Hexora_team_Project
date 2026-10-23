import Button from "../../../../common/Button"

const HeroButton = () => {
  return (
          <div className=" flex flex-col gap-2.5 items-center w-63">
        <span className=" flex flex-col items-start text-lg font-medium text-text-dark ">
         <i> همین حالا</i>
         <i> شروع کن به یادگیری!</i>
        </span>
        <Button content='جديد ترین دوره ها' color='bg-bg-lightDark'/>
      </div>
  )
}

export default HeroButton