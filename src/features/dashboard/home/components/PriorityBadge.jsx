import React from 'react';

const PriorityBadge = ({ priority }) => {
    const colors = {
        high: 'bg-red-500/10 text-red-500 border-red-500/20',
        medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        low: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    const style = colors[priority?.toLowerCase()] || 'bg-surface text-foreground/40 border-border';
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style}`}>
            {priority || 'None'}
        </span>
    );
};

export default PriorityBadge;
