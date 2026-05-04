import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useFormResults } from '../hooks/useFormResults';
import { Download, Filter, ArrowLeft, RefreshCw } from 'lucide-react';
import ResultsTable from '../components/ResultsTable';
import SubmissionDetailsModal from '../components/SubmissionDetailsModal';
import FormResultsStats from '../components/FormResultsStats';

const Results = () => {
    const { id } = useParams();
    const { results, isLoading, fetchResults } = useFormResults();
    const [filterForm, setFilterForm] = useState('All Forms');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    // Unique form names for the filter
    const formNames = ['All Forms', ...new Set(results.map(r => r.formId?.name).filter(Boolean))];

    // Apply filters
    const filteredResults = results.filter(result => {
        if (id) {
            return result.formId?._id === id;
        }
        if (filterForm === 'All Forms') return true;
        return result.formId?.name === filterForm;
    });

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterForm, id]);

    // Pagination
    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedResults = filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // CSV Export
    const handleExportCsv = () => {
        if (filteredResults.length === 0) return;
        
        const csvRows = [];
        // Headers
        csvRows.push(['Form Name', 'Date', 'Submission Data'].join(','));
        
        // Data
        filteredResults.forEach(r => {
            const formName = r.formId?.name || 'Unknown';
            const date = new Date(r.createdAt).toLocaleString();
            const dataStr = JSON.stringify(r.data).replace(/"/g, '""');
            csvRows.push(`"${formName}","${date}","${dataStr}"`);
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `form_results_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                <header className="sticky top-0 z-10 min-h-[clamp(3.5rem,8vh,4rem)] border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-2 gap-4">
                    <div className="min-w-0 flex-1 flex items-center gap-4">
                        {id && (
                            <NavLink to="/dashboard/forms/results" className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground">
                                <ArrowLeft size={18} />
                            </NavLink>
                        )}
                        <div>
                            <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">
                                {id ? `${filteredResults[0]?.formId?.name || 'Form'} Submissions` : 'Form Results'}
                            </h1>
                            <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">
                                {id ? 'Detailed submission breakdown' : 'View and export all form submissions'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button 
                            onClick={fetchResults}
                            className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground"
                            title="Reload Results"
                        >
                            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                        <div className="flex items-center gap-1 bg-surface border border-border rounded p-1 sm:flex">
                            <div className="flex items-center gap-2 px-3 py-1.5">
                                <Filter size={14} className="text-foreground/40" />
                                <select 
                                    value={filterForm}
                                    onChange={(e) => setFilterForm(e.target.value)}
                                    className="bg-transparent text-[10px] font-bold uppercase tracking-wider focus:outline-none appearance-none pr-4 cursor-pointer"
                                >
                                    {formNames.map(name => (
                                        <option key={name} value={name} className="bg-surface text-foreground">{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={handleExportCsv}
                            disabled={filteredResults.length === 0}
                            className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-3 py-1.5 rounded transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={14} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Export CSV</span>
                        </button>
                    </div>
                </header>

                <div className="p-[clamp(1rem,4vw,2rem)] space-y-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full">
                    <FormResultsStats results={results} loading={isLoading} />
                    <ResultsTable 
                        isLoading={isLoading}
                        paginatedResults={paginatedResults}
                        totalResults={filteredResults.length}
                        startIndex={startIndex}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        onSelectResult={(result) => {
                            setSelectedResult(result);
                            setIsModalOpen(true);
                        }}
                    />
                </div>
            </main>

            <SubmissionDetailsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                result={selectedResult} 
            />
        </div>
    );
};

export default Results;
