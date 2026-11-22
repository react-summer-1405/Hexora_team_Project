import Api_Client from "../interceptor/interceptor";

export const loginApi = async (userData) => {
  const response = await Api_Client.post("/auth/login", userData);
  return response.data;
};
