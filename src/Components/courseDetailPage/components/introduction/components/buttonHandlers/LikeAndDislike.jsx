import toast from "react-hot-toast";
import Button from "../../../../../common/Button";
import {
  addDislikeForCourse,
  addLikeForCourse,
  deleteCourseDisLike,
  deleteCourseLike,
} from "../../../../../../core/services/courses/courseHandling";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import blackLike from "../../../../../../assets/icons/details/blackLike.svg";
import whiteLike from "../../../../../../assets/icons/details/whiteLike.svg";
import blackDislike from "../../../../../../assets/icons/details/blackDislike.svg";
import whiteDislike from "../../../../../../assets/icons/details/whiteDislike.svg";
 const LikeAndDislike = ({
  userIsLiked,
  userIsDissLike,
  likeCount,
  dissLikeCount,
  courseId,
  userLikeId,
  userDissLikeId,
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
    mutationFn: (wasLiked) =>
      wasLiked ? deleteCourseLike(userLikeId) : addLikeForCourse(courseId),

    onMutate: (wasLiked) => {
      const next = wasLiked
        ? {
            liked: false,
            likes: view.likes - 1,
            disliked: view.disliked,
            dislikes: view.dislikes,
          }
        : {
            liked: true,
            likes: view.likes + 1,
            disliked: false,
            dislikes: view.dislikes - (view.disliked ? 1 : 0),
          };

      setOptimistic(next);
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
    mutationFn: (wasDisliked) =>
      wasDisliked
        ? deleteCourseDisLike(userDissLikeId)
        : addDislikeForCourse(courseId),

    onMutate: (wasDisliked) => {
      const next = wasDisliked
        ? {
            disliked: false,
            dislikes: view.dislikes - 1,
            liked: view.liked,
            likes: view.likes,
          }
        : {
            disliked: true,
            dislikes: view.dislikes + 1,
            liked: false,
            likes: view.likes - (view.liked ? 1 : 0),
          };

      setOptimistic(next);
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
    if (!isBusy) likeMutation.mutate(view.liked);
  };

  const handleDislike = () => {
    if (!isBusy) dislikeMutation.mutate(view.disliked);
  };

  return (
    <div className="flex flex-row gap-4 ">
      <Button
        circle
        color={view.liked ? "bg-primary" : "bg-bg-main"}
        icon={view.liked ? whiteLike : blackLike}
        customStyle="w-14 h-14"
        onClick={handleLike}
      />
      <Button
        circle
        color={view.disliked ? "bg-primary" : "bg-bg-main"}
        icon={view.disliked ? whiteDislike : blackDislike}
        customStyle="w-14 h-14"
        onClick={handleDislike}
      />
    </div>
  );
};

export default LikeAndDislike;