import { useState, useEffect } from "react";
import { getDashboardSummary } from "../services/dashboard.api";

export const useDashboardStats = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const response = await getDashboardSummary();
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return { data, isLoading, error, refetch: fetchDashboardData };
};
