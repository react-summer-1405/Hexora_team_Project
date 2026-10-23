import Button from "../../../../../common/Button";
import book from "../../../../../../assets/icons/details/book.svg";
import archive from "../../../../../../assets/icons/details/archive.svg";
import blackLike from "../../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../../assets/icons/details/whiteLike.svg";
import blackDislike from "../../../../../../assets/icons/details/blackDislike.svg";
import whiteDislike from "../../../../../../assets/icons/details/whiteDislike.svg";
import { formatNumber } from "../../../../../hooks/formatters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  addDislikeForCourse,
  addLikeForCourse,
  addCourseFavorite,
  deleteCourseFavorite,
} from "../../../../../../core/services/courses/courseHandling";
import toast from "react-hot-toast";

const ButtonsHandler = ({
  toggleReserve,
  dissLikeCount = 0,
    likeCount = 0,
  userIsLiked,
  userIsDissLike,
  isCourseReseve,
  isUserFavorite,
  courseId,
}) => {
  const queryClient = useQueryClient();

  const [optimistic, setOptimistic] = useState(null);

  const server = {
    liked: userIsLiked,
    disliked: userIsDissLike,
    likes: likeCount,
    dislikes: dissLikeCount,
  };

  const view = optimistic ?? server;

  const likeMutation = useMutation({
    mutationFn: () => addLikeForCourse(courseId),
    onMutate: () => {
      const prev = view;
      const next = {
        liked: true,
        likes: prev.liked ? prev.likes : prev.likes + 1,
        disliked: false,
        dislikes: prev.dislikes - (prev.disliked ? 1 : 0),
      };
      setOptimistic(next);
      return { prev };
    },
    onError: (error) => {
      setOptimistic(null);
      toast.error(error.response?.data?.message || "مشکلی پیش آمد");
    },
    onSuccess: (data) => toast.success(data?.message),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getCourseById"] });
      setOptimistic(null);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: () => addDislikeForCourse(courseId),
    onMutate: () => {
      const prev = view;
      const next = {
        disliked: true,
        dislikes: prev.disliked ? prev.dislikes : prev.dislikes + 1,
        liked: false,
        likes: prev.likes - (prev.liked ? 1 : 0),
      };

      setOptimistic(next);
      return { prev };
    },
    onError: (error) => {
      setOptimistic(null);
      toast.error(error.response?.data?.message || "مشکلی پیش آمد");
    },
    onSuccess: (data) => toast.success(data?.message),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getCourseById"] });
      setOptimistic(null);
    },
  });

  const isBusy = likeMutation.isPending || dislikeMutation.isPending;

  const handleLike = () => {
    if (!isBusy) likeMutation.mutate();
  };

  const handleDislike = () => {
    if (!isBusy) dislikeMutation.mutate();
  };

  const [optimisticFav, setOptimisticFav] = useState(null);

  const favView = optimisticFav ?? isUserFavorite;

  const favoriteMutation = useMutation({
    mutationFn: (nextFav) =>
      nextFav ? addCourseFavorite(courseId) : deleteCourseFavorite(courseId),

    onMutate: (nextFav) => {
      setOptimisticFav(nextFav);
    },

    onError: (error) => {
      setOptimisticFav(null);
      toast.error(error.response?.data?.message || "مشکلی پیش آمد");
    },

    onSuccess: (data) => {
      toast.success(data?.message);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCourseById"],
      });
      setOptimisticFav(null);
    },
  });

  const handleFavorite = () => {
    if (favoriteMutation.isPending) return;

    favoriteMutation.mutate(!favView);
    console.log("favView", favView);
    
  };

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
        content={
          isUserFavorite ? "حذف از لیست موردعلاقه" : "اضافه به لیست موردعلاقه"
        }
        icon={archive}
        customStyle="px-11"
        onClick={handleFavorite}
      />
      <div className="flex flex-row items-center gap-1">
        <Button
          circle
          color={view.liked ? "bg-primary" : "bg-bg-main"}
          icon={view.liked ? whiteLike : blackLike}
          customStyle="w-14 h-14"
          onClick={handleLike}
        />
        <span className="text-base font-medium">
          {formatNumber(view.likes)}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <Button
          circle
          color={view.disliked ? "bg-primary" : "bg-bg-main"}
          icon={view.disliked ? whiteDislike : blackDislike}
          customStyle="w-14 h-14"
          onClick={handleDislike}
        />
        <span className="text-base font-medium">
          {formatNumber(view.dislikes)}
        </span>
      </div>
    </div>
  );
};

export default ButtonsHandler;
