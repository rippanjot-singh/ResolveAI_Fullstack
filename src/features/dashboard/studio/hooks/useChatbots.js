import { useState, useEffect, useCallback } from 'react';
import * as chatbotApi from '../services/chatbot.api';

export const useChatbots = () => {
    const [chatbots, setChatbots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchChatbots = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await chatbotApi.getMyChatbots();
            if (response.success) {
                setChatbots(response.chatbots);
            } else {
                setError(response.message || "Failed to fetch chatbots");
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchChatbots();
    }, [fetchChatbots]);

    const handleToggleStatus = async (id) => {
        try {
            const response = await chatbotApi.toggleChatbotStatus(id);
            if (response.success) {
                setChatbots(prev => prev.map(bot => 
                    bot._id === id ? { ...bot, isActive: response.data.isActive } : bot
                ));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await chatbotApi.deleteChatbot(id);
            if (response.success) {
                setChatbots(prev => prev.filter(bot => bot._id !== id));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    return {
        chatbots,
        isLoading,
        error,
        refresh: fetchChatbots,
        handleToggleStatus,
        handleDelete
    };
};
