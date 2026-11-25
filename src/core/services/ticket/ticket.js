import Api_Client from "../../interceptor/interceptor";

export const createTicket = async (payload) => {
  const response = await Api_Client.post("/ticket/createTicket", payload);
  return response.data;
};


export const sendUserMessage = async (payload) => {
  const response = await Api_Client.post("/ticket/message/sendUser", payload);
  return response.data;
};

export const getTicketChatDetailUser = async (id) => {
  const response = await Api_Client.get(`/ticket/message/chatDetailUser/${id}`);
  return response.data;
};


export const closeTicket = async (ticketId) => {
  const response = await Api_Client.patch(`/ticket/closeTicket/${ticketId}`);
  return response.data;
};


export const getMyAllTickets = async()=>{
  const response =await Api_Client.get("/ticket/AllTicketsMineUser")
  return response.data
}