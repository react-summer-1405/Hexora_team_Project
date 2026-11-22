import Api_client from "../../interceptor/interceptor";

export const getMyFavoriteNews = async () => {
  const response = await Api_client.get("/SharePanel/GetMyFavoriteNews");
  return response.data;
};
