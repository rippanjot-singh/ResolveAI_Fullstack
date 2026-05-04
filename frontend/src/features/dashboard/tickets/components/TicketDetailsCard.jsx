import React from 'react';
import { AlertCircle, Clock, User, Mail, Tag } from 'lucide-react';

const TicketDetailsCard = ({ currentTicket }) => (
    <div className="bg-surface/30 border border-border rounded overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-foreground/2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${
                    currentTicket.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                    currentTicket.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-blue-500/10 text-blue-500'
                }`}>
                    <AlertCircle size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Active Ticket</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40">
                <Clock size={12} />
                {new Date(currentTicket.createdAt).toLocaleString()}
            </div>
        </div>
        
        <div className="p-8 space-y-8">
            <div className="space-y-4">
                <h2 className="text-xl font-bold leading-tight">{currentTicket.inquiree}</h2>
                <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground/60 bg-foreground/5 px-3 py-1.5 rounded">
                        <User size={14} className="text-primary" />
                        {currentTicket.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/60 bg-foreground/5 px-3 py-1.5 rounded">
                        <Mail size={14} className="text-primary" />
                        {currentTicket.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/60 bg-foreground/5 px-3 py-1.5 rounded">
                        <Tag size={14} className="text-primary" />
                        Source: {currentTicket.type || 'Manual'}
                    </div>
                </div>
            </div>

            <div className="p-6 bg-foreground/3 border border-border/50 rounded italic text-sm text-foreground/80 leading-relaxed relative">
                <div className="absolute -left-2 top-4 w-4 h-4 border-l border-t border-border/50 rotate-45" />
                {currentTicket.inquiree}
            </div>
        </div>
    </div>
);

export default TicketDetailsCard;
