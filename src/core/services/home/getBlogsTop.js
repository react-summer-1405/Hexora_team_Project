import Api_Client from "../../interceptor/interceptor"

 export const getBlogsTop = async()=>{

    return  await Api_Client.get("/News?RowsOfPage=3")
 }