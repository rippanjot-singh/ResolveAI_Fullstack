import React, { useState } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useLeads } from '../hooks/useLeads';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { User, Mail, Calendar, Trash2, Search, ExternalLink, Filter, TrendingUp, Users, Clock, X, Info, Download } from 'lucide-react';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';

const LeadDetailsModal = ({ isOpen, onClose, lead }) => {
    if (!isOpen || !lead) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-lg bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <User size={16} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Lead Details</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Name</p>
                                <p className="text-sm font-medium">{lead.name || 'Anonymous'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Email</p>
                                <p className="text-sm font-medium">{lead.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Captured On</p>
                            <p className="text-sm font-medium">{new Date(lead.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Capture Source / Note</p>
                            <div className="bg-surface border border-border rounded p-4 text-xs text-foreground/70 leading-relaxed italic">
                                {lead.note || 'No additional capture notes provided.'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

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

const Leads = () => {
    const { leads, isLoading, removeLead, stats } = useLeads();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);
    const ITEMS_PER_PAGE = 10;

    const handleExportCsv = () => {
        if (leads.length === 0) return;
        const csvRows = [
            ['Name', 'Email', 'Note', 'Date'].join(','),
            ...leads.map(l => [
                `"${l.name || 'Anonymous'}"`,
                `"${l.email || ''}"`,
                `"${(l.note || '').replace(/"/g, '""')}"`,
                `"${new Date(l.createdAt).toLocaleString()}"`
            ].join(','))
        ];
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const filteredLeads = leads.filter(lead => {
        const q = searchQuery.toLowerCase();
        return (
            lead.name?.toLowerCase().includes(q) ||
            lead.email?.toLowerCase().includes(q) ||
            lead.note?.toLowerCase().includes(q)
        );
    });

    const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleDeleteClick = (lead) => {
        setLeadToDelete(lead);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (leadToDelete) {
            await removeLead(leadToDelete._id);
            setIsDeleteModalOpen(false);
            setLeadToDelete(null);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                <header className="sticky top-0 z-10 min-h-[clamp(3.5rem,8vh,4rem)] border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-2 gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Captured Leads</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Manage your potential customers and contacts</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={14} />
                            <input 
                                type="text"
                                placeholder="Search leads..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-surface border border-border rounded pl-9 pr-4 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-primary/50 transition-all w-48 md:w-64"
                            />
                        </div>
                        <button 
                            onClick={handleExportCsv}
                            disabled={leads.length === 0}
                            className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-3 py-1.5 rounded transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={14} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Export CSV</span>
                        </button>
                    </div>
                </header>

                <div className="p-[clamp(1rem,4vw,2rem)] space-y-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full">
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Leads" value={stats.total} icon={Users} loading={isLoading} />
                        <StatCard title="Captured Today" value={stats.today} icon={TrendingUp} loading={isLoading} />
                        <StatCard title="Last 7 Days" value={stats.thisWeek} icon={Clock} loading={isLoading} />
                        <StatCard title="Anonymous" value={stats.anonymous} icon={User} loading={isLoading} />
                    </div>

                    <div className="bg-surface/10 backdrop-blur-md border border-border rounded relative z-10 overflow-hidden w-full">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-border bg-surface/5">
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40">Lead Info</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 hidden md:table-cell">Capture Source / Note</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 hidden sm:table-cell">Captured At</th>
                                        <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {isLoading && leads.length === 0 ? (
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-5"><Skeleton width={150} height={16} /></td>
                                                <td className="px-6 py-5 hidden md:table-cell"><Skeleton width={250} height={16} /></td>
                                                <td className="px-6 py-5 hidden sm:table-cell"><Skeleton width={100} height={16} /></td>
                                                <td className="px-6 py-5 text-right"><Skeleton width={30} height={16} className="ml-auto" /></td>
                                            </tr>
                                        ))
                                    ) : paginatedLeads.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-foreground/40 text-sm italic">
                                                No leads found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedLeads.map((lead) => (
                                            <tr 
                                                key={lead._id} 
                                                onClick={() => {
                                                    setSelectedLead(lead);
                                                    setIsDetailsModalOpen(true);
                                                }}
                                                className="hover:bg-surface/5 transition-colors group cursor-pointer"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                                            <User size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium">{lead.name || 'Anonymous'}</span>
                                                            <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                                <Mail size={10} />
                                                                {lead.email || 'No email provided'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 hidden md:table-cell">
                                                    <p className="text-xs text-foreground/60 line-clamp-2 max-w-xs leading-relaxed italic">
                                                        {lead.note || 'No additional info'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-5 hidden sm:table-cell">
                                                    <div className="flex items-center gap-2 text-[11px] text-foreground/40">
                                                        <Calendar size={12} />
                                                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(lead);
                                                        }}
                                                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors text-foreground/20 cursor-pointer"
                                                        title="Delete Lead"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {filteredLeads.length > 0 && (
                            <div className="p-4 border-t border-border/50 flex items-center justify-between bg-surface/5">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">
                                    Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)} of {filteredLeads.length}
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
                </div>
            </main>

            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Lead"
                itemName={leadToDelete?.name || leadToDelete?.email || 'this lead'}
                message="This will permanently remove this contact from your leads list."
            />

            <LeadDetailsModal 
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                lead={selectedLead}
            />
        </div>
    );
};

export default Leads;
