import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CommentLike, createBlogComment, createBlogReplyComment, deleteCommentLike } from "../../core/services/blogs/blogComments";
import { use } from "react";

const errMsg = (e) => e.response?.data?.message || "مشکلی پیش آمد";


export const useCommentActionBlog = (blogId, parentId = null) => {
    const qc = useQueryClient();
    const listKey = parentId
        ? ["blogReplies", blogId, parentId]
        : ["blogComments", blogId];

        
  const like = useMutation({
    mutationFn: ({ commentId, wasLiked, commentLikeId }) => {
      return wasLiked
        ? deleteCommentLike(commentLikeId)
        : CommentLike(commentId);
    },

    onMutate: async ({ commentId, wasLiked }) => {
      await qc.cancelQueries({ queryKey: listKey });

      const prev = qc.getQueryData(listKey);

      qc.setQueryData(listKey, (old) =>
        old?.map((c) => {
          if (c.id !== commentId) return c;

          return {
            ...c,
            currentUserIsLike: !wasLiked,
            likeCount: Math.max(
              0,
              c.likeCount + (wasLiked ? -1 : 1)
            ),
            currentUserLikeId: wasLiked
              ? null
              : c.currentUserLikeId,
          };
        })
      );

      return { prev };
    },

    onSuccess: (response) => {
      toast.success(
        response?.data?.message ||
          response?.message ||
          "عملیات با موفقیت انجام شد"
      );
    },

    onError: (error, _, ctx) => {
      if (ctx?.prev !== undefined) {
        qc.setQueryData(listKey, ctx.prev);
      }

      toast.error(errMsg(error));
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: listKey });
    },
  });




const newsId = blogId

    const addComment = useMutation({
        mutationFn: ({ title, describe , userId }) =>
            createBlogComment({ newsId, title, describe,userId }),
        onSuccess: (data) => toast.success(data?.message || "نظر شما ثبت شد"),
        onError: (e) => toast.error(errMsg(e)),
        onSettled: () =>
            qc.invalidateQueries({ queryKey: ["blogComments", blogId] }),
    });

     const addReply = useMutation({
         mutationFn: ({ commentId, title, describe , userId }) =>
             createBlogReplyComment({ newsId, commentId, title, describe , userId }),
       onSuccess: (data) => toast.success(data?.message || "جواب شما ثبت شد"),
         onError: (e) => toast.error(errMsg(e)),
         onSettled: (data, error, vars) =>
             qc.invalidateQueries({
                 queryKey: ["blogReplies", blogId, vars.commentId],
             }),
     });

    return { like,addComment ,addReply  };
};