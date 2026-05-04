import { useState, useEffect } from 'react';
import * as emailApi from '../services/email.api';

export const useEmails = () => {
    const [emails, setEmails] = useState([]);
    const [stats, setStats] = useState({ total: 0, resolved: 0, tickets: 0, skipped: 0, errors: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [emailsRes, statsRes] = await Promise.all([
                emailApi.getEmails(),
                emailApi.getEmailStats()
            ]);
            setEmails(emailsRes.emails);
            setStats(statsRes.stats);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch email data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        emails,
        stats,
        loading,
        error,
        refresh: fetchData
    };
};
