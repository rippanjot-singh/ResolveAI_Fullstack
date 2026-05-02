import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import themeReducer from './themeSlice';
import ticketReducer from './ticketSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        tickets: ticketReducer,
    },
});