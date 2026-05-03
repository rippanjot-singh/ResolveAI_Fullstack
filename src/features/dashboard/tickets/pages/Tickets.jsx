import React, { useState, useEffect } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useTickets } from '../hooks/useTickets';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';
import { 
    Ticket, Search, Clock, CheckCircle2, AlertCircle, X, Send, User, Mail, Tag, ChevronRight, Plus, Trash2
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, loading }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 transition-all">
        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            {loading ? <Skeleton width={60} height={24} /> : <p className="text-2xl font-bold">{value}</p>}
        </div>
    </div>
);

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

const TicketDetailsModal = ({ isOpen, onClose, ticket, onResolve }) => {
    const [subject, setSubject] = useState('');
    const [response, setResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await onResolve(ticket._id, { subject, response });
            onClose();
        } finally {
            setIsSubmitting(false);
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
                                    <PriorityBadge priority={ticket.priority} />
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

const CreateTicketModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiree: '',
        priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onCreate(formData);
            onClose();
            setFormData({ name: '', email: '', inquiree: '', priority: 'medium' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-lg bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Plus size={16} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Create New Ticket</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Customer Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Inquiry Details</label>
                        <textarea
                            required
                            value={formData.inquiree}
                            onChange={(e) => setFormData({ ...formData, inquiree: e.target.value })}
                            className="w-full h-32 bg-surface/50 border border-border rounded p-4 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none custom-scrollbar"
                            placeholder="What is the customer asking about?"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-surface border border-border rounded text-[10px] font-bold uppercase tracking-wider hover:bg-surface/70 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Tickets = () => {
    const { tickets, loading, resolveTicket, addTicket, bulkDelete } = useTickets();
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
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Support Tickets</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Real-time customer inquiries</p>
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
