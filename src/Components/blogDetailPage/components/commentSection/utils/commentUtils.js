import { formatDate } from "../../../../hooks/formatters";

export const normalizeBlogComment = (c) => ({
  id: c.id,
  newsId: c.newsId,
  parentId: c.parentId || null,
  title: c.title,
  text: c.describe,
  authorName: c.userFullName,
  authorImage: c.userPicture ?? c.user?.currentPictureAddress ?? null,
  date: formatDate(c.inserDate),
  likes: c.likeCount ?? 0,
  dislikes: c.dissLikeCount ?? 0,
  isLiked: !!c.currentUserIsLike,
  isDisliked: !!c.currentUserIsDissLike,
  likeId: c.currentUserLikeId ?? null,
});