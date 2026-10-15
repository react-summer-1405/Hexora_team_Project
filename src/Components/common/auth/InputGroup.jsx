import React from "react";

export default function InputGroup({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  labelClassName = "",
  error,
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className={`w-full text-right text-[13px] font-semibold text-text-dark md:text-base ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-12 w-full rounded-3xl border px-4 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-[var(--color-border)] focus:ring-primary"
        }`}
      />
      {error && (
        <span className="text-right text-xs text-red-500 mt-1 pl-2">
          {error}
        </span>
      )}
    </div>
  );
}
