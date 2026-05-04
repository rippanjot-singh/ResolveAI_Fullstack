import React from 'react';
import { Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const StatCard = ({ title, value, icon: Icon, loading }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 transition-all">
        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            {loading ? <Skeleton width={60} height={24} /> : <p className="text-2xl font-bold">{value}</p>}
        </div>
    </div>
);

export default StatCard;
