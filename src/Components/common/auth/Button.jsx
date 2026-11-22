import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full max-w-[398px] h-[48px] bg-primary text-white font-semibold rounded-[40px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
