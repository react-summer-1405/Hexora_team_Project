import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { replyCourseComment } from "../../../core/services/dashboard/comment.api";

export default function CommentsModal({
  isOpen,
  onClose,
  courseComments = [],
  blogComments = [],
  onRefresh,
}) {
  const [activeTab, setActiveTab] = useState("courses");
  const [replyText, setReplyText] = useState("");
  const [replyTitle, setReplyTitle] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsClosing(false);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: "power2.out" },
      );

      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" },
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleAnimatedClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        onClose();
      },
    });

    tl.to(panelRef.current, {
      opacity: 0,
      y: 12,
      scale: 0.96,
      duration: 0.18,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
      },
      "<",
    );
  };

  if (!isOpen && !isClosing) return null;

  const listToRender = activeTab === "courses" ? courseComments : blogComments;

  const handleSendReply = async (comment) => {
    if (!replyText.trim() || isSending) return;
    setIsSending(true);
    try {
      await replyCourseComment({
        courseId: comment.targetId,
        commentId: comment.id,
        title: replyTitle.trim() || "پاسخ",
        describe: replyText.trim(),
      });
      setReplyTitle("");
      setReplyText("");
      setActiveReplyId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("خطا در ارسال پاسخ:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleAnimatedClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full flex-col rounded-[32px] bg-bg-light p-6 shadow-2xl md:p-8"
        style={{ maxWidth: "850px" }}
      >
        <div className="mb-8 flex shrink-0 flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-text-dark">نظرات شما</h2>

          <div className="flex h-12 items-center overflow-hidden rounded-full bg-gray-100">
            <button
              type="button"
              onClick={() => {
                setActiveTab("courses");
                setActiveReplyId(null);
              }}
              className={`flex h-full items-center justify-center px-6 text-sm font-bold transition-all ${
                activeTab === "courses"
                  ? "rounded-full bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              دوره ها ({courseComments.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("blogs");
                setActiveReplyId(null);
              }}
              className={`flex h-full items-center justify-center px-6 text-sm font-bold transition-all ${
                activeTab === "blogs"
                  ? "rounded-full bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              بلاگ ها ({blogComments.length})
            </button>
          </div>

          <button
            type="button"
            onClick={handleAnimatedClose}
            className="flex items-center gap-2 rounded-full border border-red-500 px-5 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
          >
            بستن
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {listToRender.length === 0 ? (
            <div className="py-12 text-center text-sm text-text-muted">
              نظری در این بخش ثبت نشده است.
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {listToRender.map((comment, idx) => (
                <div
                  key={comment.id || idx}
                  className={`relative flex flex-col gap-4 ${
                    idx === 1 ? "border-r-[3px] border-blue-500 pr-4" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm"
                      />
                      <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-gray-800">
                          {comment.author}
                        </span>
                        <span className="text-[10px] font-medium text-text-dark">
                          {comment.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {comment.targetTitle}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          comment.accepted
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {comment.accepted ? "تایید شده" : "در انتظار تایید"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-right">
                    <h4 className="break-words text-base font-bold text-text-dark">
                      {comment.title}
                    </h4>
                    <p className="break-words text-justify text-sm font-medium leading-7 text-text-dark">
                      {comment.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6 text-text-dark">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">{comment.likes}</span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">
                        {comment.dislikes}
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                      </svg>
                    </div>

                    {activeTab === "courses" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveReplyId(
                            activeReplyId === comment.id ? null : comment.id,
                          )
                        }
                        className="rounded-full border border-blue-500 px-4 py-1.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-50"
                      >
                        جواب دادن
                      </button>
                    )}
                  </div>

                  {activeReplyId === comment.id && (
                    <div className="mt-2 flex w-full flex-col rounded-3xl border border-blue-400 p-1 pl-2">
                      <input
                        type="text"
                        placeholder="عنوان نظر خود را بنویسید"
                        value={replyTitle}
                        onChange={(e) => setReplyTitle(e.target.value)}
                        className="w-full border-b border-gray-100 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-text-dark"
                      />
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="متن نظر خود را بنویسید"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendReply(comment);
                          }}
                          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-text-dark"
                        />
                        <button
                          type="button"
                          disabled={isSending}
                          onClick={() => handleSendReply(comment)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
