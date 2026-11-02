import Api_Client from "../../interceptor/interceptor"

 export const getCoursesTop = async(count=4)=>{

    return  await Api_Client.get(`/Home/GetCoursesTop?Count=${count}`)
 }