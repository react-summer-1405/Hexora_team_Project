import purpose1 from "../../../../../assets/images/purpose1.png";
import purpose2 from "../../../../../assets/images/purpose2.png";
import purpose3 from "../../../../../assets/images/purpose3.png";
import purpose4 from "../../../../../assets/images/purpose4.png";
import CurlyLine from "../../../../../assets/icons/curlyLine.svg?react";

const PurposeDivisions = () => {
  const purposes = [
    {
      title: "استعدادیابی",
      description:
        "یافتن رگه های علاقه و استعداد در دوره های پایلوت استعدادیابی صرف نظر از سن ، رشته تحصیلی ، جغرافیا و جنسیت و ...",
      image: purpose1,
    },
    {
      title: "راهنمایی و ایجاد انگیزه",
      description:
        "آشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزش",
      image: purpose2,
    },
    {
      title: "آموزش‌های تخصصی",
      description:
        "کارگاه های تخصصی و تکمیلی برای کار با پلتفرم های بازاری مورد اقبال و برگزاری تورنمت های تیمی رقابتی برای تقویت روحیه کار تیمی و ...",
      image: purpose3,
    },
    {
      title: "آماده سازی برای بازار کار",
      description:
        "جلسات تنظیم cv برای ساخت‌واشتراک رزومه فنی دربسترهای داخلی و بین المللی کاریابی و آماده سازی برای شرکت ها",
      image: purpose4,
    },
  ];
  return (
    <div
      className={`relative my-5  w-full  flex flex-wrap lg:flex-nowrap flex-row justify-center items-center gap-10 `}
    >
      <CurlyLine className="curly-line absolute inset-0 w-full h-full pointer-events-none lg:block hidden" />
      {purposes.map((purpose, index) => (
        <div
          key={index}
          className="divisions relative cursor-pointer w-80 h-108 rounded-3xl border-2 border-border hover:border-primary hover:scale-105 transition duration-300 bg-bg-main flex flex-col items-start justify-between p-5 gap-5 text-right"
        >
          <h4 className="text-[20px] font-bold">{purpose.title}</h4>
          <p className="text-md font-medium text-text-muted">
            {purpose.description}
          </p>
          <img
            src={purpose.image}
            alt={purpose.title}
            className="w-65 h-65 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default PurposeDivisions;
