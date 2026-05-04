import React from 'react';

const KpiCard = ({ title, value, icon: Icon, className = "", description }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-4 md:p-6 flex items-center gap-3 md:gap-5 group hover:border-primary/20 hover:bg-surface/20 transition-all cursor-default overflow-hidden">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ${className.includes('text-red') ? 'bg-red-500/10' : 'bg-primary/10'}`}>
            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${className || 'text-primary'}`} />
        </div>
        <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40 truncate">{title}</p>
            <div className="flex items-baseline gap-2 overflow-hidden">
                <span className="text-xl md:text-2xl font-bold tracking-tight">{value}</span>
                <span className="text-[9px] md:text-[10px] text-foreground/30 font-medium truncate">{description}</span>
            </div>
        </div>
    </div>
);

export default KpiCard;
