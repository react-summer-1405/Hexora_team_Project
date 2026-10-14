import Api_Client from "../../interceptor/interceptor"

 export const getCoursesTop = async()=>{

    return  await Api_Client.get("/Home/GetCoursesTop")
 }