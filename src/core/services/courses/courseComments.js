import Api_Client from "../../interceptor/interceptor"

export const getCourseComments = async (CourseId) => {
  const response = await Api_Client.get(`/Course/GetCourseCommnets/${CourseId}`)

  return response.data
}

export const getCourseReplies = async (courseId, commentId) => {
  const res = await Api_Client.get(
    `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
  );
  return res.data;
};


export const addCourseComment = async ({
  courseId,
  title,
  describe,
}) => {
  const formData = new FormData();

  formData.append("CourseId", courseId);
  formData.append("Title", title);
  formData.append("Describe", describe);

  const res = await Api_Client.post(
    "/Course/AddCommentCourse",
    formData
  );

  return res.data;
};
 export const editCourseComment = async ({
  courseId,
  commentId,
  title,
  describe,
}) => {
  const formData = new FormData();

  formData.append("CommentId", commentId);
  formData.append("CourseId", courseId);
  formData.append("Title", title);
  formData.append("Describe", describe);

  const res = await Api_Client.put(
    "/Course/UpdateCourseComment",
    formData
  );

  return res.data;
};

export const deleteCourseComment = async (commentId) => {
  const res = await Api_Client.delete("/Course/DeleteCourseComment", {
    params: { CourseCommandId: commentId },
  });

  return res.data;
};

export const addReplyComment = async ({ courseId, commentId, title, describe }) => {

  const formData = new FormData();

  formData.append("CommentId", commentId)
  formData.append("CourseId", courseId);
  formData.append("Title", title);
  formData.append("Describe", describe);


  const res = await Api_Client.post(
    "/Course/AddReplyCourseComment",
    formData
  );
  return res.data;
};

export const likeComment = async (commentId) => {
  const res = await Api_Client.post("/Course/AddCourseCommentLike", null, {
    params: { CourseCommandId: commentId },
  });
  return res.data;
};

export const dislikeComment = async (commentId) => {
  const res = await Api_Client.post("/Course/AddCourseCommentDissLike", null, {
    params: { CourseCommandId: commentId },
  });
  return res.data;
};