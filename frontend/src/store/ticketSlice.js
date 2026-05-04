import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        setTickets: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        addTicket: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateTicket: (state, action) => {
            const index = state.list.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { setTickets, addTicket, updateTicket, setLoading, setError } = ticketSlice.actions;
export default ticketSlice.reducer;
