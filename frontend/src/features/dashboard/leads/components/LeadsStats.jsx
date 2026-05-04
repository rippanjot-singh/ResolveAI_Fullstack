import React from 'react';
import { Users, TrendingUp, Clock, User } from 'lucide-react';
import StatCard from './StatCard';

const LeadsStats = ({ stats, isLoading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Leads" value={stats.total} icon={Users} loading={isLoading} />
            <StatCard title="Captured Today" value={stats.today} icon={TrendingUp} loading={isLoading} />
            <StatCard title="Last 7 Days" value={stats.thisWeek} icon={Clock} loading={isLoading} />
            <StatCard title="Anonymous" value={stats.anonymous} icon={User} loading={isLoading} />
        </div>
    );
};

export default LeadsStats;
