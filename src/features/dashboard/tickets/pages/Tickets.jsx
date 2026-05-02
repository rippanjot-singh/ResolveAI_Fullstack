import React, { useState } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useTickets } from '../hooks/useTickets';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { 
    Ticket, Search, Clock, CheckCircle2
} from 'lucide-react';

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

const StatusBadge = ({ status }) => {
    const styles = {
        open: 'text-primary bg-primary/5',
        closed: 'text-green-500 bg-green-500/5',
        pending: 'text-amber-500 bg-amber-500/5'
    };
    const style = styles[status?.toLowerCase()] || styles.open;

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium ${style}`}>
            {status === 'closed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
            <span className="capitalize">{status || 'open'}</span>
        </div>
    );
};

const Tickets = () => {
    const { tickets, loading } = useTickets();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredTickets = tickets.filter(ticket => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            ticket.name?.toLowerCase().includes(q) ||
            ticket.email?.toLowerCase().includes(q) ||
            ticket.inquiree?.toLowerCase().includes(q);
        const matchesFilter = filter === 'all' || ticket.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-10">
                    <div>
                        <h1 className="text-lg font-bold">Support Tickets</h1>
                        <p className="text-xs text-foreground/40">Real-time customer inquiries</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20" size={16} />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-surface border border-border rounded text-sm focus:outline-none focus:border-primary/50 transition-all w-64"
                            />
                        </div>
                        <div className="flex items-center gap-1 bg-surface border border-border rounded p-1">
                            {['all', 'open', 'closed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${filter === f ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto">
                        {loading && tickets.length === 0 ? (
                            <SkeletonWrapper>
                                <div className="bg-surface/30 border border-border rounded overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-foreground/2 border-b border-border">
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {[...Array(6)].map((_, i) => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4"><Skeleton width={180} height={18} /></td>
                                                    <td className="px-6 py-4"><Skeleton width={70} height={18} /></td>
                                                    <td className="px-6 py-4"><Skeleton width={140} height={18} /></td>
                                                    <td className="px-6 py-4"><Skeleton width={80} height={18} /></td>
                                                    <td className="px-6 py-4 text-right"><Skeleton width={90} height={18} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </SkeletonWrapper>
                        ) : filteredTickets.length > 0 ? (
                            <div className="bg-surface/10 backdrop-blur-md border border-border rounded overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-foreground/2 border-b border-border">
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {filteredTickets.map((ticket) => (
                                            <tr key={ticket._id} className="group hover:bg-primary/[2 transition-colors cursor-pointer">
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm group-hover:text-primary transition-colors line-clamp-1">{ticket.inquiree}</span>
                                                        <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                            <Ticket size={10} />
                                                            Source: {ticket.type}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <PriorityBadge priority={ticket.priority} />
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-medium">{ticket.name}</span>
                                                        <span className="text-[10px] text-foreground/30">{ticket.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <StatusBadge status={ticket.status} />
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className="text-[11px] text-foreground/30 font-medium whitespace-nowrap">
                                                        {ticket.createdAt
                                                            ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                            : 'N/A'
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="h-96 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-20 h-20 rounded bg-surface border border-border flex items-center justify-center">
                                    <Ticket size={32} className="text-foreground/10" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">No tickets found</h3>
                                    <p className="text-sm text-foreground/40 max-w-xs mt-2">
                                        New tickets will appear here automatically in real-time.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Tickets;
