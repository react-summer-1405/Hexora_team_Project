import BlogCard from "./blogCard/components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getBlogsTop } from "../../../../../core/services/home/getBlogsTop";
import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import PendingCard from "../../../../common/PendingCard";

const TopBlogsList = () => {
 

  const {
    data: topBlogs,
    isError,
    error,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["blogsTop"],
    queryFn: getBlogsTop,
  });


  if (isPending) return (
          <div className="flex flex-row flex-wrap gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <PendingCard key={i} />
        ))}
      </div>
  )


  if (isError)
    return (
      <div className="w-full max-w-343 py-8 px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
            <img src={warningIcon} className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            دریافت دوره‌ها با مشکل مواجه شد
          </h3>
          <p className="text-sm text-gray-500">
            {error?.message || "لطفاً اتصال اینترنت خود را بررسی کنید."}
          </p>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="cursor-pointer rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "در حال تلاش..." : "تلاش دوباره"}
          </button>
        </div>
      </div>
    );

    const result = topBlogs.data.news;

  if (topBlogs)
    return (

        <div
          className={` w-max max-w-350 overflow-hidden  py-5 px-6  flex flex-row  justify-start items-center gap-7  `}
        >
          {result.map((blog ) => (
            <div className="flex" key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>


    );
};

export default TopBlogsList;
