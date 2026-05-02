import api from "../../../../api/axios";

export const trainWithWebsite = async (chatbotId, url) => {
    const response = await api.post(`/ai/prompt/website/${chatbotId}`, { url });
    return response.data;
};

export const trainWithPDF = async (chatbotId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/ai/prompt/pdf/${chatbotId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};
