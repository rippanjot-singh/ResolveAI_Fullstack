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

    useEffect(() => {
        const socketUrl = window.location.origin; // Or use your API URL
        socket.current = io(socketUrl, {
            path: '/socket.io'
        });

        socket.current.on('connect', () => {
            console.log('Connected to socket server');
            if (user?.companyId) {
                socket.current.emit('join_company', user.companyId);
            }
        });

        socket.current.on('new_ticket', (ticket) => {
            dispatch(addTicket(ticket));
            toast.success(`New Ticket: ${ticket.name}`, {
                icon: '🎫',
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
