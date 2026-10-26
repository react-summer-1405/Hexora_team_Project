import { formatDate } from "../../../../hooks/formatters";

 const normalizeBlogComment = (c) => ({

  id: c.id,
  blogId: c.newsId,
  parentId: c.parentId || null,
  title: c.title,
  text: c.describe,
  authorName: c.userFullName,
  authorImage: c.userPicture ?? c.user?.currentPictureAddress ,
  date: formatDate(c.inserDate),
  likes: c.likeCount ?? 0,
  dislikes: c.dissLikeCount ?? 0,
  isLiked: c.currentUserIsLike,
  isDisliked: c.currentUserIsDissLike,
  likeId: c.currentUserLikeId ?? null,
});

export default normalizeBlogComment