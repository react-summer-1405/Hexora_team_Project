import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../../core/services/dashboard/course.api";

export const useCourses = (params = {}) => {
  return useQuery({
    queryKey: ["myCourses", params],
    queryFn: () => getMyCourses(params),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
