import api from '../../../../api/axios';

export const getForms = async () => {
    const response = await api.get('/form');
    return response.data;
};

export const createForm = async (formData) => {
    const response = await api.post('/form/create', formData);
    return response.data;
};

export const getFormResults = async (formId) => {
    const response = await api.get(`/form/results/${formId}`);
    return response.data;
};

export const getAllFormResults = async () => {
    const response = await api.get('/form/results/all');
    return response.data;
};

export const toggleFormStatus = async (formId) => {
    const response = await api.put(`/form/${formId}/toggle`);
    return response.data;
};

export const deleteForm = async (formId) => {
    const response = await api.delete(`/form/${formId}`);
    return response.data;
};

export const getForm = async (formId) => {
    const response = await api.get(`/form/${formId}`);
    return response.data;
};

export const updateForm = async (formId, formData) => {
    const response = await api.put(`/form/${formId}`, formData);
    return response.data;
};
