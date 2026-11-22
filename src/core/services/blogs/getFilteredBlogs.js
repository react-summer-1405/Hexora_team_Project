import Api_Client from "../../interceptor/interceptor";

const getBlogsTech =  async () => { 

const response = await Api_Client.get("/News/GetListNewsCategory");

return response.data
}


export default getBlogsTech