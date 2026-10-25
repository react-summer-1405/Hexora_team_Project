import grayStar from "../../../../../assets/icons/details/grayStar.svg";
import yellowStar from "../../../../../assets/icons/details/yellowStar.svg";
import attachment from "../../../../../assets/icons/details/attachment.svg";
import Button from "../../../../common/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { setCourseRating } from "../../../../../core/services/courses/courseHandling";
import toast from "react-hot-toast";

const Description = ({ miniDescribe, describe, courseId , userRate: serverUserRate = 0  }) => {
  const handleCopy = () => navigator.clipboard.writeText(window.location.href);

  const queryClient = useQueryClient();


  const [hoverRate, setHoverRate] = useState(0);
  const [userRate, setUserRate] = useState(serverUserRate);

  useEffect(() => {
    setUserRate(serverUserRate);
  }, [serverUserRate, courseId]);

  const ratingMutation = useMutation({
    mutationFn: (rateNumber) => setCourseRating({ courseId, rateNumber }),
    onMutate: (rateNumber) => {
      const prev = userRate;
      setUserRate(rateNumber)
      return { prev };
    },
    onError: (error, _rate, context) => {
      setUserRate(context?.prev ?? 0); 
      toast.error(error.response?.data?.message || "مشکلی پیش آمد");
    },
    onSuccess: (data) => toast.success(data?.message || "امتیاز شما ثبت شد"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourseById"] });
    },
  });

  const activeRate = hoverRate || userRate;

  const handleRate = (rate) => {
    if (ratingMutation.isPending) return;
    ratingMutation.mutate(rate);
  };

  

  return (
    <div className="flex flex-col gap-4 items-start text-right cursor-default">
      <h6 className="text-[20px] font-bold text-text-muted">توضیحات دوره</h6>
      {miniDescribe && (
        <p className="text-base font-bold text-text-dark">{miniDescribe}</p>
      )}
      <p className="text-base font-medium text-text-dark whitespace-pre-line">
        {describe}
      </p>
      <div className="flex flex-row flex-wrap justify-start items-center gap-4">
        <span className="text-base font-semibold text-primary">
          امتیاز بدید
        </span>
        <div
          className="flex flex-row gap-0.5"
          onMouseLeave={() => setHoverRate(0)}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                disabled={ratingMutation.isPending}
                onMouseEnter={() => setHoverRate(value)}
                onClick={() => handleRate(value)}
                className="cursor-pointer"
              >
                <img
                  src={value <= activeRate ? yellowStar : grayStar}
                  alt={`${value} ستاره`}
                  className="w-7 h-7"
                />
              </button>
            );
          })}
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
