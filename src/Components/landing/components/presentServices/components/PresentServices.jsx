const PresentServices = () => {
  const services = [
    {
      title: "مدرک معتبر",
      description: "با مدرک ما میتوانید به راحتی در همه جا استخدام بشید",
      logo: "document-validation.svg",
      color:'primary'
    },
    {
      title: "مشاوره ۲۴ ساعته",
      description: "مشاورین ما 24 ساعته جوابگو سوال های شما هستند",
      logo: "message-user-01.svg",
      color:'accent-yellow'
    },
    {
      title: "آزمون ها",
      description:
        "با آزمون های تعیین سطح شما میتوانید سطح دانش خودتون رو بسنجید",
      logo: "task-daily.svg",
      color:'danger'
    },
    {
      title: "فرصت‌های شغلی",
      description:
        "با توجه به سطح توانایی شما فرصت های شغلی به شما پیشنهاد داده میشه",
      logo: "job-link.svg",
      color:'badge-purple'
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-30 ">
      <div className=" w-80 text-3xl font-bold text-center ">
        خدماتی که ما در طی دوره‌ها به شما ارائه میدیم
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-166 h-36 border-2 border-border cursor-pointer hover:border-${service.color} hover:scale-105 transition duration-300 bg-bg-main rounded-4xl flex flex-row items-center justify-start gap-5 px-5`}
          >
            <div
              className={`w-22 h-22 rounded-full border-2 bg-bg-main border-border bg-[url('../../assets/icons/${service.logo}.svg')] bg-no-repeat bg-center `}
            >
            </div>

            <div className="flex flex-col items-start gap-3">
              <h4 className="text-[20px] font-bold"> {service.title} </h4>
              <p className="text-md font-regular text-text-muted">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresentServices;
