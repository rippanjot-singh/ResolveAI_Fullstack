import api from "../../../../api/axios";

export const getAllChats = async () => {
    const response = await api.get("/chat/all");
    return response.data;
};

export const getChatInteractions = async (chatId) => {
    const response = await api.get(`/chat/interactions/${chatId}`);
    return response.data;
};
