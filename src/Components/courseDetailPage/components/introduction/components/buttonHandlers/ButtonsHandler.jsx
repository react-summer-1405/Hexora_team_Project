import Button from "../../../../../common/Button";
import book from "../../../../../../assets/icons/details/book.svg";
import archive from "../../../../../../assets/icons/details/archive.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  addCourseFavorite,
  deleteCourseFavorite,
} from "../../../../../../core/services/courses/courseHandling";
import toast from "react-hot-toast";
import LikeAndDislike from "./LikeAndDislike";

const ButtonsHandler = ({
  toggleReserve,
  dissLikeCount = 0,
  likeCount = 0,
  userIsLiked,
  userIsDissLike,
  userLikeId,
  userDissLikeId,
  isCourseReseve,
  isUserFavorite,
  courseId,
  userFavoriteId,
}) => {

  const queryClient = useQueryClient();
const [optimisticFav, setOptimisticFav] = useState(null);

const favView = optimisticFav ?? isUserFavorite;

const favoriteMutation = useMutation({
  mutationFn: (nextFav) =>
    nextFav
      ? addCourseFavorite(courseId)
      : deleteCourseFavorite(userFavoriteId),

  onMutate: (nextFav) => {
    setOptimisticFav(nextFav);
  },

  onError: (error) => {
    setOptimisticFav(null);

    toast.error(
      error.response?.data?.message || "مشکلی پیش آمد"
    );
  },

  onSuccess: (data) => {
    toast.success(data?.message || "عملیات موفق بود");
  },

  onSettled: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["getCourseById", courseId],
    });

    setOptimisticFav(null);
  },
});

const handleFavorite = () => {
  if (favoriteMutation.isPending) return;

  const nextFav = !favView;
  setOptimisticFav(nextFav); 
  favoriteMutation.mutate(nextFav);
};

  return (
    <div className="buttons-handler w-full flex flex-row flex-wrap  justify-start items-center gap-4">
      <Button
        content={isCourseReseve ? "رزرو شده" : "رزرو دوره"}
        color="bg-primary"
        icon={book}
        customStyle="hidden md:flex md:px-11"
        onClick={toggleReserve}
      />
      <Button
        content={
          isUserFavorite ? "حذف از لیست موردعلاقه" : "اضافه به لیست موردعلاقه"
        }
        icon={archive}
        customStyle="md:px-11 "
        onClick={handleFavorite}
      />
<LikeAndDislike
  courseId={courseId}
  likeCount={likeCount}
  dissLikeCount={dissLikeCount}
  userIsLiked={userIsLiked}
  userIsDissLike={userIsDissLike}
  userLikeId={userLikeId}
  userDissLikeId={userDissLikeId}
/>    </div>
  );
};

export default ButtonsHandler;
