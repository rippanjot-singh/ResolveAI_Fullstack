import api from "../../../../api/axios";

export const getNotionAuthUrl = async () => {
    const response = await api.get("/notion/auth-url");
    return response.data;
};

export const getNotionStatus = async () => {
    const response = await api.get("/notion/status");
    return response.data;
};

export const getNotionPages = async () => {
    const response = await api.get("/notion/pages");
    return response.data;
};

export const integrateNotionPage = async (data) => {
    const response = await api.post("/notion/integrate", data);
    return response.data;
};

export const removeNotionIntegration = async (data) => {
    const response = await api.post("/notion/remove", data);
    return response.data;
};
