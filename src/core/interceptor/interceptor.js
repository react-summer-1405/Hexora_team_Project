import axios from "axios";
import { removeItem } from "../localStorage/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

const Api_Client = axios.create({
  baseURL: baseURL,
  timeout: 7000,
});

Api_Client.interceptors.request.use((config) => {
  console.log("The request has been sent to the server ", config);

  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log("header =>", config.headers);

  return config;
});

Api_Client.interceptors.response.use(
  (response) => {
    console.log("response: fulfilled request=>", response);

    const message = response?.data?.message;

    console.log(message);

    return response;
  },

  (error) => {
    console.error(`interceptor response: failed request =>${error}`);
    console.error("errorData =>", error.response?.data);

    const errorStatus = error.response?.status;

    if (errorStatus === 401) {
      removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default Api_Client;
