import React, { useState } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useEmails } from '../hooks/useEmails';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { 
    Mail, CheckCircle2, Tag, AlertCircle, Search, 
    Filter, ChevronRight, Inbox, Send, AlertTriangle,
    RefreshCw, Clock, User, X, ExternalLink, Bot
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, loading, colorClass, iconColor }) => (
    <div className="bg-surface/30 border border-border rounded p-6 space-y-3 transition-all hover:border-primary/30 group">
        <div className="flex items-center justify-between">
            <div className={`p-2 rounded ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={18} className={iconColor} />
            </div>
        </div>
        <div>
            {loading ? <Skeleton width={60} height={32} /> : <p className="text-3xl font-bold tracking-tight">{value}</p>}
            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1">{title}</p>
        </div>
    </div>
);

const Emails = () => {
    const { emails, stats, loading, refresh } = useEmails();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedEmail, setSelectedEmail] = useState(null);

    const filteredEmails = emails.filter(email => {
        const matchesSearch = 
            email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            email.from?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || email.status === filter;
        return matchesSearch && matchesFilter;
    });

    const statusConfig = {
        replied: { label: 'Resolved', icon: CheckCircle2, class: 'bg-green-500/10 text-green-500 border-green-500/20' },
        ticket: { label: 'Ticket', icon: Tag, class: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        skipped: { label: 'Skipped', icon: Clock, class: 'bg-foreground/10 text-foreground/40 border-foreground/10' },
        error: { label: 'Error', icon: AlertTriangle, class: 'bg-red-500/10 text-red-500 border-red-500/20' }
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                {/* Hardened Header */}
                <header className="sticky top-0 z-10 min-h-[clamp(3.5rem,8vh,4rem)] border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-2 gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Email Processing</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Manage and monitor AI-driven email automation</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button 
                            onClick={refresh}
                            className="p-2 hover:bg-surface border border-transparent hover:border-border rounded transition-all text-foreground/40 hover:text-primary"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </header>

                <div className="p-[clamp(1rem,4vw,2rem)] space-y-[clamp(1.5rem,5vw,2.5rem)] max-w-7xl mx-auto w-full animate-in fade-in duration-700">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard 
                            title="Total Received" 
                            value={stats.total} 
                            icon={Inbox} 
                            loading={loading} 
                            colorClass="bg-primary/10" 
                            iconColor="text-primary" 
                        />
                        <StatCard 
                            title="AI Resolved" 
                            value={stats.resolved} 
                            icon={CheckCircle2} 
                            loading={loading} 
                            colorClass="bg-green-500/10" 
                            iconColor="text-green-500" 
                        />
                        <StatCard 
                            title="Made Tickets" 
                            value={stats.tickets} 
                            icon={Tag} 
                            loading={loading} 
                            colorClass="bg-amber-500/10" 
                            iconColor="text-amber-500" 
                        />
                        <StatCard 
                            title="Success Rate" 
                            value={stats.total > 0 ? `${Math.round(((stats.resolved + stats.tickets) / stats.total) * 100)}%` : '0%'} 
                            icon={Send} 
                            loading={loading} 
                            colorClass="bg-blue-500/10" 
                            iconColor="text-blue-500" 
                        />
                    </div>

                    {/* Filters & Table Section */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface/10 p-4 border border-border rounded">
                            <div className="relative group flex-1 max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search by sender or subject..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded text-xs focus:outline-none focus:border-primary/50 transition-all"
                                />
                            </div>
                            
                            <div className="flex items-center gap-2 bg-surface border border-border rounded p-1 shrink-0">
                                {['all', 'replied', 'ticket', 'error'].map((k) => (
                                    <button
                                        key={k}
                                        onClick={() => setFilter(k)}
                                        className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${filter === k ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                                    >
                                        {k === 'replied' ? 'Resolved' : k.charAt(0).toUpperCase() + k.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading && emails.length === 0 ? (
                            <SkeletonWrapper>
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => <Skeleton key={i} height={60} />)}
                                </div>
                            </SkeletonWrapper>
                        ) : filteredEmails.length > 0 ? (
                            <div className="bg-surface/10 border border-border rounded overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-foreground/2 border-b border-border">
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inbound Message</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Automation Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Processed At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {filteredEmails.map((email) => {
                                            const cfg = statusConfig[email.status] || statusConfig.skipped;
                                            const StatusIcon = cfg.icon;
                                            
                                            return (
                                                <tr 
                                                    key={email._id} 
                                                    onClick={() => setSelectedEmail(email)}
                                                    className="group hover:bg-foreground/2 transition-colors cursor-pointer"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex flex-col gap-1 min-w-0 max-w-xl">
                                                            <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">{email.subject || '(No Subject)'}</span>
                                                            <span className="text-[11px] text-foreground/40 flex items-center gap-2">
                                                                <User size={10} />
                                                                {email.from}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border ${cfg.class} text-[10px] font-black uppercase tracking-widest`}>
                                                            <StatusIcon size={12} />
                                                            {cfg.label}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="text-xs font-medium">{new Date(email.createdAt).toLocaleDateString()}</span>
                                                            <span className="text-[10px] text-foreground/30">{new Date(email.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center border border-dashed border-border rounded bg-surface/5">
                                <div className="w-16 h-16 rounded bg-surface border border-border flex items-center justify-center mx-auto mb-4 opacity-50">
                                    <Mail size={32} className="text-foreground/20" />
                                </div>
                                <h3 className="text-sm font-bold text-foreground/60">No emails found</h3>
                                <p className="text-xs text-foreground/30 mt-1">Check your filters or ensure your IMAP connection is active.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Detail Slide-over */}
            {selectedEmail && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div 
                        className="absolute inset-0 bg-background/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedEmail(null)}
                    />
                    <div className="relative w-full max-w-lg bg-surface border-l border-border h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
                        <header className="p-6 border-b border-border flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10 text-primary">
                                    <Mail size={18} />
                                </div>
                                <h2 className="text-sm font-bold uppercase tracking-widest">Message Details</h2>
                            </div>
                            <button 
                                onClick={() => setSelectedEmail(null)}
                                className="p-2 hover:bg-foreground/5 rounded-full transition-colors text-foreground/40 hover:text-foreground"
                            >
                                <X size={20} />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Subject</label>
                                    <h3 className="text-lg font-bold leading-tight">{selectedEmail.subject || '(No Subject)'}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">From</label>
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <User size={14} className="text-primary" />
                                            {selectedEmail.from}
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-right">
                                        <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Processed At</label>
                                        <div className="text-xs font-medium">
                                            {new Date(selectedEmail.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Bot size={14} />
                                        AI Automation Logic
                                    </label>
                                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${statusConfig[selectedEmail.status]?.class}`}>
                                        {statusConfig[selectedEmail.status]?.label}
                                    </div>
                                </div>

                                <div className="p-6 bg-background border border-border rounded space-y-4 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                                            <ExternalLink size={14} />
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-foreground/70 leading-relaxed whitespace-pre-wrap font-mono">
                                        {selectedEmail.aiResponse || 'No details available for this automation step.'}
                                    </div>
                                </div>

                                {selectedEmail.status === 'ticket' && (
                                    <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded flex gap-3">
                                        <AlertCircle size={18} className="text-amber-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Escalation Note</p>
                                            <p className="text-[11px] text-amber-500/70 leading-relaxed">
                                                This email required human intervention. An automated ticket has been created in your Support center.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <footer className="p-6 border-t border-border bg-foreground/1">
                            <button 
                                onClick={() => setSelectedEmail(null)}
                                className="w-full py-3 bg-surface border border-border rounded text-[10px] font-black uppercase tracking-widest hover:bg-foreground/5 transition-all"
                            >
                                Close Details
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Emails;
