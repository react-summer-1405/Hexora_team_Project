import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";
import { closeTicket, createTicket, getMyAllTickets, getTicketChatDetailUser, sendUserMessage } from "../../core/services/ticket/ticket";



const ticketKey = ["ticketKey"]

export const useMyAllTickets = () =>
    useQuery({
        queryKey: ticketKey,
        queryFn: getMyAllTickets,
    });



export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ticketKey
            });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "ارسال پیام ناموفق بود");
        },
    });
};


export const useCloseTicket = () =>
    useMutation({
        mutationFn: closeTicket,
        onSuccess: (data) => toast.success(data?.message ),
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        },

    })

export const useSendUserMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendUserMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ticketKey
            });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "ارسال پیام ناموفق بود");
        },
    });
};

export const useTicketChatDetailUser = (id) =>
    useQuery({
        queryKey: [...ticketKey, id],
        queryFn: () => getTicketChatDetailUser(id),
        enabled: Boolean(id),
        refetchInterval: 4000,
    });




