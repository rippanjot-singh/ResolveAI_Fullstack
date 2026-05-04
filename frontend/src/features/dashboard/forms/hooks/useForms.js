import { useState, useCallback } from 'react';
import { getForms, createForm, getFormResults, toggleFormStatus, deleteForm, updateForm } from '../services/form.api';
import toast from 'react-hot-toast';

export const useForms = () => {
    const [forms, setForms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchForms = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getForms();
            if (data.success) {
                setForms(data.data);
            } else {
                setError(data.message || 'Failed to fetch forms');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Error fetching forms');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCreateForm = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await createForm(formData);
            if (data.success) {
                toast.success('Form created successfully!');
                return data.data; // Return the created form
            } else {
                toast.error(data.message || 'Failed to create form');
                return null;
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Error creating form';
            toast.error(msg);
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateForm = async (formId, formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await updateForm(formId, formData);
            if (data.success) {
                toast.success('Form updated successfully!');
                return data.data;
            } else {
                toast.error(data.message || 'Failed to update form');
                return null;
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Error updating form';
            toast.error(msg);
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (formId) => {
        try {
            const data = await toggleFormStatus(formId);
            if (data.success) {
                setForms(forms.map(f => f._id === formId ? { ...f, isActive: !f.isActive } : f));
                toast.success(data.data.isActive ? 'Form activated' : 'Form deactivated');
                return true;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update form status');
        }
        return false;
    };

    const handleDelete = async (formId) => {
        try {
            const data = await deleteForm(formId);
            if (data.success) {
                setForms(forms.filter(f => f._id !== formId));
                toast.success('Form deleted successfully');
                return true;
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete form');
        }
        return false;
    };

    return {
        forms,
        isLoading,
        error,
        fetchForms,
        handleCreateForm,
        handleUpdateForm,
        handleToggleStatus,
        handleDelete
    };
};
