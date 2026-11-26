import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProfileImage, ChangeSecurityInfo, deleteProfileImage, getProfileInfo, getSecurityInfo, selectProfileImage, updateProfileInfo } from "../../core/services/dashboard/profile.api";
import toast from "react-hot-toast";
import { getItem } from "../../core/localStorage/localStorage";


const profileKey = ["userProfile"];

const securityKey = ["userSecurity"];

export const useProfile = () => {
    const token = getItem("token");

  return useQuery({
    queryKey: profileKey,
    queryFn: getProfileInfo,
    staleTime: 5 * 60 * 1000,
    retry: 1,
   enabled: !!token,

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


export const useSecurityInfo = () => {

  return useQuery({
    queryKey: securityKey,
    queryFn: getSecurityInfo,
    staleTime: 5 * 60 * 1000,
    retry: 1,

  });
};


export const useChangeSecurityInfo = ()=>{

    const queryClient = useQueryClient();


  return useMutation({
    mutationFn:ChangeSecurityInfo,
        onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: securityKey });

    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },

  })
}

