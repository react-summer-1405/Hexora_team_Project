import Api_Client from "../../interceptor/interceptor";

export const getUnseenAlerts = async () => {
  const response = await Api_Client.get("/v2/notification/alert/mineNoSeen");
  return response.data;
};

export const getAllAlerts = async () => {
  const response = await Api_Client.get("/v2/notification/alert/mineAll");
  return response.data;
};

export const seeAlert = async (id) => {
  const response = await Api_Client.patch(`/v2/notification/alert/see/${id}`);
  return response.data;
};