import React from "react";

export default function InputGroup({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  labelClassName = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`text-base text-text-dark font-semibold ${labelClassName}`}
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
        className="w-full max-w-[398px] h-12 px-4 border border-[var(--color-border)] rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
