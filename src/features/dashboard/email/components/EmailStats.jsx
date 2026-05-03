import React from 'react';
import { Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { Inbox, CheckCircle2, Tag, Send } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, loading, colorClass, iconColor }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 transition-all">
        <div className={`w-12 h-12 rounded ${colorClass} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-500`}>
            <Icon size={24} />
        </div>
        <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            {loading ? <Skeleton width={60} height={24} /> : <p className="text-2xl font-bold">{value}</p>}
        </div>
    </div>
);

const EmailStats = ({ stats, loading }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Total Received" 
                value={stats.total} 
                icon={Inbox} 
                loading={loading} 
                colorClass="bg-primary/10" 
                iconColor="text-primary" 
            />
            <StatCard 
                title="AI Resolved" 
                value={stats.resolved} 
                icon={CheckCircle2} 
                loading={loading} 
                colorClass="bg-green-500/10" 
                iconColor="text-green-500" 
            />
            <StatCard 
                title="Made Tickets" 
                value={stats.tickets} 
                icon={Tag} 
                loading={loading} 
                colorClass="bg-amber-500/10" 
                iconColor="text-amber-500" 
            />
            <StatCard 
                title="Success Rate" 
                value={stats.total > 0 ? `${Math.round(((stats.resolved + stats.tickets) / stats.total) * 100)}%` : '0%'} 
                icon={Send} 
                loading={loading} 
                colorClass="bg-blue-500/10" 
                iconColor="text-blue-500" 
            />
        </div>
    );
};

export default EmailStats;
