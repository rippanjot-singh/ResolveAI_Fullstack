import api from "../../../../api/axios";

export const getEmails = async () => {
    const response = await api.get("/email/all");
    return response.data;
};

export const getEmailStats = async () => {
    const response = await api.get("/email/stats");
    return response.data;
};
