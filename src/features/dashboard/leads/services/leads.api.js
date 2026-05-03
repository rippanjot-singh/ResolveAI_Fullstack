import axios from 'axios';

const API_URL = '/api/leads';

export const getAllLeads = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

export const deleteLead = async (leadId) => {
    const response = await axios.delete(`${API_URL}/${leadId}`, { withCredentials: true });
    return response.data;
};
