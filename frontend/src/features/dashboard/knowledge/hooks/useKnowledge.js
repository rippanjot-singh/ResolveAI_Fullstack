import { useState, useCallback } from 'react';
import * as knowledgeApi from '../services/knowledge.api';
import { toast } from 'react-hot-toast';

export const useKnowledge = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ isConnected: false, workspace: null, knowledge: [] });
    const [availablePages, setAvailablePages] = useState([]);

    const fetchStatus = useCallback(async () => {
        setLoading(true);
        try {
            const res = await knowledgeApi.getNotionStatus();
            if (res.success) {
                setStatus({
                    isConnected: res.isConnected,
                    workspace: res.workspace,
                    knowledge: res.knowledge
                });
            }
        } catch (error) {
            console.error('Failed to fetch notion status:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPages = useCallback(async () => {
        setLoading(true);
        try {
            const res = await knowledgeApi.getNotionPages();
            if (res.success) {
                setAvailablePages(res.pages);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch pages');
        } finally {
            setLoading(false);
        }
    }, []);

    const connectNotion = async () => {
        try {
            const res = await knowledgeApi.getNotionAuthUrl();
            if (res.success && res.authUrl) {
                const width = 600;
                const height = 700;
                const left = window.screenX + (window.innerWidth - width) / 2;
                const top = window.screenY + (window.innerHeight - height) / 2;
                
                const authWindow = window.open(
                    res.authUrl,
                    'Connect Notion',
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                const handleMessage = (event) => {
                    if (event.data.type === 'NOTION_AUTH_SUCCESS') {
                        toast.success('Notion connected successfully');
                        fetchStatus();
                        window.removeEventListener('message', handleMessage);
                    }
                };

                window.addEventListener('message', handleMessage);
            }
        } catch (error) {
            toast.error('Failed to start Notion connection');
        }
    };

    const integratePage = async (page, description = '') => {
        setLoading(true);
        try {
            const res = await knowledgeApi.integrateNotionPage({
                pageId: page.id,
                name: page.name,
                description
            });
            if (res.success) {
                toast.success('Page integrated');
                fetchStatus();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to integrate page');
        } finally {
            setLoading(false);
        }
    };

    const removeIntegration = async (pageId) => {
        setLoading(true);
        try {
            const res = await knowledgeApi.removeNotionIntegration({ pageId });
            if (res.success) {
                toast.success('Integration removed');
                fetchStatus();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove integration');
        } finally {
            setLoading(false);
        }
    };

    const updateDescription = async (pageId, description) => {
        try {
            const res = await knowledgeApi.updateKnowledgeDescription({ pageId, description });
            if (res.success) {
                toast.success('Description updated');
                fetchStatus();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update description');
        }
    };

    const replaceSource = async (oldPageId, newPage, description) => {
        setLoading(true);
        try {
            const res = await knowledgeApi.replaceKnowledgeSource({
                oldPageId,
                newPageId: newPage.id,
                name: newPage.name,
                description
            });
            if (res.success) {
                toast.success('Source replaced');
                fetchStatus();
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to replace source');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const disconnectWorkspace = async () => {
        setLoading(true);
        try {
            const res = await knowledgeApi.disconnectNotion();
            if (res.success) {
                toast.success('Notion disconnected');
                fetchStatus();
            }
        } catch (error) {
            toast.error('Failed to disconnect Notion');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        status,
        availablePages,
        fetchStatus,
        fetchPages,
        connectNotion,
        integratePage,
        removeIntegration,
        updateDescription,
        replaceSource,
        disconnectWorkspace
    };
};
