import Api_Client from "../../interceptor/interceptor"

const getBlogById = async(id) => {

const response = await Api_Client.get(`/News/${id}`)

return response.data.detailsNewsDto
 
}

export default getBlogById