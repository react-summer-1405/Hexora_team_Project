import React from "react";

export default function ProfileLocation() {
  return (
    <div className="flex w-full flex-col gap-6 text-right" dir="rtl">
      <h3 className="text-[16px] font-[600] text-[#3772ff]">
        داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید
      </h3>

      <div className="h-[404px] w-full max-w-[830px] overflow-hidden rounded-[16px] bg-[#e5e5e5] shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102030.73037803323!2d53.05608355!3d36.56586025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8aeb9d31bd1df9%3A0x6b8bcbd0e199d501!2sSari%2C%20Mazandaran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="نقشه موقعیت مکانی"
        ></iframe>
      </div>
    </div>
  );
}
