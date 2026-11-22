import { useState } from "react";
import arrow from "../../../../../assets/icons/arrow-down-01.svg";

const RadioSelect = ({ name, selected, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);

  const selectedName = options.find((o) => o.id === selected)?.name;

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer rounded-[16px] bg-bg-field px-3 py-4 text-xs"
      >
        <span>{selectedName || placeholder}</span>
        <img src={arrow} className="w-4 h-4 dark:invert-0 invert" />
      </div>

<div
  className={`absolute top-full inset-x-0 mt-2 z-20 overflow-y-auto rounded-2xl border border-border bg-bg-main origin-top transition-all duration-300 ${
    open
      ? "max-h-56 p-2 opacity-100 translate-y-0"
      : "max-h-0 p-0 opacity-0 -translate-y-2 pointer-events-none border-transparent"
  }`}

      >
        {options.map((o) => (
          <label
            key={o.id}
            className="flex items-center gap-2 cursor-pointer rounded-xl px-3 py-2 text-sm hover:bg-bg-field"
          >
            <input
              type="radio"
              name={name}
              checked={selected === o.id}
              onChange={() => {
                onChange(o.id);
                setOpen(false);
              }}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <span>{o.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioSelect;
