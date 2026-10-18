import Button from "../../../../common/Button";
import book from '../../../../../assets/icons/details/book.svg'
import archive from '../../../../../assets/icons/details/archive.svg'
import blackLike from '../../../../../assets/icons/details/blackLike.svg'
import blackDislike from '../../../../../assets/icons/details/blackDislike.svg'
const ButtonsHandler = () => {
  return (
            <div className="w-full flex flex-row justify-center gap-5">
            <Button content="رزرو دوره" color="bg-primary" icon={book} customStyle="px-11"/>
            <Button content="اضافه به لیست موردعلاقه" icon={archive} customStyle="px-11"/>
            <Button circle={true} color="bg-bg-main" icon={blackLike} customStyle="w-14 h-14"/>
            <Button circle={true}  color="bg-bg-main" icon={blackDislike} customStyle="w-14 h-14"/>
          </div>
  )
}

export default ButtonsHandler