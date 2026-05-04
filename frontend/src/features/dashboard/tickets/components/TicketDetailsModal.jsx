import React, { useState, useEffect } from 'react';
import { Ticket, X, User, Tag, Send, CheckCircle2 } from 'lucide-react';

import StatusBadge from './StatusBadge';

const TicketDetailsModal = ({ isOpen, onClose, ticket, onResolve, onPriorityChange, setSelectedTicket }) => {
    const [subject, setSubject] = useState('');
    const [response, setResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [trainAi, setTrainAi] = useState(true);

    useEffect(() => {
        if (ticket) {
            setSubject(`Resolution: Your Inquiry #${ticket._id.slice(-6).toUpperCase()}`);
            setResponse('');
        }
    }, [ticket]);

    if (!isOpen || !ticket) return null;

    const handleResolve = async () => {
        if (!response.trim()) return;
        setIsSubmitting(true);
        try {
            await onResolve(ticket._id, { subject, response, trainAi });
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePriorityClick = async (p) => {
        if (onPriorityChange && setSelectedTicket) {
            await onPriorityChange(ticket._id, { priority: p });
            setSelectedTicket({ ...ticket, priority: p });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-2xl bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Ticket size={16} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">Ticket Details</h3>
                            <p className="text-[10px] text-foreground/40 font-medium">#{ticket._id.slice(-6).toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 flex items-center gap-2">
                                <User size={12} /> Customer Information
                            </h4>
                            <div className="bg-surface/30 border border-border rounded p-4 space-y-3">
                                <div>
                                    <p className="text-[9px] uppercase font-bold text-foreground/30">Name</p>
                                    <p className="text-sm font-medium">{ticket.name || 'Anonymous'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase font-bold text-foreground/30">Email</p>
                                    <p className="text-sm font-medium">{ticket.email || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 flex items-center gap-2">
                                <Tag size={12} /> Ticket Status
                            </h4>
                            <div className="bg-surface/30 border border-border rounded p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] uppercase font-bold text-foreground/30">Priority</p>
                                    <div className="flex items-center gap-1">
                                        {['low', 'medium', 'high'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handlePriorityClick(p)}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                                                    ticket.priority === p
                                                        ? (p === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                           p === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                           'bg-green-500/10 text-green-500 border-green-500/20')
                                                        : 'bg-surface text-foreground/40 border-border hover:border-primary/30'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] uppercase font-bold text-foreground/30">Status</p>
                                    <StatusBadge status={ticket.status} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Content */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            Inquiry Content
                        </h4>
                        <div className="bg-surface border border-border rounded p-6 text-sm leading-relaxed text-foreground/80 italic shadow-inner">
                            "{ticket.inquiree}"
                        </div>
                    </div>

                    {/* Resolution Section */}
                    {ticket.status !== 'closed' ? (
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-green-500 flex items-center gap-2">
                                <div className="w-1 h-3 bg-green-500 rounded-full" />
                                Resolve Ticket
                            </h4>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-foreground/30 ml-1">Email Subject</p>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Enter email subject..."
                                        className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-green-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase font-bold text-foreground/30 ml-1">Message Content</p>
                                    <textarea
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                        placeholder="Write your resolution message here..."
                                        className="w-full h-32 bg-surface/50 border border-border rounded p-4 text-sm focus:outline-none focus:border-green-500/50 transition-all resize-none custom-scrollbar"
                                    />
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <input 
                                        type="checkbox" 
                                        id="trainAi"
                                        checked={trainAi}
                                        onChange={(e) => setTrainAi(e.target.checked)}
                                        className="w-3.5 h-3.5 rounded border-border bg-surface text-primary focus:ring-primary/20 cursor-pointer"
                                    />
                                    <label htmlFor="trainAi" className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 cursor-pointer select-none">
                                        Use this response to train AI
                                    </label>
                                </div>
                                <button
                                    onClick={handleResolve}
                                    disabled={!response.trim() || isSubmitting}
                                    className="w-full py-3 bg-green-500 text-white rounded text-[10px] font-bold uppercase tracking-wider hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isSubmitting ? 'Resolving...' : (
                                        <>
                                            <Send size={14} />
                                            Mark as Resolved & Send Response
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-green-500 flex items-center gap-2">
                                <CheckCircle2 size={12} /> Resolution Response
                            </h4>
                            <div className="bg-green-500/5 border border-green-500/10 rounded p-4 text-sm text-foreground/70 italic">
                                {ticket.response || 'No response recorded.'}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-between items-center">
                    <p className="text-[10px] text-foreground/30">Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-surface border border-border rounded text-[10px] font-bold uppercase tracking-wider hover:bg-surface/70 transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketDetailsModal;
