import React, { useState, useEffect } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useTickets } from '../hooks/useTickets';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';
import { 
    Tag, Send, Trash2, ChevronRight, SkipForward, AlertCircle, 
    CheckCircle2, Clock, User, Mail, Calendar, MessageSquare,
    AlertTriangle, ArrowUpCircle, Info
} from 'lucide-react';

const FocusArea = () => {
    const { tickets, loading, resolveTicket, deleteTicket, updateTicket } = useTickets();
    const [activeTicketId, setActiveTicketId] = useState(null);
    const [response, setResponse] = useState('');
    const [subject, setSubject] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isResolving, setIsResolving] = useState(false);

    // Filter only open tickets and sort them by priority
    const openTickets = tickets
        .filter(t => t.status === 'open')
        .sort((a, b) => {
            const priorityMap = { high: 0, medium: 1, low: 2 };
            return priorityMap[a.priority] - priorityMap[b.priority];
        });

    useEffect(() => {
        if (!activeTicketId && openTickets.length > 0) {
            setActiveTicketId(openTickets[0]._id);
        }
    }, [openTickets, activeTicketId]);

    const currentTicket = openTickets.find(t => t._id === activeTicketId) || openTickets[0];

    useEffect(() => {
        if (currentTicket) {
            setSubject(`Resolution for your inquiry: #${currentTicket._id.slice(-6).toUpperCase()}`);
        }
    }, [currentTicket]);

    const currentIndex = openTickets.findIndex(t => t._id === (currentTicket?._id));

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % openTickets.length;
        setActiveTicketId(openTickets[nextIndex]._id);
        setResponse('');
    };

    const handleResolve = async () => {
        if (!response.trim()) return;
        setIsResolving(true);
        try {
            await resolveTicket(currentTicket._id, { 
                response: response,
                subject: subject
            });
            setResponse('');
            // Move to next available ticket ID
            const nextTicket = openTickets.find(t => t._id !== activeTicketId);
            setActiveTicketId(nextTicket?._id || null);
        } finally {
            setIsResolving(false);
        }
    };

    const handleDelete = async () => {
        await deleteTicket(currentTicket._id);
        setIsDeleteModalOpen(false);
        const nextTicket = openTickets.find(t => t._id !== activeTicketId);
        setActiveTicketId(nextTicket?._id || null);
    };

    const handlePriorityChange = async (priority) => {
        await updateTicket(currentTicket._id, { priority });
    };

    if (loading && !openTickets.length) {
        return (
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <SideNav />
                <main className="flex-1 flex flex-col min-w-0">
                    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-8">
                        <Skeleton width={150} height={20} />
                    </header>
                    <div className="flex-1 p-8">
                        <SkeletonWrapper>
                            <div className="max-w-4xl mx-auto space-y-6">
                                <Skeleton height={200} />
                                <Skeleton height={300} />
                            </div>
                        </SkeletonWrapper>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 bg-surface/5">
                {/* Unbreakable Header */}
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Focus Area</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">
                            {openTickets.length} critical tickets remaining
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button 
                            onClick={handleNext}
                            disabled={openTickets.length <= 1}
                            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-xs font-bold uppercase tracking-wider hover:bg-surface/70 transition-all disabled:opacity-50"
                        >
                            <SkipForward size={14} />
                            <span>Skip / Next</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {!currentTicket ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 rounded bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Inbox Zero Achieved</h2>
                                    <p className="text-foreground/40 mt-2">All tickets have been resolved. Great job!</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Ticket Details Main Card */}
                                <div className="lg:col-span-2 space-y-6">
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

                                    {/* Resolution Area */}
                                    <div className="bg-background border border-border rounded p-6 shadow-lg shadow-primary/5 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                                    <Tag size={14} />
                                                    Email Subject
                                                </label>
                                            </div>
                                            <input 
                                                type="text"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                placeholder="Resolution subject..."
                                                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                                    <MessageSquare size={14} />
                                                    Compose Resolution
                                                </label>
                                                <span className="text-[10px] text-foreground/30">Markdown supported</span>
                                            </div>
                                            <textarea 
                                                value={response}
                                                onChange={(e) => setResponse(e.target.value)}
                                                placeholder="Write your response here... Once sent, the ticket will close and we'll move to the next one."
                                                className="w-full h-48 bg-surface/50 border border-border rounded p-6 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none custom-scrollbar"
                                            />
                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <button 
                                                onClick={handleResolve}
                                                disabled={!response.trim() || isResolving}
                                                className="flex items-center gap-3 px-8 py-3 bg-primary text-white rounded font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none group"
                                            >
                                                {isResolving ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                )}
                                                <span>Resolve & Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Options */}
                                <div className="space-y-6">
                                    <div className="bg-surface/30 border border-border rounded p-6 space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 border-b border-border pb-3">Ticket Options</h3>
                                        
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-foreground/40">Priority Level</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['low', 'medium', 'high'].map((p) => (
                                                        <button
                                                            key={p}
                                                            onClick={() => handlePriorityChange(p)}
                                                            className={`py-2 text-[10px] font-bold uppercase tracking-tighter rounded border transition-all ${
                                                                currentTicket.priority === p 
                                                                    ? (p === 'high' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' :
                                                                       p === 'medium' ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' :
                                                                       'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20')
                                                                    : 'bg-surface border-border text-foreground/60 hover:border-primary/30'
                                                            }`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4 space-y-3">
                                                <button 
                                                    onClick={() => setIsDeleteModalOpen(true)}
                                                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete Ticket
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/5 border border-blue-500/10 rounded p-6 space-y-3">
                                        <div className="flex items-center gap-2 text-blue-500">
                                            <Info size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Quick Tip</span>
                                        </div>
                                        <p className="text-[11px] text-blue-500/60 leading-relaxed">
                                            You are currently in Focus Mode. We've prioritized your high-impact inquiries so you can resolve them one by one without distraction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Ticket"
                itemName="this ticket"
                message="This action cannot be undone and will permanently remove this inquiry from your records."
            />
        </div>
    );
};

export default FocusArea;
