import Button from "../../../../common/Button";
import book from "../../../../../assets/icons/details/book.svg";
import { formatNumber } from "../../../../hooks/formatters";

const MobileCourseBar = ({ cost, isCourseReseve, toggleReserve }) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-10 border-t border-border bg-bg-main p-4 shadow-lg md:hidden">
      <Button
        content={isCourseReseve ? "رزرو شده" : "رزرو دوره"}
        color="bg-primary"
        icon={book}
        customStyle="flex-1 justify-center "
        onClick={toggleReserve}
      />

      <div className="flex items-center gap-1 whitespace-nowrap">
        <span className="text-xl font-bold">{formatNumber(cost)}</span>
        <span className="text-xs">تومان</span>
      </div>
    </div>
  );
};

export default MobileCourseBar;
