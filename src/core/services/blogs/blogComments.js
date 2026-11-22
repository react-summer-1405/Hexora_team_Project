import Api_Client from "../../interceptor/interceptor"

export const getBlogComments = async (id) => {
    const response = await Api_Client.get(
        `/News/GetNewsComments?NewsId=${id}`
    );

    return response.data;
};

export const getBlogReplyComments = async (commentId) => {
    const response = await Api_Client.get(
        `/News/GetRepliesComments?Id=${commentId}`
    );

    return response.data;
};

export const CommentLike = async (commentId) => {
    const response = await Api_Client.post(
        `/News/CommentLike/${commentId}?LikeType=true`
    );

    return response.data;
};


export const deleteCommentLike = async (commentLikeId) => {
    const response = await Api_Client.delete(
        `/News/DeleteCommentLikeNews`, {
        data: {
            deleteEntityId: commentLikeId,
        }
    });

    return response.data;
};


export const createBlogComment = async ({
    newsId,
    title,
    describe,
    userId,
}) => {
    const response = await Api_Client.post("/News/CreateNewsComment", {
        newsId,
        title,
        describe,
        userId,
    });

    return response.data;
};


export const createBlogReplyComment = async ({
    newsId,
    title,
    describe,
    userId,
    commentId:parentId
}) => {
    const response = await Api_Client.post("/News/CreateNewsReplyComment", {
        newsId,
        title,
        describe,
        userId,
        parentId
    });

    return response.data;
};

