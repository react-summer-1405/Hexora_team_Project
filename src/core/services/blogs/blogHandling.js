import Api_Client from "../../interceptor/interceptor"


export const addLikeForBlog = async (blogId) => {
  const response = await Api_Client.post(
    `/News/NewsLike/${blogId}`
  );
  return response.data;
};

export const addDislikeForBlog = async (blogId) => {
  const response = await Api_Client.post(
    `/News/NewsDissLike/${blogId}`
  );
  return response.data;
};

export const addBlogFavorite = async (blogId) => {

  const response = await Api_Client.post(
    `/News/AddFavoriteNews?NewsId=${blogId}`
  );
  return response.data;
}

export const deleteBlogFavorite = async (blogFavoriteId) => {

  const response = await Api_Client.delete(
    "/News/DeleteFavoriteNews", {
    
     data:{ deleteEntityId: blogFavoriteId}   
    }
  
  );

  return response.data;
};

export const deleteBlogLike = async (blogLikeId) => {


  const response = await Api_Client.delete(
    "/News/DeleteLikeNews", {
    data: {
      deleteEntityId: blogLikeId,
    }
  }
  );

  return response.data


}


export const setBlogRating = async ({ blogId, rateNumber }) => {
  const response = await Api_Client.post("/News/NewsRate", null, {
    params: { NewsId: blogId, RateNumber: rateNumber },
  });
  return response.data;
};