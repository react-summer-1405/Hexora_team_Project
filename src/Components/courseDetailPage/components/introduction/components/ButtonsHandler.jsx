import Button from "../../../../common/Button";
import book from "../../../../../assets/icons/details/book.svg";
import archive from "../../../../../assets/icons/details/archive.svg";
import blackLike from "../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../assets/icons/details/whiteLike.svg";
import blackDislike from "../../../../../assets/icons/details/blackDislike.svg";
import whiteDislike from "../../../../../assets/icons/details/whiteDislike.svg";
import { formatNumber } from "../../../../hooks/formatters";

const ButtonsHandler = ({
  toggleReserve,
  likeCount = 0,
  dissLikeCount = 0,
  userIsLiked,
  userIsDissLike,
  isCourseReseve,
  isUserFavorite,
}) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-4">
      <Button
        content={isCourseReseve ? "رزرو شده" : "رزرو دوره"}
        color="bg-primary"
        icon={book}
        customStyle="px-11"
        onClick={toggleReserve}
      />
      <Button
        content={isUserFavorite ? "حذف از لیست موردعلاقه" : "اضافه به لیست موردعلاقه"}
        icon={archive}
        customStyle="px-11"
      />
      <div className="flex flex-row items-center gap-1">
        <Button
          circle
          color={userIsLiked?'bg-primary' :'bg-bg-main'}
          icon={userIsLiked ? whiteLike : blackLike}
          customStyle={`w-14 h-14`}
        />
        <span className="text-base font-medium">{formatNumber(likeCount)}</span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <Button
          circle
          color={userIsDissLike?'bg-primary' :'bg-bg-main'}
          icon={userIsDissLike ? whiteDislike : blackDislike}
          customStyle={`w-14 h-14`}
        />
        <span className="text-base font-medium">{formatNumber(dissLikeCount)}</span>
      </div>
    </div>
  );
};

export default ButtonsHandler;