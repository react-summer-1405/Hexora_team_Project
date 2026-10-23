import toast from "react-hot-toast";
import Button from "../../../../../common/Button";
import {
  addDislikeForCourse,
  addLikeForCourse,
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
