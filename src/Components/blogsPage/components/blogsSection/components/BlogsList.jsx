import { keepPreviousData, useQuery } from "@tanstack/react-query";
import warningIcon from "../../../../../assets/icons/Triangle_Warning.svg";
import PendingCard from "../../../../common/PendingCard";
import BlogCard from "../../../../landing/components/topBlogs/components/blogCard/components/BlogCard";
import getBlogsByPagination from "../../../../../core/services/blogs/getBlogsByPagination";
import PaginationBox from "../../../../common/Pagination";

const BlogsList = ({ page,setPage, sortParams, filters  }) => {

  const rowsOfPage = 4;

  const { data, isError, error, isPending, refetch, isFetching } = useQuery({
    queryKey: ["BlogsByPagination", page, rowsOfPage, sortParams, filters],
    queryFn: ({ signal }) =>
      getBlogsByPagination(
        {
          PageNumber: page,
          RowsOfPage: rowsOfPage,
          ...sortParams,
          ...filters,
        },
        signal,
      ),
    placeholderData: keepPreviousData,
  });

  const news = data?.news
  const searchText = filters.Query?.trim();

  const visibleBlogs = searchText
   ? news.filter((c) => c.title.includes(searchText))
    : news;

  

  if (isPending)
    return (
      <div className="flex flex-row flex-wrap gap-6">
        {Array.from({ length: rowsOfPage }, (_, i) => (
          <PendingCard key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="w-full  py-8 px-6">
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

    

  const totalPages = Math.ceil(data.totalCount / rowsOfPage);
  console.log("totalPages",totalPages);
  

if (visibleBlogs.length === 0)
  return (
    <div className="w-full min-h-187 flex items-start justify-center py-8 px-6">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-red-50 p-8 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <img src={warningIcon} className="w-8 h-8" />
        </div>

        <span className="text-lg font-bold text-danger">
          بلاگی پیدا نشد
        </span>

        <span className="text-sm font-medium text-text-muted">
          با فیلترها نتیجه‌ای یافت نشد. فیلترها را
          تغییر بده یا پاکشان کن و دوباره امتحان کن.
        </span>

      </div>
    </div>
  );

return (
  <div className="flex flex-col gap-28 ">
  <div className="min-h-187 flex flex-row   flex-wrap lg:justify-start justify-center items-start gap-8">
    {visibleBlogs.map((blog) => (
      <BlogCard key={blog.id} blog={blog} id={blog.id} />
    ))}
  </div>
  <PaginationBox setPage={setPage} page={page} totalPages={totalPages}/>
  </div>
);

};

export default BlogsList;
