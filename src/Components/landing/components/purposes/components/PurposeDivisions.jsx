const PurposeDivisions = () => {
  const purposes = [
    {
      title: "استعدادیابی",
      description:
        "یافتن رگه های علاقه و استعداد در دوره های پایلوت استعدادیابی صرف نظر از سن ، رشته تحصیلی ، جغرافیا و جنسیت و ...",
      image: "../assets/images/purpose1.png",
    },
    {
      title: "راهنمایی و ایجاد انگیزه",
      description:
        "آشنایی با پشته ای تکنولوژیک از زبان های کدنویسی با نگاهی عمل محور برای تحریک ذهنیت خلاق در طول فرآیند آموزش",
         image: "../../../../../assets/images/purpose1.png",
    },
    {
      title: "آموزش‌های تخصصی",
      description:
        "کارگاه های تخصصی و تکمیلی برای کار با پلتفرم های بازاری مورد اقبال و برگزاری تورنمت های تیمی رقابتی برای تقویت روحیه کار تیمی و ...",
        image: "../../../../../assets/images/purpose1.png",
    },
    {
      title: "آماده سازی برای بازار کار",
      description:
        "جلسات تنظیم cv برای ساخت‌واشتراک رزومه فنی دربسترهای داخلی و بین المللی کاریابی و آماده سازی برای شرکت ها",
        image: "../../../../../assets/images/purpose1.png",
    },
  ];
  return (
    <div
      className={`my-20  bg-[url("../../assets/icons/curlyLine.svg")] w-full bg-no-repeat bg-contain bg-center flex flex-row justify-center items-center gap-10 `}
    >
      {purposes.map((purpose, index) => (
        <div key={index} className="cursor-pointer w-80 h-108 rounded-3xl border-2 border-border hover:border-primary hover:scale-105 transition duration-300 bg-bg-main flex flex-col items-start justify-between p-5 gap-5 text-right">
          <h4 className="text-[20px] font-bold">{purpose.title}</h4>
          <p className="text-md font-medium text-text-muted">{purpose.description}</p>
          <img src={purpose.image} alt={purpose.title} />
        </div>
      ))}
    </div>
  );
};

export default PurposeDivisions;
