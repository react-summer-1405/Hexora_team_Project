import Api_Client from "../../interceptor/interceptor";

const getBlogsByPagination = async(params,signal) => {
    const response = await Api_Client.get("/News", {
        params,
        signal
    });
  return (
    response.data
  )
}

export default getBlogsByPagination