import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets, setLoading, setError } from '../../../../store/ticketSlice';
import * as ticketsApi from '../services/tickets.api';
import { toast } from 'react-hot-toast';

export const useTickets = () => {
    const dispatch = useDispatch();
    const { list: tickets, loading, error } = useSelector(state => state.tickets);

    const fetchTickets = async () => {
        dispatch(setLoading(true));
        try {
            const res = await ticketsApi.getAllTickets();
            if (res.tickets) {
                dispatch(setTickets(res.tickets));
            }
        } catch (err) {
            dispatch(setError(err.message));
            toast.error('Failed to fetch tickets');
        }
    };

    const resolveTicket = async (ticketId, data) => {
        try {
            await ticketsApi.resolveTicket(ticketId, data);
            toast.success('Ticket resolved successfully');
            await fetchTickets();
        } catch (err) {
            toast.error('Failed to resolve ticket');
        }
    };

    const deleteTicket = async (ticketId) => {
        try {
            await ticketsApi.deleteTicket(ticketId);
            toast.success('Ticket deleted');
            await fetchTickets();
        } catch (err) {
            toast.error('Failed to delete ticket');
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return {
        tickets,
        loading,
        error,
        fetchTickets,
        resolveTicket,
        deleteTicket
    };
};
