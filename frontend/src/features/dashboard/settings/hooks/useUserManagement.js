import { useState, useEffect, useCallback } from 'react';
import { getCompanyUsers, updateUserRole, deleteUser, updateCompanyName } from '../services/settings.api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../auth/hooks/useAuth';

export const useUserManagement = () => {
    const { fetchMe } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getCompanyUsers();
            if (response.success) {
                setUsers(response.data);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await updateUserRole(userId, newRole);
            if (response.success) {
                toast.success(`User role updated to ${newRole}`);
                setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to remove this user from the company?')) return;
        
        try {
            const response = await deleteUser(userId);
            if (response.success) {
                toast.success('User removed successfully');
                setUsers(prev => prev.filter(u => u._id !== userId));
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleUpdateCompanyName = async (newName) => {
        try {
            const response = await updateCompanyName(newName);
            if (response.success) {
                toast.success('Company name updated successfully');
                // Refresh the global user state to update the name in the sidebar/other places
                fetchMe();
                return true;
            } else {
                toast.error(response.message);
                return false;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update company name');
            return false;
        }
    };

    return {
        users,
        loading,
        error,
        handleUpdateRole,
        handleDeleteUser,
        handleUpdateCompanyName,
        refetch: fetchUsers
    };
};
