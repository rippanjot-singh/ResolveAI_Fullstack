import api from "../../../../api/axios";

export const getAllTickets = async () => {
    const response = await api.get("/ticket/all");
    return response.data;
};

export const createTicket = async (data) => {
    const response = await api.post("/ticket/create", data);
    return response.data;
};

export const resolveTicket = async (ticketId, data) => {
    const response = await api.patch(`/ticket/resolve/${ticketId}`, data);
    return response.data;
};

export const updateTicket = async (ticketId, data) => {
    const response = await api.patch(`/ticket/update/${ticketId}`, data);
    return response.data;
};

export const deleteTicket = async (ticketId) => {
    const response = await api.delete(`/ticket/delete/${ticketId}`);
    return response.data;
};
