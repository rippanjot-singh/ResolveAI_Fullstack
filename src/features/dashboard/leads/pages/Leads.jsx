import React, { useState } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useLeads } from '../hooks/useLeads';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';

// Extracted Components
                    import LeadsHeader from '../components/LeadsHeader';
                    import LeadsStats from '../components/LeadsStats';
                    import LeadsTable from '../components/LeadsTable';
                    import LeadsPagination from '../components/LeadsPagination';
                    import LeadDetailsModal from '../components/LeadDetailsModal';

const Leads = () => {
    const { leads, isLoading, removeLead, stats, fetchLeads } = useLeads();
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

    const handleLeadClick = (lead) => {
        setSelectedLead(lead);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                <LeadsHeader 
                    fetchLeads={fetchLeads}
                    isLoading={isLoading}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleExportCsv={handleExportCsv}
                    leadsCount={leads.length}
                />

                <div className="p-[clamp(1rem,4vw,2rem)] space-y-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full">
                    <LeadsStats stats={stats} isLoading={isLoading} />

                    <div className="bg-surface/10 backdrop-blur-md border border-border rounded relative z-10 overflow-hidden w-full">
                        <LeadsTable 
                            isLoading={isLoading}
                            leads={leads}
                            paginatedLeads={paginatedLeads}
                            onLeadClick={handleLeadClick}
                            onDeleteClick={handleDeleteClick}
                        />
                        
                        <LeadsPagination 
                            startIndex={startIndex}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            filteredLeadsCount={filteredLeads.length}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
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
