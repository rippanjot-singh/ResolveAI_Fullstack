import { useState, useCallback, useEffect } from 'react';
import { getAllFormResults } from '../services/form.api';
import { useSocket } from '../../../../context/SocketContext';
import toast from 'react-hot-toast';

export const useFormResults = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const socket = useSocket();

    const fetchResults = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllFormResults();
            if (data.success) {
                setResults(data.data || []);
            } else {
                setError(data.message || 'Failed to fetch form results');
                toast.error(data.message || 'Failed to fetch form results');
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Error fetching form results';
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleNewSubmission = (newResult) => {
            setResults(prev => [newResult, ...prev]);
        };

        socket.on('new_submission', handleNewSubmission);
        return () => socket.off('new_submission', handleNewSubmission);
    }, [socket]);

    return {
        results,
        isLoading,
        error,
        fetchResults
    };
};
