import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as chatbotApi from '../services/chatbot.api';
import * as aiApi from '../services/ai.api';

export const useAgentEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        prompt: '',
        style: {
            brandColor: {
                primary: '#158effff',
                secondary: '#003ba8ff',
                accent: '#53d7ffff'
            },
            textColor: '#000000',
            bgColor: '#ffffff',
            corner: 'rounded',
            icon: 'rounded',
            replyStyle: {
                textColor: '#1e1e1e',
                bgColor: 'transparent',
                replyType: 'bubble'
            },
            senderStyle: {
                textColor: '#ffffff',
                bgColor: '#158effff',
                senderType: 'bubble'
            }
        },
        greeting: 'Hello! How can I help you today?',
        faq: [],
        position: 'bottom-right',
        verifiedDomains: [],
        restrictedDomains: []
    });

    useEffect(() => {
        if (isEditing) {
            const fetchBot = async () => {
                try {
                    setIsLoading(true);
                    const response = await chatbotApi.getChatbotById(id);
                    if (response.success) {
                        const botData = response.chatBot || response.chatbot || response.data;
                        setFormData(prev => ({ ...prev, ...botData }));
                    } else {
                        setError(response.message);
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBot();
        }
    }, [id, isEditing]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);
            let response;
            if (isEditing) {
                response = await chatbotApi.updateChatbot(id, formData);
            } else {
                response = await chatbotApi.createChatbot(formData);
            }

            if (response.success) {
                if (!isEditing) {
                    const newId = response.chatBot?._id || response.data?.chatBot?._id || response.data?._id;
                    if (newId) navigate(`/dashboard/studio/editor/${newId}`, { replace: true });
                }
                return { success: true };
            }
            setError(response.message);
            return { success: false, message: response.message };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setIsSaving(false);
        }
    };

    const handleTrainWebsite = async (url) => {
        if (!isEditing) return { success: false, message: "Save agent first" };
        try {
            const response = await aiApi.trainWithWebsite(id, url);
            if (response.success) {
                setFormData(prev => ({ ...prev, prompt: response.prompt }));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const handleTrainPDF = async (file) => {
        if (!isEditing) return { success: false, message: "Save agent first" };
        try {
            const response = await aiApi.trainWithPDF(id, file);
            if (response.success) {
                setFormData(prev => ({ ...prev, prompt: response.prompt }));
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    return {
        formData,
        setFormData,
        isLoading,
        isSaving,
        isEditing,
        error,
        handleSave,
        handleTrainWebsite,
        handleTrainPDF
    };
};
