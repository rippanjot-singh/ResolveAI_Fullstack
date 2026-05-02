import { useState, useEffect } from 'react';
import { getAllChats, getChatInteractions } from '../services/chat.api';
import { toast } from 'react-hot-toast';

export const useChats = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [interactions, setInteractions] = useState([]);
    const [interactionsLoading, setInteractionsLoading] = useState(false);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        setLoading(true);
        try {
            const response = await getAllChats();
            setChats(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch chats');
        } finally {
            setLoading(false);
        }
    };

    const fetchInteractions = async (chat) => {
        setSelectedChat(chat);
        setInteractionsLoading(true);
        setInteractions([]); // Clear previous interactions
        try {
            const response = await getChatInteractions(chat._id);
            setInteractions(response.data.interactions || []);
        } catch (error) {
            toast.error('Failed to fetch conversation');
        } finally {
            setInteractionsLoading(false);
        }
    };

    const stats = {
        totalChats: chats.length,
        totalMessages: chats.reduce((acc, chat) => acc + (chat.interactionCount || 0), 0),
        activeAgents: [...new Set(chats.map(chat => chat.chatbotId?._id))].length
    };

    return {
        chats,
        loading,
        selectedChat,
        interactions,
        interactionsLoading,
        stats,
        fetchInteractions,
        closeChat: () => {
            setSelectedChat(null);
            setInteractions([]);
        }
    };
};
