import documentValidation from "../../../../../assets/icons/document-validation.svg";
import messageUser from "../../../../../assets/icons/message-user-01.svg";
import taskDaily from "../../../../../assets/icons/task-daily.svg";
import jobLink from "../../../../../assets/icons/job-link.svg";
const ServicesDivisions = () => {
    const services = [
    {
      title: "مدرک معتبر",
      description: "با مدرک ما میتوانید به راحتی در همه جا استخدام بشید",
      logo: documentValidation,
      cardHover: "hover:border-primary",
      iconHover: "group-hover:border-primary",
    },
    {
      title: "مشاوره ۲۴ ساعته",
      description: "مشاورین ما 24 ساعته جوابگو سوال های شما هستند",
      logo: messageUser,
      cardHover: "hover:border-account-yellow",
      iconHover: "group-hover:border-account-yellow",
    },
    {
      title: "آزمون ها",
      description:
        "با آزمون های تعیین سطح شما میتوانید سطح دانش خودتون رو بسنجید",
      logo: taskDaily,
      cardHover: "hover:border-danger",
      iconHover: "group-hover:border-danger",
    },
    {
      title: "فرصت‌های شغلی",
      description:
        "با توجه به سطح توانایی شما فرصت های شغلی به شما پیشنهاد داده میشه",
      logo: jobLink,
      cardHover: "hover:border-badge-purple",
      iconHover: "group-hover:border-badge-purple",
    },
  ];
  return (
         <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`group w-full sm:w-166 py-5 sm:h-36 border-2 border-border cursor-pointer ${service.cardHover} hover:scale-103 transition duration-300 bg-bg-main rounded-4xl flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5 px-5`}
          >
            <div
              className={`w-22 h-22 rounded-full  bg-bg-main  border-2 border-border ${service.iconHover} transition duration-300  flex flex-col items-center justify-center `}
            >
              <img
                src={service.logo}
                alt={service.title}
                className="w-10 h-10 "
              />
            </div>

            <div className="flex flex-col items-start gap-3 text-right">
              <h4 className="text-[20px] font-bold"> {service.title} </h4>
              <p className="text-md font-regular text-text-muted">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
  )
}

export default ServicesDivisions