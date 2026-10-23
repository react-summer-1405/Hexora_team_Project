import Api_Client from "../../interceptor/interceptor"

export const  getCourseComments = async (CourseId) => {
    const response= await Api_Client.get(`/Course/GetCourseCommnets/${CourseId}`)

    return response.data
}

export const getCourseReplies = async (courseId, commentId) => {
  const res = await Api_Client.get(
    `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
  );
  return res.data;
};


export const addCourseComment = async ({ courseId:CourseId, title:Title, describe:Describe }) => {

  const res = await Api_Client.post("/Course/AddCommentCourse", {
    CourseId,
    Title,
    Describe,
  });
  return res.data;
};


export const addReplyComment = async ({ courseId, commentId, title, describe }) => {

  console.log({ courseId, commentId, title, describe });
  
  const res = await Api_Client.post("/Course/AddReplyCourseComment", {
    CourseId: courseId,
    CommentId: commentId,
    Title: title,
    Describe: describe,
  });
  return res.data;
};

export const likeComment = async (commentId) => {
  const res = await Api_Client.post("/Course/AddCourseCommentLike",null, {
    params: { CourseCommandId: commentId },
  });
  return res.data;
};

export const dislikeComment = async (commentId) => {
  const res = await Api_Client.post("/Course/AddCourseCommentDissLike",null, {
    params: { CourseCommandId: commentId },
  });
  return res.data;
};