import { useQuery } from "@tanstack/react-query";
import { getMyFavoriteNews } from "../../core/services/dashboard/favoriteNews.api";

export const useFavoriteNews = () => {
  return useQuery({
    queryKey: ["favorite-news"],
    queryFn: getMyFavoriteNews,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
