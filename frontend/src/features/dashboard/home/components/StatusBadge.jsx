import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        open: 'text-primary bg-primary/5',
        closed: 'text-green-500 bg-green-500/5',
        pending: 'text-amber-500 bg-amber-500/5'
    };
    const style = styles[status?.toLowerCase()] || styles.open;
    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${style}`}>
            {status === 'closed' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
            <span className="capitalize">{status || 'open'}</span>
        </div>
    );
};

export default StatusBadge;
