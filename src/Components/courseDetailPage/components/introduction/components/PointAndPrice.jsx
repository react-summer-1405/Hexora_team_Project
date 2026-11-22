import yellowStar from "../../../../../assets/icons/details/yellowStar.svg";
import grayStar from "../../../../../assets/icons/details/grayStar.svg";
import { formatNumber } from "../../../../hooks/formatters";


const PointAndPrice = ({ cost = 0, rate = 0, studentCount = 0 }) => {
  return (
    <div className="point-price  w-full flex flex-row-reverse justify-end md:justify-between cursor-default">
      <div className="hidden md:flex flex-row gap-1 items-center text-text-dark">
        <span className="text-2xl font-bold">{formatNumber(cost)}</span>
        <span className="text-sm font-medium">تومان</span>
      </div>
      <div className="flex flex-row items-center gap-2 text-base font-medium text-text-dark">
        <span>({formatNumber(rate)})</span>
        <div className="flex flex-row items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={i < Math.round(rate) ? yellowStar : grayStar}
              className="star w-7 h-7"
            />
          ))}
        </div>
        <span className="text-base font-medium text-text-dark">
          + ( {formatNumber(studentCount)} ) دانشجو
        </span>
      </div>
    </div>
  );
};

export default PointAndPrice;
