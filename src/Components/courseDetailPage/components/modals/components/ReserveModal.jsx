import Button from "../../../../common/Button";

const ReserveModal = ({ isOpen, onClose, courseTitle })=> {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>
        <div
          className={`relative w-115  h-100 rounded-[32px] bg-bg-main backdrop-blur-3xl  flex flex-col justify-center items-center gap-7 p-7  origin-center transition-transform duration-300 ease-out ${
            isOpen ? "scale-100" : "scale-0"
          }`}
        >
          <h5 className="text-[20px] font-bold text-primary">
            دوره به لیست رزروی های شما اضافه شد!
          </h5>
            <span className="text-base font-medium text-text-dark">{courseTitle}</span>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col justify-center items-center self-start">
              <div className="w-0.5 h-20 border border-border border-dashed"></div>
              <div className="relative w-3 h-3 rounded-full border-2 border-border">
                <span className="absolute w-max right-5 -top-2 text-lg text-text-dark font-bold">
                  رزرو من
                </span>
              </div>

              <div className="w-0.5 h-20 border border-border border-dashed"></div>
              <div className="relative w-3 h-3 rounded-full border-2 border-border">
                <span className="absolute w-max right-5 -top-2 text-lg text-text-dark font-bold">
                  دوره من
                </span>
              </div>
            </div>

            <span className="w-60  text-base font-medium text-text-muted">
              بعد از تایید ادمین ، دوره مورد نظر به لیست{" "}
              <span className="text-text-dark">دوره من</span> شما اضافه خواهد شد
            </span>
          </div>

          <div className="w-full flex flex-row justify-center gap-4 items-center">
            <Button
              content="رزرو من"
              color="bg-primary"
              customStyle="px-16 text-[20px]"
            />

            <Button
              content="باشه"
              color="bg-[#DCDCDC]"
              textColor="text-dark"
              customStyle="px-13 text-[20px]"
              onClick={onClose}
            />
          </div>
        </div>
      
    </div>
  );
};

export default ReserveModal;
