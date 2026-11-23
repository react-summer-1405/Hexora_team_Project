import Api_client from "../../interceptor/interceptor";

export const getMyFavoriteCourses = async () => {
  const response = await Api_client.get("/SharePanel/GetMyFavoriteCourses");
  return response.data;
};
