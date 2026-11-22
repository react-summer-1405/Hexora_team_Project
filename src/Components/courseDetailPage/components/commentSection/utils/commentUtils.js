import { formatDate } from "../../../../hooks/formatters";

export const normalizeComment = (c) => ({
  id: c.id,
  title: c.title,
  text: c.describe,
  authorName: c.author,
  authorImage: c.pictureAddress,
  date: formatDate(c.insertDate),
  likes: c.likeCount ?? 0,
  dislikes: c.disslikeCount ?? 0,
  isLiked: !!c.currentUserIsLike,
  isDisliked: !!c.currentUserIsDissLike,
  userId:c.userId
});