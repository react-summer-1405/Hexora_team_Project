import { useNavigate } from "react-router-dom";
import Button from "../../../../common/Button";

const ReserveModal = ({ isOpen, onClose, courseTitle }) => {
 const navigate = useNavigate()
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

      <div
        className={`relative w-full max-w-115 max-h-full overflow-y-auto rounded-3xl sm:rounded-[32px]
        bg-bg-main backdrop-blur-3xl flex flex-col justify-center items-center
        gap-5 sm:gap-7 p-5 sm:p-7 origin-center transition-transform duration-300 ease-out ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        <h5 className="text-lg sm:text-[20px] font-bold text-primary text-center">
          دوره به لیست رزروی های شما اضافه شد!
        </h5>

        <span className="text-sm sm:text-base font-medium text-text-dark text-center">
          {courseTitle}
        </span>

        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <div className="flex flex-col justify-center items-center self-start shrink-0">
            <div className="w-0.5 h-14 sm:h-20 border border-border border-dashed"></div>
            <div className="relative w-3 h-3 rounded-full border-2 border-border">
              <span className="absolute w-max right-5 -top-2 text-base sm:text-lg text-text-dark font-bold">
                رزرو من
              </span>
            </div>

            <div className="w-0.5 h-14 sm:h-20 border border-border border-dashed"></div>
            <div className="relative w-3 h-3 rounded-full border-2 border-border">
              <span className="absolute w-max right-5 -top-2 text-base sm:text-lg text-text-dark font-bold">
                دوره من
              </span>
            </div>
          </div>

          <span className="flex-1 max-w-60 w-min text-sm sm:text-base font-medium text-text-muted">
             بعد از تایید ادمین ، دوره مورد نظر به لیست
            <span className="text-text-dark">  دوره من </span> شما اضافه خواهد شد 
          </span>
        </div>

        <div className="w-full flex flex-row justify-center gap-3 sm:gap-4 items-stretch sm:items-center">
          <Button
            content="رزرو من"
            color="bg-primary"
            customStyle="w-full sm:w-auto sm:px-16 text-lg sm:text-[20px]"
            onClick={()=>{navigate('/dashboard/my-reserve')}}
          />

          <Button
            content="باشه"
            color="bg-bg-dark"
            customStyle="w-full sm:w-auto sm:px-13 text-lg sm:text-[20px]"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ReserveModal;