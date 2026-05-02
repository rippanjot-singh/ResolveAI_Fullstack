import { useState, useCallback, useEffect } from 'react';
import * as analyticsApi from '../services/analytics.api';
import { toast } from 'react-hot-toast';

export const useAnalytics = (initialTimeframe = '7d') => {
    const [loading, setLoading] = useState(false);
    const [timeframe, setTimeframe] = useState(initialTimeframe);
    const [data, setData] = useState({
        dailyChats: [],
        sentimentDistribution: [],
        stats: {
            totalMessages: 0,
            totalChats: 0,
            chatbotCount: 0
        }
    });

    const fetchAnalytics = useCallback(async (selectedTimeframe) => {
        setLoading(true);
        try {
            const res = await analyticsApi.getAnalytics(selectedTimeframe || timeframe);
            if (res.success) {
                setData(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    }, [timeframe]);

    useEffect(() => {
        fetchAnalytics(timeframe);
    }, [timeframe, fetchAnalytics]);

    return {
        loading,
        timeframe,
        setTimeframe,
        data,
        refresh: () => fetchAnalytics(timeframe)
    };
};
