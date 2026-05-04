import api from "../../../../api/axios";

export const createInviteToken = async (data) => {
    const response = await api.post("/auth/invite", data);
    return response.data;
};

export const updateUserProfile = async (userId, data) => {
    const response = await api.patch(`/user/${userId}`, data);
    return response.data;
};

export const getCompanyUsers = async () => {
    const response = await api.get("/user/company");
    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await api.patch(`/user/${userId}`, { role });
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
};

export const updateCompanyName = async (name) => {
    const response = await api.patch("/user/company/update", { name });
    return response.data;
};
