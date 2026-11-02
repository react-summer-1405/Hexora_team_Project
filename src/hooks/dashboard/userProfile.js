import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProfileImage, deleteProfileImage, getProfileInfo, selectProfileImage, updateProfileInfo } from "../../core/services/dashboard/profile.api";
import toast from "react-hot-toast";


const profileKey = ["userProfile"];

export const useProfile = () => {
  return useQuery({
    queryKey: profileKey,
    queryFn: getProfileInfo,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};



export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: profileKey });
      } else {
        toast.error(data?.message || "ویرایش پروفایل انجام نشد");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });
};

export const useAddProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProfileImage,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: profileKey });
      } else {
        toast.error(data?.message || "آپلود تصویر انجام نشد");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });
};

export const useSelectProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectProfileImage,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: profileKey });
      } else {
        toast.error(data?.message || "انتخاب عکس پروفایل انجام نشد");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });
};

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: profileKey });
      } else {
        toast.error(data?.message || "حذف عکس انجام نشد");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });
};