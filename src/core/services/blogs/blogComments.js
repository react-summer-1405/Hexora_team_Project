import Api_Client from "../../interceptor/interceptor"

export const getBlogComments = async(id)=>{

    const response = await Api_Client.get(`/News/GetNewsComments?NewsId=${id}`
        
    )

   return response.data
}