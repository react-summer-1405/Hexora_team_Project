import Api_client from "../../interceptor/interceptor";

export const getMyCourses = async ({
  page = 1,
  rows = 10,
  search = "",
  sortingCol = "DESC",
  sortType = "LastUpdate",
} = {}) => {
  const response = await Api_client.get("/SharePanel/GetMyCourses", {
    params: {
      PageNumber: page,
      RowsOfPage: rows,
      SortingCol: sortingCol,
      SortType: sortType,
      Query: search,
    },
  });
  return response.data;
};
