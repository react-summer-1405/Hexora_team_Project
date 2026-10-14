import Api_Client from "../../interceptor/interceptor";

export const loginApi = async (data) => {
  const response = await Api_Client.post("/Sign/Login", data);
  return response.data;
};

export const sendVerifyMessageApi = async ({ gmail }) => {
  const response = await Api_Client.post("/Sign/SendVerifyMessage", {
    gmail: gmail.trim(),
  });

  return response.data;
};

export const verifyMessageApi = async ({ phoneNumber, verifyCode }) => {
  const response = await Api_Client.post("/Sign/VerifyMessage", {
    phoneNumber,
    verifyCode,
  });

  return response.data;
};

export const registerApi = async (data) => {
  const response = await Api_Client.post("/Sign/Register", data);
  return response.data;
};
export const forgotPasswordApi = async (data) => {
  const response = await Api_Client.post("/Sign/ForgetPassword", data);
  return response.data;
};
export const resetPasswordApi = async (data) => {
  const response = await Api_Client.post("/Sign/Reset", data);
  return response.data;
};
