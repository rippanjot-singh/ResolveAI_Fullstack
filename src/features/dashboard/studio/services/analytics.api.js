import api from "../../../../api/axios";

export const getAnalytics = async (timeframe = '7d') => {
    const response = await api.get(`/analytics?timeframe=${timeframe}`);
    return response.data;
};
