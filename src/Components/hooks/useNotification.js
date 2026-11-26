import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getAllAlerts,
    getUnseenAlerts,
    seeAlert
} from "../../core/services/notification/notification";

const notificationKey = ["notifications"];

export const useUnseenAlerts = () => {
    const userId = useSelector((state) => state.auth.userId);

    return useQuery({
        queryKey: [...notificationKey, "unseen", userId],
        queryFn: getUnseenAlerts,
        enabled: Boolean(userId),
        refetchInterval: 60 * 1000,
    });
};

export const useAllAlerts = (isOpen) => {
    const userId = useSelector((state) => state.auth.userId);

    return useQuery({
        queryKey: [...notificationKey, "all", userId],
        queryFn: getAllAlerts,
        enabled: Boolean(userId) && isOpen,
    });
};

export const useSeeAlert = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: seeAlert,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKey });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ?? "علامت‌گذاری اعلان ناموفق بود");
        },
    });
};