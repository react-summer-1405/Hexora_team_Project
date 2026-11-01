import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../../core/services/dashboard/profile.api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfileInfo,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
