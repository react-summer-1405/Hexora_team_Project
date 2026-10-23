import Api_Client from "../../interceptor/interceptor"


export const addLikeForCourse = async (courseId) => {
  const response = await Api_Client.post(
    `/Course/AddCourseLike?CourseId=${courseId}`
  );
  return response.data;
};

export const addDislikeForCourse = async (courseId) => {
  const response = await Api_Client.post(
    `/Course/AddCourseDissLike?CourseId=${courseId}`
  );
  return response.data;
};

export const addCourseFavorite = async (courseId) => {
  const response = await Api_Client.post(
    `/Course/AddCourseFavorite`, { courseId }
  );
  return response.data;
}

export const deleteCourseFavorite = async (courseId) => {
  const response = await Api_Client.delete(
    "/Course/DeleteCourseFavorite",
    {
      data: { courseId },
    }
  );

  return response.data;
};

export const setCourseRating = async ({ courseId, rateNumber }) => {
  const response = await Api_Client.post("/Course/SetCourseRating", null, {
    params: { CourseId: courseId, RateNumber: rateNumber },
  });
  return response.data;
};