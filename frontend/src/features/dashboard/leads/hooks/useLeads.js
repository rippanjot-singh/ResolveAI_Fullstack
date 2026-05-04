import { useState, useEffect, useCallback } from 'react';
import { getAllLeads, deleteLead } from '../services/leads.api';
import { useSocket } from '../../../../context/SocketContext';
import toast from 'react-hot-toast';

export const useLeads = () => {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const socket = useSocket();

    const fetchLeads = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getAllLeads();
            setLeads(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch leads');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeLead = async (leadId) => {
        try {
            await deleteLead(leadId);
            setLeads(prev => prev.filter(l => l._id !== leadId));
            toast.success('Lead removed');
        } catch (error) {
            toast.error('Failed to remove lead');
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    useEffect(() => {
        if (!socket) return;

        const handleNewLead = (newLead) => {
            setLeads(prev => {
                // Avoid duplicates if socket and initial fetch overlap
                if (prev.some(l => l._id === newLead._id)) return prev;
                return [newLead, ...prev];
            });
        };

        socket.on('new_lead', handleNewLead);
        return () => socket.off('new_lead', handleNewLead);
    }, [socket]);

    const stats = {
        total: leads.length,
        today: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length,
        thisWeek: leads.filter(l => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(l.createdAt) > weekAgo;
        }).length,
        anonymous: leads.filter(l => !l.email).length
    };

    return { leads, isLoading, removeLead, fetchLeads, stats };
};
