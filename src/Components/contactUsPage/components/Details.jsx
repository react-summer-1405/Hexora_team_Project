import phone from "../../../assets/icons/call.svg";
import mail from "../../../assets/icons/mail.svg";
import location from "../../../assets/icons/location.svg";
import clock from "../../../assets/icons/clock.svg";
import Button from "../../common/Button";
const Details = () => {
      const detailsOfContact = [
    { icon: phone, header: "تلفن پشتیبانی", body: "۰۲۱-۱۲۳۴۵۶۷۸" },
    { icon: mail, header: "ایمیل", body: "info@academy.com" },
    { icon: location, header: "آدرس", body: "تهران، خیابان ولیعصر، پلاک ۰۰" },
    { icon: clock, header: "ساعت پاسخگویی", body: "شنبه تا پنجشنبه، ۹ تا ۱۸" },
  ];
  return (
        <div className=" lg:w-1/3 md:w-2/3 w-full flex flex-col items-center justify-center gap-3 cursor-default">
          {detailsOfContact.map((d) => (
            <div className="rounded-[16px] w-full py-3 border border-border flex flex-row justify-start items-center gap-3">
              <div className="mr-3 flex justify-center shrink-0 items-center rounded-full w-12 h-12 bg-[#eef3ff] border border-[#d5e1ff]">
                <img src={d.icon} className="w-8 h-8" />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <span className=" text-text-muted">{d.header}</span>
                <span className="font-semibold text-text-dark">{d.body}</span>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-start justify-start gap-4 bg-bg-dark rounded-[16px] p-8">
            <h3 className="text-lg font-semibold text-text-light">دنبال پاسخ سریع‌تری؟</h3>
            <p className="text-text-muted text-right">
              پاسخ بیشتر سؤال‌ها درباره ثبت‌نام و دسترسی به دوره‌ها در بخش
              سؤالات متداول آمده است.
            </p>

            <Button content="مشاهده سؤالات متداول" color="bg-primary" />
          </div>
        </div>  )
}

export default Details