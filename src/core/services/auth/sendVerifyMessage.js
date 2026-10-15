import Api_Client from "../../interceptor/interceptor";

export const sendVerifyMessageApi = async ({ email }) => {
  const response = await Api_Client.post("/Sign/SendVerifyMessage", {
    gmail: email,
  });

  return response.data;
};
