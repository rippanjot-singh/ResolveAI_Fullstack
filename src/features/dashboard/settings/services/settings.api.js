import api from "../../../../api/axios";

export const createInviteToken = async (data) => {
    const response = await api.post("/auth/invite", data);
    return response.data;
};
