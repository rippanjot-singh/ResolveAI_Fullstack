import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true,
        error: null,
        dashboardData: {
            totalChatbots: 0,
            totalInquiries: 0,
            totalChats: 0
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setDashboardData: (state, action) => {
            state.dashboardData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, updateUser, setDashboardData, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;