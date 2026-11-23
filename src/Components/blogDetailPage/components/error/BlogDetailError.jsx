import { useNavigate } from "react-router-dom";
import warningIcon from "../../../../assets/icons/Triangle_Warning.svg"

const BlogDetailError = ({ error, refetch, isFetching }) => {
  const navigate = useNavigate();

  const isNotFound = error?.response?.status === 404;

  const title = isNotFound
    ? "این بلاگ پیدا نشد"
    : "دریافت اطلاعات بلاگ با مشکل مواجه شد";

  const description = isNotFound
    ? "ممکنه بلاگ حذف شده باشه یا آدرس اشتباه باشه."
    : error?.message || "لطفاً اتصال اینترنت خود را بررسی کنید.";

  return (
    <div className="w-full py-8 px-6">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
          <img src={warningIcon} alt="" className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="mt-2 flex flex-row flex-wrap items-center justify-center gap-3">
          {!isNotFound && (
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="cursor-pointer rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFetching ? "در حال تلاش..." : "تلاش دوباره"}
            </button>
          )}

          <button
            onClick={() => navigate("/blogs")}
            className="cursor-pointer rounded-full border border-red-200 bg-white px-6 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 active:scale-95"
          >
           بازگشت به بلاگ ها
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailError;