import React, { useState } from "react";

export default function CommentsModal({ isOpen, onClose, comments }) {
  const [activeTab, setActiveTab] = useState("courses");
  const [replyText, setReplyText] = useState("");
  const [replyTitle, setReplyTitle] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <div
        className="flex w-full flex-col max-h-[85vh] rounded-[32px] bg-white p-6 shadow-2xl md:p-8"
        style={{ maxWidth: "850px" }}
      >
        <div className="mb-8 flex items-center justify-between shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">نظرات شما</h2>

          <div className="flex h-12 items-center overflow-hidden rounded-full bg-gray-100">
            <button
              onClick={() => setActiveTab("courses")}
              className={`flex h-full items-center justify-center px-6 text-sm font-bold transition-all ${
                activeTab === "courses"
                  ? "rounded-full bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              دوره ها
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex h-full items-center justify-center px-6 text-sm font-bold transition-all ${
                activeTab === "blogs"
                  ? "rounded-full bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              بلاگ ها
            </button>
          </div>

          <button
            onClick={onClose}
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
          <div className="flex flex-col gap-8">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`relative flex flex-col gap-4 ${
                  comment.hasBorder ? "border-r-[3px] border-blue-500 pr-4" : ""
                }`}
              >
                <div className="flex items-center justify-end gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-gray-800">
                      {comment.author}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">
                      {comment.date}
                    </span>
                  </div>
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2 text-right">
                  <h4 className="text-base font-bold text-gray-800">
                    {comment.title}
                  </h4>
                  <p className="text-justify text-sm font-medium leading-7 text-gray-600">
                    {comment.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-6 text-gray-600">
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

                  {!comment.hasBorder && (
                    <button
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
                      className="w-full border-b border-gray-100 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                    />
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="متن نظر خود را بنویسید"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                      />
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-500 opacity-50 transition-opacity hover:opacity-100">
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
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                          </svg>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600">
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
