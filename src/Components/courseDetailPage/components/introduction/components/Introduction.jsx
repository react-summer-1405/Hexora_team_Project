import InfoBox from "./InfoBox";
import PointAndPrice from "./PointAndPrice";
import ButtonsHandler from "./ButtonsHandler";
import Description from "./Description";
import { formatDate, formatNumber } from "../../../../hooks/formatters";
const Introduction = ({ course, toggleReserve }) => {
const {
  title,
  imageAddress,
  teacherName,
  courseStatusName,
  courseLevelName,
  courseTech,
  startTime,
  endTime,
  cost,
  courseRate,
  studentCount,
  likeCount,
  dissLikeCount,
  userIsLiked,
  userIsDissLike,
  isCourseReseve,
  isUserFavorite,
  miniDescribe,
  describe,
} = course;

const techNames = courseTech?.map((item) => item.tech.techName) ?? [];

  const itemsRow1 = [
    { id: 1, label: "وضعیت", value: courseStatusName, variant: "danger" },
    {
      id: 2,
      label: "دسته‌بندی",
      value: techNames ? techNames.join("، ") : "—",
      variant: "purple",
    },
    { id: 3, label: "سطح آموزشی", value: courseLevelName, variant: "primary" },
    { id: 4, label: "استاد دوره", value: teacherName },
  ];

  const itemsRow2 = [
    { id: 1, label: "تاریخ برگزاری", value: formatDate(startTime) },
    { id: 2, label: "تاریخ اتمام", value: formatDate(endTime) },
    { id: 3, label: "تعداد لایک", value: formatNumber(likeCount) },
    { id: 4, label: "تعداد دیس‌لایک", value: formatNumber(dissLikeCount) },
  ];
   return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row gap-8">
        <img
          src={imageAddress}
          alt={title}
          className="rounded-[32px] h-106 w-[45%] object-cover"
        />
        <div className="w-[47%] flex flex-col gap-6 items-start">
          <h3 className="text-[32px] font-bold text-text-dark text-right">
            {title}
          </h3>
          <div className="flex flex-col gap-4 w-full">
            <InfoBox items={itemsRow1} />
            <InfoBox items={itemsRow2} />
          </div>
          <PointAndPrice
            cost={cost}
            rate={courseRate}
            studentCount={studentCount}
          />
          <ButtonsHandler
            toggleReserve={toggleReserve}
            likeCount={likeCount}
            dissLikeCount={dissLikeCount}
            userIsLiked={userIsLiked}
            userIsDissLike={userIsDissLike}
            isCourseReseve={isCourseReseve}
            isUserFavorite={isUserFavorite}
          />
        </div>
      </div>
      <Description miniDescribe={miniDescribe} describe={describe} />
    </div>
  );
};

export default Introduction;
