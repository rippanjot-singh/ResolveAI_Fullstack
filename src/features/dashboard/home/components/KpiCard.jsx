import React from 'react';

const KpiCard = ({ title, value, icon: Icon, className = "", description }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 hover:bg-surface/20 transition-all cursor-default">
        <div className={`w-12 h-12 rounded bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform ${className.includes('text-red') ? 'bg-red-500/10' : 'bg-primary/10'}`}>
            <Icon size={22} className={className || 'text-primary'} />
        </div>
        <div className="space-y-0.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">{value}</span>
                <span className="text-[10px] text-foreground/30 font-medium truncate max-w-[100px]">{description}</span>
            </div>
        </div>
    </div>
);

export default KpiCard;
