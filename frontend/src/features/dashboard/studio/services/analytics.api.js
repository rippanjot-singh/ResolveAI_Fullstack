import api from "../../../../api/axios";

export const getAnalytics = async (timeframe, chatbotId) => {
    const url = chatbotId 
        ? `/analytics?timeframe=${timeframe}&chatbotId=${chatbotId}`
        : `/analytics?timeframe=${timeframe}`;
    const response = await api.get(url);
    return response.data;
};
