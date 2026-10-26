import grayStar from "../../../../../assets/icons/details/grayStar.svg";
import yellowStar from "../../../../../assets/icons/details/yellowStar.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setBlogRating } from "../../../../../core/services/blogs/blogHandling";

const Description = ({ miniDescribe, describe, blogId , userRate: serverUserRate = 0  }) => {

  const queryClient = useQueryClient();


  const [hoverRate, setHoverRate] = useState(0);
  const [userRate, setUserRate] = useState(serverUserRate);

  useEffect(() => {
    setUserRate(serverUserRate);
  }, [serverUserRate, blogId]);

  const ratingMutation = useMutation({
    mutationFn: (rateNumber) => setBlogRating({ blogId, rateNumber }),
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
      queryClient.invalidateQueries({ queryKey: ["getBlogById"] });
    },
  });

  const activeRate = hoverRate || userRate;

  const handleRate = (rate) => {
    if (ratingMutation.isPending) return;
    ratingMutation.mutate(rate);
  };

  

  return (
    <div className="flex flex-col gap-4 items-start text-right cursor-default">
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

      </div>
    </div>
  );
};

export default Description;
