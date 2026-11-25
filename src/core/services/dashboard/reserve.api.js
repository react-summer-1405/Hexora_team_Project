import Api_client from "../../interceptor/interceptor";

export const getMyCoursesReserve = async () => {
  const response = await Api_client.get("/SharePanel/GetMyCoursesReserve");
  return response.data;
};
