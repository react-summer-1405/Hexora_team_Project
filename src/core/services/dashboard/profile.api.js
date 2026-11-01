import Api_client from "../../interceptor/interceptor";

export const getProfileInfo = async () => {
  const response = await Api_client.get("/SharePanel/GetProfileInfo");
  return response.data;
};
