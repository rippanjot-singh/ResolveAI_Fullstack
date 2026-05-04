import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { addTicket, updateTicket } from '../store/ticketSlice';
import { toast } from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth); 
    const companyId = user?.companyId;

    useEffect(() => {
        if (!companyId) return;

        const socketUrl = window.location.origin;
        socket.current = io(socketUrl, {
            path: '/socket.io',
            transports: ['polling', 'websocket']
        });

        socket.current.on('connect', () => {
            console.log('Connected to socket server. ID:', socket.current.id);
            console.log('Joining company room:', companyId);
            socket.current.emit('join_company', companyId);
        });

        socket.current.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        socket.current.on('new_ticket', (ticket) => {
            dispatch(addTicket(ticket));
            toast.success(`New Ticket from ${ticket.name}`, {
                icon: '🎫',
                duration: 4000
            });
        });

        socket.current.on('new_submission', (submission) => {
            toast.success(`New Form Submission: ${submission.formId?.name}`, {
                icon: '📝',
                duration: 4000
            });
        });

        socket.current.on('new_chat', (chat) => {
            toast.success(`New Chat started by ${chat.name || 'Anonymous'}`, {
                icon: '💬',
                duration: 4000
            });
        });

        socket.current.on('new_lead', (lead) => {
            toast.success(`New Lead Captured: ${lead.name || lead.email}`, {
                icon: '👥',
                duration: 4000
            });
        });

        socket.current.on('ticket_updated', (ticket) => {
            dispatch(updateTicket(ticket));
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [user?.companyId]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
