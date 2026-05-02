import api from "../../../api/axios";

export const authApi = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
    invite: async (inviteData) => {
        const response = await api.post('/auth/invite', inviteData);
        return response.data;
    },
    me: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
