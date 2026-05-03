import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const FocusEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={40} />
        </div>
        <div>
            <h2 className="text-2xl font-bold">Inbox Zero Achieved</h2>
            <p className="text-foreground/40 mt-2">All tickets have been resolved. Great job!</p>
        </div>
    </div>
);

export default FocusEmptyState;
