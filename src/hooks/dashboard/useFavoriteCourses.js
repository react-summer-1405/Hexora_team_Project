import { useQuery } from "@tanstack/react-query";
import { getMyFavoriteCourses } from "../../core/services/dashboard/favorite.api";

export const useFavoriteCourses = () => {
  return useQuery({
    queryKey: ["favorite-courses"],
    queryFn: getMyFavoriteCourses,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
