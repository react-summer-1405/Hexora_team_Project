import InfoBox from "./InfoBox";
import PointAndPrice from "./PointAndPrice";
import ButtonsHandler from "./buttonHandlers/ButtonsHandler";
import Description from "./Description";
import { formatDate, formatNumber } from "../../../../hooks/formatters";
import { useState } from "react";
import reactLogo from "../../../../../assets/images/react.png";
const Introduction = ({ course, toggleReserve }) => {
  
  const {
    title,
    courseId,
    imageAddress,
    teacherName,
    courseStatusName,
    courseLevelName,
    courseTech,
    startTime,
    endTime,
    cost,
    courseRate,
    currentUserRateNumber,
    studentCount,
    likeCount,
    dissLikeCount,
    userIsLiked,
    userIsDissLike,
    isCourseReseve,
    isUserFavorite,
    miniDescribe,
    describe,
    userFavoriteId,
    userDissLikeId,
    userLikeId,
  } = course;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const showLogo = !imageAddress || isError || !isLoaded;
  const showImage = imageAddress && !isError;

  const getUniqueTechNames = (courseTech = []) => {
    const names = courseTech
      .map((item) => item?.tech?.techName?.trim())
      .filter(Boolean);

    return names.filter(
      (name, index) =>
        names.findIndex((n) => n.toLowerCase() === name.toLowerCase()) ===
        index,
    );
  };

  const tech = getUniqueTechNames(courseTech);

  const itemsRow1 = [
    { id: 1, label: "وضعیت", value: courseStatusName, variant: "danger" },
    {
      id: 2,
      label: "دسته‌بندی",
      value: tech.length ? tech.join("، ") : "مشخص نیست",
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
    <div className="flex flex-col gap-12 ">
      <div className=" flex flex-row flex-wrap justify-start gap-5 ">
        <div className=" bg-[#87DFFF] flex lg:flex-row flex-col justify-center lg:items-end items-center rounded-[32px] h-106 lg:w-[45%] w-[70%] lg:order-1 order-2  min-w-90 mx-auto lg:mx-3  object-contain">
          {showLogo && (
            <img
              src={reactLogo}
              className=" animate-bounce   object-contain w-100 h-100"
            />
          )}

          {showImage && (
            <img
              src={imageAddress}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsError(true)}
              className={` object-contain transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <div className="lg:w-[48%] w-[90%]  mx-auto lg:mx-1  flex flex-col gap-6 items-start  lg:order-2 order-1 ">
          <h3 className="md:text-[32px] text-2xl font-bold text-text-dark text-right">
            {title}
          </h3>
          <div className="flex flex-col gap-4 lg:w-full w-5/6 md:mx-0 mx-auto">
            <InfoBox items={itemsRow1} />
            <InfoBox items={itemsRow2} />
          </div>
          <PointAndPrice
            cost={cost}
            rate={courseRate}
            studentCount={studentCount}
          />
          <ButtonsHandler
            courseId={courseId}
            toggleReserve={toggleReserve}
            likeCount={likeCount}
            dissLikeCount={dissLikeCount}
            userIsLiked={userIsLiked}
            userIsDissLike={userIsDissLike}
            isCourseReseve={isCourseReseve}
            isUserFavorite={isUserFavorite}
            userFavoriteId={userFavoriteId}
            userLikeId={userLikeId}
            userDissLikeId={userDissLikeId}
          />
        </div>
      </div>
      <Description
        miniDescribe={miniDescribe}
        describe={describe}
        courseId={courseId}
        userRate={Number(currentUserRateNumber) || 0}
      />
    </div>
  );
};

export default Introduction;
