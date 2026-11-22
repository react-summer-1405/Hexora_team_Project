import Api_Client from "../../interceptor/interceptor"

const getCoursesByPagination = async (params,signal) => {
    const response = await Api_Client.get("/Home/GetCoursesWithPagination", {
        params,
        signal
    });

   
    
    return response.data;
};
export default getCoursesByPagination