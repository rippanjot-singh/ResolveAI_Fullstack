import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../services/auth.api';
import { setUser, setLoading, setError, setDashboardData } from '../authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, dashboardData } = useSelector((state) => state.auth);

    const login = useCallback(async (credentials) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await authApi.login(credentials);
            dispatch(setUser(data.user || data)); 
            navigate('/dashboard'); 
            return data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Login failed';
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    const signup = useCallback(async (userData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await authApi.signup(userData);
            dispatch(setUser(data.user || data)); 
            navigate('/dashboard'); 
            return data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Signup failed';
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    const logout = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            await authApi.logout();
            dispatch(setUser(null));
            dispatch(setDashboardData({
                totalChatbots: 0,
                totalInquiries: 0,
                totalChats: 0
            }));
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Logout failed';
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, navigate]);

    const fetchMe = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const data = await authApi.me();
            dispatch(setUser(data.user || data)); 
        } catch (err) {
            dispatch(setUser(null));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const inviteUser = useCallback(async (inviteData) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const data = await authApi.invite(inviteData);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Invite failed';
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        user,
        loading,
        error,
        dashboardData,
        login,
        signup,
        logout,
        fetchMe,
        inviteUser
    };
};
