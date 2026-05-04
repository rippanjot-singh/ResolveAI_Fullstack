import React, { useState, useEffect } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useTickets } from '../hooks/useTickets';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';
import { 
    Ticket, Search, Clock, CheckCircle2, AlertCircle, X, Send, User, Mail, Tag, ChevronRight, Plus, Trash2, RefreshCw
} from 'lucide-react';

import StatCard from '../components/StatCard';
import PriorityBadge from '../components/PriorityBadge';
import StatusBadge from '../components/StatusBadge';
import TicketDetailsModal from '../components/TicketDetailsModal';
import CreateTicketModal from '../components/CreateTicketModal';

const Tickets = () => {
    const { tickets, loading, resolveTicket, addTicket, bulkDelete, fetchTickets, updateTicket } = useTickets();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const ITEMS_PER_PAGE = 10;

    const filteredTickets = tickets.filter(ticket => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            ticket.name?.toLowerCase().includes(q) ||
            ticket.email?.toLowerCase().includes(q) ||
            ticket.inquiree?.toLowerCase().includes(q);
        const matchesFilter = filter === 'all' || ticket.status === filter;
        return matchesSearch && matchesFilter;
    });

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter]);

    const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedTickets = filteredTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredTickets.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredTickets.map(t => t._id));
        }
    };

    const toggleSelect = (id, e) => {
        e.stopPropagation();
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkDelete = async () => {
        await bulkDelete(selectedIds);
        setSelectedIds([]);
        setIsDeleteModalOpen(false);
    };

    const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        resolved: tickets.filter(t => t.status === 'closed').length,
        highPriority: tickets.filter(t => t.priority === 'high').length
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 gap-4">
                    <div className="min-w-0 flex-1 flex items-center gap-4">
                        <div>
                            <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Support Tickets</h1>
                            <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Real-time customer inquiries</p>
                        </div>
                        <button 
                            onClick={fetchTickets}
                            className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground ml-2"
                            title="Reload Tickets"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        {selectedIds.length > 0 && (
                            <button 
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all animate-in fade-in slide-in-from-right-2"
                            >
                                <Trash2 size={14} />
                                <span>Delete ({selectedIds.length})</span>
                            </button>
                        )}
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={14} />
                            <input 
                                type="text"
                                placeholder="Search tickets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-surface border border-border rounded pl-9 pr-4 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-primary/50 transition-all w-48 md:w-64"
                            />
                        </div>
                        <div className="flex items-center gap-1 bg-surface border border-border rounded p-1">
                            {['all', 'open', 'closed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${filter === f ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 active:scale-95"
                        >
                            <Plus size={16} />
                            <span className="hidden sm:inline">New Ticket</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Tickets" value={stats.total} icon={Ticket} loading={loading} />
                            <StatCard title="Open Tickets" value={stats.open} icon={Clock} loading={loading} />
                            <StatCard title="High Priority" value={stats.highPriority} icon={AlertCircle} loading={loading} />
                            <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle2} loading={loading} />
                        </div>

                        {loading && tickets.length === 0 ? (
                            <SkeletonWrapper>
                                <div className="bg-surface/30 border border-border rounded overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-foreground/2 border-b border-border">
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 hidden md:table-cell">Priority</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 hidden sm:table-cell">Customer</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right hidden lg:table-cell">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {[...Array(6)].map((_, i) => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4"><Skeleton width={180} height={18} /></td>
                                                    <td className="px-6 py-4 hidden md:table-cell"><Skeleton width={70} height={18} /></td>
                                                    <td className="px-6 py-4 hidden sm:table-cell"><Skeleton width={140} height={18} /></td>
                                                    <td className="px-6 py-4"><Skeleton width={80} height={18} /></td>
                                                    <td className="px-6 py-4 text-right hidden lg:table-cell"><Skeleton width={90} height={18} /></td>
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
                                            <th className="px-6 py-4 w-10">
                                                <input 
                                                    type="checkbox"
                                                    checked={selectedIds.length === filteredTickets.length && filteredTickets.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-border bg-surface/50 text-primary focus:ring-primary/20 cursor-pointer"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 hidden md:table-cell">Priority</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 hidden sm:table-cell">Customer</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right hidden lg:table-cell">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {paginatedTickets.map((ticket) => (
                                            <tr 
                                                key={ticket._id} 
                                                onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    setIsModalOpen(true);
                                                }}
                                                className={`group hover:bg-primary/3 transition-colors cursor-pointer ${selectedIds.includes(ticket._id) ? 'bg-primary/3' : ''}`}
                                            >
                                                <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                                                    <input 
                                                        type="checkbox"
                                                        checked={selectedIds.includes(ticket._id)}
                                                        onChange={(e) => toggleSelect(ticket._id, e)}
                                                        className="w-4 h-4 rounded border-border bg-surface/50 text-primary focus:ring-primary/20 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm group-hover:text-primary transition-colors line-clamp-1">{ticket.inquiree}</span>
                                                        <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                            <Ticket size={10} />
                                                            Source: {ticket.type}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 hidden md:table-cell">
                                                    <PriorityBadge priority={ticket.priority} />
                                                </td>
                                                <td className="px-6 py-5 hidden sm:table-cell">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-medium">{ticket.name}</span>
                                                        <span className="text-[10px] text-foreground/30">{ticket.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <StatusBadge status={ticket.status} />
                                                </td>
                                                <td className="px-6 py-5 text-right hidden lg:table-cell">
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
                                {filteredTickets.length > 0 && (
                                    <div className="p-4 border-t border-border/50 flex items-center justify-between bg-surface/5">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">
                                            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTickets.length)} of {filteredTickets.length}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                disabled={currentPage === 1} 
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                className="px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/70 transition-all text-foreground cursor-pointer"
                                            >
                                                Prev
                                            </button>
                                            <span className="text-xs font-bold text-foreground/60 w-8 text-center">{currentPage}</span>
                                            <button 
                                                disabled={currentPage >= totalPages} 
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                className="px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/70 transition-all text-foreground cursor-pointer"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
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

            <TicketDetailsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticket={selectedTicket}
                onResolve={resolveTicket}
                onPriorityChange={updateTicket}
                setSelectedTicket={setSelectedTicket}
            />

            <CreateTicketModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={addTicket}
            />

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleBulkDelete}
                title="Delete Tickets"
                itemName={`${selectedIds.length} selected tickets`}
                message="This will permanently remove these tickets from your records."
            />
        </div>
    );
};

export default Tickets;
