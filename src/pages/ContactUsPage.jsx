import CaptionOfTitle from "../Components/common/texts/CaptionOfTitle";
import Details from "../Components/contactUsPage/components/Details";
import ContactForm from "../Components/contactUsPage/components/ContactForm";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-28">
      <div className="flex flex-col gap-10 select-none">
        <h3 className="lg:text-[34px] lg:font-bold text-3xl font-semibold">
          با ما در ارتباط باشید
        </h3>
        <CaptionOfTitle content="سؤال یا پیشنهادی دارید؟ پیام بگذارید تا در کمتر از ۲۴ ساعت پاسخ بدهیم." />
      </div>
      <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center gap-10  w-full lg:px-15">
        <ContactForm />
        <Details />
      </div>
    </div>
  );
};

export default ContactUsPage;
