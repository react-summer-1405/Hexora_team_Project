import grayStar from "../../../../../assets/icons/details/grayStar.svg";
import attachment from "../../../../../assets/icons/details/attachment.svg";
import Button from "../../../../common/Button";

const Description = ({ miniDescribe, describe }) => {
  const handleCopy = () => navigator.clipboard.writeText(window.location.href);

  return (
    <div className="flex flex-col gap-4 items-start text-right">
      <h6 className="text-[20px] font-bold text-text-muted">توضیحات دوره</h6>
      {miniDescribe && (
        <p className="text-base font-bold text-text-dark">{miniDescribe}</p>
      )}
      <p className="text-base font-medium text-text-dark whitespace-pre-line">
        {describe}
      </p>
      <div className="flex flex-row justify-center items-center gap-4">
        <span className="text-base font-semibold text-primary">امتیاز بدید</span>
        <div className="flex flex-row gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <img key={i} src={grayStar} className="w-7 h-7" />
          ))}
        </div>
        <Button
          content="کپی کردن لینک صفحه"
          customStyle="border border-primary"
          textColor="primary"
          color="bg-bg-main"
          icon={attachment}
          onClick={handleCopy}
        />
      </div>
    </div>
  );
};

export default Description;