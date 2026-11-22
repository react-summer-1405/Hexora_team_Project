import { useState } from "react";
import arrow from "../../../../../assets/icons/arrow-down-01.svg";

const SelectTech = ({ selected, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((v) => v !== id)
        : [...selected, id],
    );
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer rounded-[16px] bg-bg-field px-3 py-4 text-xs"
      >
        <span>
          {selected.length ? `${selected.length} مورد انتخاب شده` : placeholder}
        </span>
        <img src={arrow} className="w-4 h-4 dark:invert-0 invert" />
      </div>

      <div
        className={`absolute top-full inset-x-0 mt-2 z-20  overflow-y-auto p-2 rounded-2xl border border-border bg-bg-main origin-top transition-all duration-300 ${
          open
            ? "max-h-56 visible opacity-100  translate-y-0 "
            : "max-h-0 invisible opacity-0  -translate-y-2  pointer-events-none"
        }`}
      >
        {options.map((o) => (
          <label
            key={o.id}
            className="flex items-center gap-2 cursor-pointer rounded-xl px-3 py-2 text-sm hover:bg-bg-field"
          >
            <input
              type="checkbox"
              checked={selected.includes(o.id)}
              onChange={() => toggleOption(o.id)}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <span>{o.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectTech;
