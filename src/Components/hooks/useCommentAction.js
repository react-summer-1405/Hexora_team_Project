import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourseComment, addReplyComment, dislikeComment, likeComment } from "../../core/services/courses/courseComments";
import toast from "react-hot-toast";

const errMsg = (e) => e.response?.data?.message || "مشکلی پیش آمد";


export const useCommentActions = (courseId, parentId = null) => {
  const qc = useQueryClient();
  const listKey = parentId
    ? ["courseReplies", courseId, parentId]
    : ["courseComments", courseId];

  const patch = (commentId, updater) =>
    qc.setQueryData(listKey, (old) =>
      old?.map((c) => (c.id === commentId ? updater(c) : c))
    );

  const reaction = (apiFn, updater ) => ({
    mutationFn: (commentId) => apiFn(commentId),
    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: listKey });
      const prev = qc.getQueryData(listKey);
      patch(commentId, updater);
      return { prev };
    },


    onError: (error, _id, ctx) => {
      qc.setQueryData(listKey, ctx?.prev);
      toast.error(errMsg(error));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: listKey }),
  });

  const like = useMutation(
    reaction(likeComment, (c) => ({
      ...c,
      currentUserIsLike: !c.currentUserIsLike,
      likeCount: c.likeCount + (c.currentUserIsLike ? -1 : 1),

      currentUserIsDissLike: c.currentUserIsLike ? c.currentUserIsDissLike : false,
      disslikeCount:
        c.disslikeCount - (!c.currentUserIsLike && c.currentUserIsDissLike ? 1 : 0),
    }))
  );

  const dislike = useMutation(
    reaction(dislikeComment, (c) => ({
      ...c,
      currentUserIsDissLike: !c.currentUserIsDissLike,
      disslikeCount: c.disslikeCount + (c.currentUserIsDissLike ? -1 : 1),
      currentUserIsLike: c.currentUserIsDissLike ? c.currentUserIsLike : false,
      likeCount:
        c.likeCount - (!c.currentUserIsDissLike && c.currentUserIsLike ? 1 : 0),
    }))
  );

  const addComment = useMutation({
    mutationFn: ({ title, describe }) =>
      addCourseComment({ courseId, title, describe }),
    onSuccess: (data) => toast.success(data?.message || "نظر شما ثبت شد"),
    onError: (e) => toast.error(errMsg(e)),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: ["courseComments", courseId] }),
  });

  const addReply = useMutation({
    mutationFn: ({ commentId, title, describe }) =>
      addReplyComment({ courseId, commentId, title, describe }),
    onSuccess: (data) => toast.success(data?.message || "جواب شما ثبت شد"),
    onError: (e) => toast.error(errMsg(e)),
    onSettled: (_d, _e, vars) =>
      qc.invalidateQueries({
        queryKey: ["courseReplies", courseId, vars.commentId],
      }),
  });

  return { like, dislike, addComment, addReply };
};