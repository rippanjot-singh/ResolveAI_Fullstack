import { useState, useEffect } from 'react';
import { getMyChatbots, updateChatbot } from '../services/chatbot.api';
import { askAI } from '../services/ai.api';
import { toast } from 'react-hot-toast';

export const usePlayground = () => {
    const [chatbots, setChatbots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        prompt: ''
    });

    useEffect(() => {
        fetchChatbots();
    }, []);

    const fetchChatbots = async () => {
        setLoading(true);
        try {
            const response = await getMyChatbots();
            const bots = response.chatbots || [];
            setChatbots(bots);
            if (bots.length > 0) {
                selectBot(bots[0]);
            }
        } catch (error) {
            toast.error('Failed to fetch chatbots');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedBot) {
            const savedMessages = localStorage.getItem(`playground_chat_${selectedBot._id}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            } else {
                setMessages([]);
            }
        }
    }, [selectedBot]);

    useEffect(() => {
        if (selectedBot && messages.length > 0) {
            localStorage.setItem(`playground_chat_${selectedBot._id}`, JSON.stringify(messages));
        }
    }, [messages, selectedBot]);

    const selectBot = (bot) => {
        setSelectedBot(bot);
        setFormData({
            name: bot.name || '',
            description: bot.description || '',
            prompt: bot.prompt || ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!selectedBot) return;
        setSaving(true);
        try {
            await updateChatbot(selectedBot._id, formData);
            toast.success('Agent updated successfully');
            setChatbots(prev => prev.map(b => b._id === selectedBot._id ? { ...b, ...formData } : b));
        } catch (error) {
            toast.error('Failed to update agent');
        } finally {
            setSaving(false);
        }
    };

    const clearChat = () => {
        if (selectedBot) {
            localStorage.removeItem(`playground_chat_${selectedBot._id}`);
            setMessages([]);
        }
    };

    const sendMessage = async (content) => {
        if (!selectedBot || !content.trim()) return;

        const userMessage = { role: 'user', content };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setChatLoading(true);

        try {
            // Pass history to backend
            const response = await askAI(selectedBot._id, content, messages);
            const aiMessage = { role: 'ai', content: response.data };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            toast.error('AI failed to respond');
        } finally {
            setChatLoading(false);
        }
    };

    return {
        chatbots,
        selectedBot,
        loading,
        saving,
        messages,
        chatLoading,
        formData,
        selectBot,
        handleInputChange,
        handleSave,
        sendMessage,
        clearChat
    };
};
