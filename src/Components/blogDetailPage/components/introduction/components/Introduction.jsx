import InfoBox from "./InfoBox";
import ButtonsHandler from "./buttonHandlers/ButtonsHandler";
import Description from "./Description";
import { formatDate, formatNumber } from "../../../../hooks/formatters";
import { useState } from "react";
import figmaLogo from "../../../../../assets/images/figma.png";
import Points from "./Points";
const Introduction = ({ blog }) => {
  const {
    id,
    title,
    miniDescribe,
    describe,
    currentImageAddress: imageAddress,
    insertDate,
    newsCatregoryName: categoryName,
    addUserFullName: authorName,
    newsRate,
    commentsCount,
    currentView: viewCount,
    currentLikeCount: likeCount,
    currentDissLikeCount: dissLikeCount,
    currentUserIsLike: userIsLiked,
    currentUserIsDissLike: userIsDissLike,
    isCurrentUserFavorite: isUserFavorite,
    currentUserFavoriteId: userFavoriteId,
    likeId: userLikeId,
    currentUserRateNumber,
  } = blog;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const showLogo = !imageAddress || isError || !isLoaded;
  const showImage = imageAddress && !isError;

  const itemsRow1 = [
    { id: 1, label: "دسته‌بندی", value: categoryName, variant: "danger" },
    {
      id: 2,
      label: "منتشرکننده",
      value: authorName,
      variant: "purple",
    },
    {
      id: 3,
      label: "تاریخ انتشار",
      value: formatDate(insertDate),
      variant: "primary",
    },
    { id: 4, label: "بازدیدکنندگان", value: formatNumber(viewCount) + " نفر" },
  ];

  const itemsRow2 = [
    { id: 1, label: "تعداد لایک", value: formatNumber(likeCount) },
    { id: 2, label: "تعداد دیس‌لایک", value: formatNumber(dissLikeCount) },
  ];

  return (
    <div className="flex flex-col gap-12 ">
      <div className="introduction  flex flex-row flex-wrap justify-start gap-5 ">
        <div className="intro-image bg-[#FF6C6C] flex lg:flex-row flex-col justify-center lg:items-end items-center rounded-[32px] h-106 lg:w-[45%] w-[70%] lg:order-1 order-2  min-w-90 mx-auto lg:mx-3  object-contain">
          {showLogo && (
            <img
              src={figmaLogo}
              className=" animate-bounce  object-contain w-85 h-85"
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
        <div className="lg:w-[48%] w-full  mx-auto lg:mx-1  flex flex-col gap-6 items-start  lg:order-2 order-1 ">
          <h3 className="blog-title md:text-[32px] text-2xl font-bold text-text-dark text-right">
            {title}
          </h3>
          <div className="flex flex-col gap-4 lg:w-full w-5/6 md:mx-0 mx-auto">
            <InfoBox items={itemsRow1} className="lg:grid-cols-4" />
            <InfoBox items={itemsRow2} className="lg:w-1/2" />
          </div>
          <Points rate={newsRate} commentsCount={commentsCount} />
          <ButtonsHandler
            blogId={id}
            likeCount={likeCount}
            dissLikeCount={dissLikeCount}
            userIsLiked={userIsLiked}
            userIsDissLike={userIsDissLike}
            isUserFavorite={isUserFavorite}
            userFavoriteId={userFavoriteId}
            userLikeId={userLikeId}
          />
        </div>
      </div>
      <Description
        miniDescribe={miniDescribe}
        describe={describe}
        blogId={id}
        userRate={Number(currentUserRateNumber) || 0}
      />
    </div>
  );
};

export default Introduction;
