import React from 'react';
import { Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { FileText, Clock, Layers, MessageSquare } from 'lucide-react';

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

const FormResultsStats = ({ results, loading }) => {
    const stats = React.useMemo(() => {
        const total = results.length;
        const now = new Date();
        const last24h = results.filter(r => {
            const date = new Date(r.createdAt);
            return (now - date) < 24 * 60 * 60 * 1000;
        }).length;
        const uniqueForms = new Set(results.map(r => r.formId?._id)).size;
        const aiReplied = results.filter(r => r.aiResponse?.reply).length;

        return { total, last24h, uniqueForms, aiReplied };
    }, [results]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Total Submissions" 
                value={stats.total} 
                icon={FileText} 
                loading={loading} 
                colorClass="bg-primary/10" 
                iconColor="text-primary" 
            />
            <StatCard 
                title="Last 24 Hours" 
                value={stats.last24h} 
                icon={Clock} 
                loading={loading} 
                colorClass="bg-blue-500/10" 
                iconColor="text-blue-500" 
            />
            <StatCard 
                title="Active Forms" 
                value={stats.uniqueForms} 
                icon={Layers} 
                loading={loading} 
                colorClass="bg-amber-500/10" 
                iconColor="text-amber-500" 
            />
            <StatCard 
                title="AI Replied" 
                value={stats.aiReplied} 
                icon={MessageSquare} 
                loading={loading} 
                colorClass="bg-green-500/10" 
                iconColor="text-green-500" 
            />
        </div>
    );
};

export default FormResultsStats;
