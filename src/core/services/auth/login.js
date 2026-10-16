import Api_Client from "../../interceptor/interceptor";

export const loginApi = async (data) => {
  const response = await Api_Client.post("/Sign/Login", data);
  return response.data;
};

export const sendVerifyMessageApi = async ({ email }) => {
  const response = await Api_Client.post("/Sign/SendVerifyMessage", {
    gmail: email,
  });

  return response.data;
};

export const verifyMessageApi = async ({ email, verifyCode }) => {
  const response = await Api_Client.post("/Sign/VerifyMessage", {
    gmail: email,
    verifyCode,
  });
  return response.data;
};

export const registerApi = async (data) => {
  const response = await Api_Client.post("/Sign/Register", data);
  return response.data;
};

export const forgotPasswordApi = async ({ email, baseUrl }) => {
  const response = await Api_Client.post("/Sign/ForgetPassword", {
    email: email.trim(),
    baseUrl,
  });

  return response.data;
};
export const resetPasswordApi = async ({ email, newPassword, resetValue }) => {
  const response = await Api_Client.post("/Sign/Reset", {
    gmail: email.trim(),
    newPassword,
    resetValue: resetValue.trim(),
  });

  return response.data;
};