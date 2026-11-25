import Api_client from "../../interceptor/interceptor";

const normalizeComment = (item, type) => ({
  id: item.id || item.commentId,
  type, // "course" | "blog"
  targetId: item.courseId || item.newsId || item.blogId || "",
  targetTitle:
    item.courseTitle ||
    item.newsTitle ||
    item.blogTitle ||
    (type === "course" ? "دوره" : "بلاگ و خبر"),
  author: item.userFullName || item.author || "شما",
  date: item.insertDate
    ? new Date(item.insertDate).toLocaleDateString("fa-IR")
    : "",
  title: item.title || item.commentTitle || "بدون عنوان",
  content: item.describe || item.commentText || item.text || "",
  likes: Number(item.likeCount ?? 0),
  dislikes: Number(item.disslikeCount ?? 0),
  accepted: Boolean(item.accept),
  avatar: item.pictureAddress || "/avatar-placeholder.png",
});

export const getMyCourseComments = async (params = {}) => {
  const response = await Api_client.get("/SharePanel/GetMyCoursesComments", {
    params: {
      PageNumber: params.page || 1,
      RowsOfPage: params.rowsOfPage || 20,
      ...params,
    },
  });
  const rawList =
    response.data?.myCommentsDtos ||
    response.data?.comments ||
    response.data?.list ||
    [];
  return Array.isArray(rawList)
    ? rawList.map((item) => normalizeComment(item, "course"))
    : [];
};

export const getMyBlogComments = async (params = {}) => {
  const response = await Api_client.get("/SharePanel/GetMyNewsComments", {
    params: {
      PageNumber: params.page || 1,
      RowsOfPage: params.rowsOfPage || 20,
      ...params,
    },
  });
  const rawList =
    response.data?.myNewsCommetDtos ||
    response.data?.myNewsCommentsDtos ||
    response.data?.comments ||
    response.data?.list ||
    [];
  return Array.isArray(rawList)
    ? rawList.map((item) => normalizeComment(item, "blog"))
    : [];
};

export const getAllMyComments = async () => {
  const [courseRes, blogRes] = await Promise.allSettled([
    getMyCourseComments(),
    getMyBlogComments(),
  ]);

  const courseComments =
    courseRes.status === "fulfilled" ? courseRes.value : [];
  const blogComments = blogRes.status === "fulfilled" ? blogRes.value : [];

  return {
    courseComments,
    blogComments,
    allComments: [...courseComments, ...blogComments],
  };
};

export const addCourseComment = async ({ courseId, title, describe }) => {
  const response = await Api_client.post("/Course/AddCommentCourse", {
    CourseId: courseId,
    Title: title,
    Describe: describe,
  });
  return response.data;
};

export const replyCourseComment = async ({
  courseId,
  commentId,
  title,
  describe,
}) => {
  const response = await Api_client.post("/Course/AddReplyCommentCourse", {
    CourseId: courseId,
    CommentId: commentId,
    Title: title,
    Describe: describe,
  });
  return response.data;
};
