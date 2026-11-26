import Api_client from "../../interceptor/interceptor";

export const paymentStepOne = async (reserveId, callbackUrl) => {
  const resolvedCallbackUrl =
    callbackUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/dashboard/payments`
      : "http://localhost:5173/dashboard/payments");

  const response = await Api_client.patch(
    `/NewVersion/CoursePayment/StepOneToPay/${reserveId}`,
    { callbackUrl: resolvedCallbackUrl },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const paymentStepTwo = async (reserveId, payload = {}) => {
  const cleanAuthority = payload.Authority || payload.authority || "";
  const cleanStatus = payload.Status || payload.status || "OK";

  const response = await Api_client.patch(
    `/NewVersion/CoursePayment/StepTwoToPay/${reserveId}`,
    payload,
    {
      params: {
        ...(cleanAuthority ? { Authority: cleanAuthority } : {}),
        Status: cleanStatus,
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
