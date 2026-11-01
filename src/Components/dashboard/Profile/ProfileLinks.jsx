import React, { useState } from "react";

export default function ProfileLinks() {
  const [links, setLinks] = useState({
    telegram: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full flex-col gap-6 text-right" dir="rtl">
      <div className="flex flex-col gap-3">
        <label className="text-[16px] font-[600] text-text-dark">تلگرام</label>
        <input
          type="text"
          name="telegram"
          placeholder="لینک تلگرام خود را وارد کنید"
          value={links.telegram}
          onChange={handleChange}
          className="h-[48px] w-full max-w-[576px] rounded-[24px] border border-[#dcdcdc] bg-bg-main px-5 text-[12px] font-[500] text-text-muted placeholder:text-text-muted outline-none transition-colors focus:border-blue-400"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[16px] font-[600] text-text-dark">لینکدین</label>
        <input
          type="text"
          name="linkedin"
          placeholder="لینک لینکدین خود را وارد کنید"
          value={links.linkedin}
          onChange={handleChange}
          className="h-[48px] w-full max-w-[576px] rounded-[24px] border border-[#dcdcdc] bg-bg-main px-5 text-[12px] font-[500] text-text-muted placeholder:text-text-muted outline-none transition-colors focus:border-blue-400"
        />
      </div>
    </div>
  );
}
