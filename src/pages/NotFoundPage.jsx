import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/common/Button";


const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-8 sm:gap-10 min-h-screen px-4 py-10">
      <div className="flex flex-row justify-center items-center gap-3 sm:gap-5 motion-safe:animate-bounce">
        <span className="font-bold rounded-2xl sm:rounded-[32px] w-24 h-24 text-[64px] min-[480px]:w-32 min-[480px]:h-32 min-[480px]:text-[88px] md:w-50 md:h-50 md:text-[150px] bg-[#ff6b6b] text-text-light">۴</span>
        <span
          className="flex justify-center items-center leading-none font-bold rounded-2xl sm:rounded-[32px] w-24 h-24 text-[64px] min-[480px]:w-32 min-[480px]:h-32 min-[480px]:text-[88px] md:w-50 md:h-50 md:text-[150px] bg-[#f5d84a] text-[#4A3D00] mb-6 md:mb-10"
        >
          ۰
        </span>
        <span className="font-bold rounded-2xl sm:rounded-[32px] w-24 h-24 text-[64px] min-[480px]:w-32 min-[480px]:h-32 min-[480px]:text-[88px] md:w-50 md:h-50 md:text-[150px] bg-[#7dd8ff] text-[#0F4C6B]">۴</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 text-center max-w-md">
        <h3 className="text-2xl sm:text-[32px] text-text-dark font-extrabold">
          این صفحه پیدا نشد
        </h3>
        <p className="text-text-muted text-sm sm:text-base leading-7">
          آدرسی که وارد کردید وجود ندارد یا جابه‌جا شده است. از لینک‌های زیر
          ادامه بدهید.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 w-full max-w-xs sm:max-w-none">
        <Button
          content="بازگشت به خانه"
          customStyle="w-full sm:w-auto"
          onClick={() => navigate("/")}
        />
        <Button
          content="مشاهده دوره‌ها"
          color="bg-bg-main"
          textColor="primary"
          customStyle="border border-primary p-10 w-full sm:w-auto"
          onClick={() => navigate("/courses")}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <h5 className="text-sm">صفحه‌های پربازدید</h5>
        <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5">
          <Link
            to="/courses"
            className="border border-border py-[7px] px-[18px] rounded-full text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-[0_3px_10px_1px_#888] active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95 select-none transition duration-300"
          >
            دوره‌ها
          </Link>
          <Link
            to="/blogs"
            className="border border-border py-[7px] px-[18px] rounded-full text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-[0_3px_10px_1px_#888] active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95 select-none transition duration-300"
          >
            بلاگ‌ها
          </Link>
          <Link
            to="/contactUs"
            className="border border-border py-[7px] px-[18px] rounded-full text-sm sm:text-base hover:-translate-y-0.5 hover:shadow-[0_3px_10px_1px_#888] active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95 select-none transition duration-300"
          >
            ارتباط با ما
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
