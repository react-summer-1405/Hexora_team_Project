import axios from "axios";
import { getItem, removeItem } from "../localStorage/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL



const Api_Client = axios.create({

    baseURL: baseURL,
    timeout: 200000,

})

Api_Client.interceptors.request.use((config) => {
    console.log('The request has been sent to the server ', config);

    const token = getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log("token in header =>", config.headers)
    }


    return config
})

Api_Client.interceptors.response.use(


    (response) => {
        console.log("response: fulfilled request=>", response);

        const message = response?.data?.message;

        console.log("message of response =>", message);


        return response
    },

    (error) => {

        const errorStatus = error.response?.status

        console.log("Error code:", error.code);
        console.log("Error message:", error.message);
        console.log("Error response:", error.response?.data);
        console.log("Error status:", errorStatus);


        if (errorStatus === 401) {
            removeItem('token')
        }

        return Promise.reject(error)
    }
)

export default Api_Client
