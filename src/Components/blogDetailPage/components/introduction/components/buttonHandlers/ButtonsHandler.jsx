import Button from "../../../../../common/Button";
import archive from "../../../../../../assets/icons/details/archive.svg";
import attachment from "../../../../../../assets/icons/details/attachment.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import toast from "react-hot-toast";
import LikeAndDislike from "./LikeAndDislike";
import {
  addBlogFavorite,
  deleteBlogFavorite,
} from "../../../../../../core/services/blogs/blogHandling";

const ButtonsHandler = ({
  dissLikeCount = 0,
  likeCount = 0,
  userIsLiked,
  userIsDissLike,
  userLikeId,
  isUserFavorite,
  blogId,
  userFavoriteId,
}) => {
  console.log("isUserFavorite", isUserFavorite);
  console.log("userFavoriteId", userFavoriteId);

  const handleCopy = () => navigator.clipboard.writeText(window.location.href);

  const queryClient = useQueryClient();
  const [optimisticFav, setOptimisticFav] = useState(null);

  const favView = optimisticFav ?? !!userFavoriteId;

  const favoriteMutation = useMutation({
    mutationFn: (nextFav) =>
      nextFav ? addBlogFavorite(blogId) : deleteBlogFavorite(userFavoriteId),

    onMutate: (nextFav) => {
      setOptimisticFav(nextFav);
    },

    onError: (error) => {
      setOptimisticFav(null);

      toast.error(error.response?.data?.message || "مشکلی پیش آمد");
    },

    onSuccess: (data) => {
      toast.success(data?.message || "عملیات موفق بود");
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getBlogById", blogId],
      });

      setOptimisticFav(null);
    },
  });

  const handleFavorite = () => {
    if (favoriteMutation.isPending) return;
    favoriteMutation.mutate(!favView);
  };

  return (
    <div className="buttons-handler w-full flex flex-row flex-wrap  justify-start items-center gap-4 ">
      <div className="md:block hidden">
        <Button
          content="کپی کردن لینک صفحه"
          customStyle="border border-primary dark:border-border"
          textColor="primary"
          color="bg-bg-main"
          icon={attachment}
          onClick={handleCopy}
        />
      </div>
      <Button
        content={favView ? "حذف از لیست موردعلاقه" : "اضافه به لیست موردعلاقه"}
        icon={archive}
        iconSize="w-6 h-6 dark:invert hidden md:block"
        customStyle="py-4 md:px-11"
        onClick={handleFavorite}
      />
      <LikeAndDislike
        blogId={blogId}
        likeCount={likeCount}
        dissLikeCount={dissLikeCount}
        userIsLiked={userIsLiked}
        userIsDissLike={userIsDissLike}
        userLikeId={userLikeId}
      />{" "}
    </div>
  );
};

export default ButtonsHandler;
