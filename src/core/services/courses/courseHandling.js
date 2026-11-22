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
  console.log("CourseFavoriteId", courseId);

  const response = await Api_Client.post(
    `/Course/AddCourseFavorite`, { courseId }
  );
  return response.data;
}

export const deleteCourseFavorite = async (courseId) => {

  const formData = new FormData();

  formData.append("CourseFavoriteId", courseId)


  const response = await Api_Client.delete(
    "/Course/DeleteCourseFavorite",
    {
      data: formData,
    }
  );

  return response.data;
};

export const deleteCourseLike = async (courseLikeId) => {
  const formData = new FormData();

  formData.append('CourseLikeId', courseLikeId)

  const response = await Api_Client.delete(
    "/Course/DeleteCourseLike",
    {
      data: formData,
    }
  );

  return response.data


}


export const deleteCourseDisLike = async (courseDisLikeId) => {
  const formData = new FormData();

  formData.append('CourseDissLikeId', courseDisLikeId)

  const response = await Api_Client.delete(
    "/Course/DeleteCourseDissLike",
    {
      data: formData,
    }
  );

  return response.data


}

export const setCourseRating = async ({ courseId, rateNumber }) => {
  const response = await Api_Client.post("/Course/SetCourseRating", null, {
    params: { CourseId: courseId, RateNumber: rateNumber },
  });
  return response.data;
};