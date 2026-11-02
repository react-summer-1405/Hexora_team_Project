import yellowStar from "../../../../../assets/icons/details/yellowStar.svg";
import grayStar from "../../../../../assets/icons/details/grayStar.svg";
import { formatNumber } from "../../../../hooks/formatters";

const Points = ({  rate = {}, commentsCount = 0 }) => {

 const { avg: rateAvg, count: rateCount } = rate
  return (
    <div className="point-price w-full flex flex-row justify-end md:justify-between cursor-default">

      <div className="flex flex-row items-center gap-2 text-base font-medium text-text-dark">
        <span>({formatNumber(rateCount)})</span>
        <div className="flex flex-row items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={i < Math.round(rateAvg) ? yellowStar : grayStar}
              className="star w-7 h-7"
            />
          ))}
        </div>
        <span className="text-base font-medium text-text-dark">
          + ( {formatNumber(commentsCount)} ) نظرات
        </span>
      </div>
    </div>
  );
};

export default Points;
