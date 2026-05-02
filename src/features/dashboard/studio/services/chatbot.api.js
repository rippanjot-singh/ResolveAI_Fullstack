import api from "../../../../api/axios";

export const getMyChatbots = async () => {
    const response = await api.get("/chatbot/my-chatbots");
    return response.data;
};

export const createChatbot = async (data) => {
    const response = await api.post("/chatbot/create", data);
    return response.data;
};

export const getChatbotById = async (id) => {
    const response = await api.get(`/chatbot/config/${id}`);
    return response.data;
};

export const updateChatbot = async (id, data) => {
    const response = await api.patch(`/chatbot/update/${id}`, data);
    return response.data;
};

export const deleteChatbot = async (id) => {
    const response = await api.delete(`/chatbot/delete/${id}`);
    return response.data;
};

export const toggleChatbotStatus = async (id) => {
    const response = await api.patch(`/chatbot/toggle/status/${id}`);
    return response.data;
};
