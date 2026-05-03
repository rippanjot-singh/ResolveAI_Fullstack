import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useFormResults } from '../hooks/useFormResults';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { Download, FileText, Filter, Calendar, X, Globe, User, Hash, ArrowLeft, RefreshCw } from 'lucide-react';

const SubmissionDetailsModal = ({ isOpen, onClose, result }) => {
    if (!isOpen || !result) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-2xl bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <FileText size={16} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">{result.formId?.name || 'Form Submission'}</h3>
                            <p className="text-[10px] text-foreground/40 uppercase font-medium">{new Date(result.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                    {/* Submitted Data Section */}
                                <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            Submitted Data
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(result.data).map(([key, value]) => (
                                <div key={key} className="bg-surface/30 border border-border rounded p-4 space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">{key}</p>
                                    <p className="text-sm font-medium break-all">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 flex items-center gap-2">
                            <div className="w-1 h-3 bg-foreground/20 rounded-full" />
                            Technical Metadata
                        </h4>
                        <div className="bg-surface/10 border border-border rounded p-4 divide-y divide-border/50">
                            <div className="py-2 flex justify-between text-xs items-center">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <Globe size={12} />
                                    IP Address
                                </div>
                                <span className="font-mono text-foreground/80">{result.metadata?.ip || 'N/A'}</span>
                            </div>
                            <div className="py-2 flex justify-between text-xs items-center">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <Hash size={12} />
                                    Referrer
                                </div>
                                <span className="truncate max-w-[250px] text-foreground/80">{result.metadata?.referrer || 'Direct'}</span>
                            </div>
                            <div className="py-3 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <User size={12} />
                                    User Agent
                                </div>
                                <span className="text-[10px] text-foreground/60 leading-relaxed italic bg-surface p-2 rounded border border-border/50">{result.metadata?.userAgent || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Response Section (if exists) */}
                    {result.aiResponse?.reply && (
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-green-500 flex items-center gap-2">
                                <div className="w-1 h-3 bg-green-500 rounded-full" />
                                AI Auto-Response
                            </h4>
                            <div className="bg-green-500/5 border border-green-500/10 rounded p-4">
                                <p className="text-sm leading-relaxed text-foreground/80 italic">"{result.aiResponse.reply}"</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

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
                    
                    <div className="bg-surface/10 backdrop-blur-md border border-border rounded relative z-10 overflow-x-auto w-full">
                        <table className="w-full text-left min-w-[500px]">
                            <thead>
                                <tr className="border-b border-border bg-surface/5">
                                    <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40">Form Name</th>
                                    <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40 w-full sm:w-1/2">Submitted Data</th>
                                    <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40 text-right hidden sm:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><Skeleton width={120} height={16} /></td>
                                            <td className="px-6 py-4"><Skeleton width="100%" height={16} /></td>
                                            <td className="px-6 py-4 text-right hidden sm:table-cell"><Skeleton width={80} height={16} className="ml-auto" /></td>
                                        </tr>
                                    ))
                                ) : paginatedResults.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-foreground/40 text-sm italic">
                                            No form submissions found.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedResults.map((result) => (
                                        <tr 
                                            key={result._id} 
                                            onClick={() => {
                                                setSelectedResult(result);
                                                setIsModalOpen(true);
                                            }}
                                            className="hover:bg-surface/10 transition-all cursor-pointer group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={14} className="text-primary/60 shrink-0 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-medium">{result.formId?.name || 'Unknown Form'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    {Object.entries(result.data).slice(0, 3).map(([key, value], i) => (
                                                        <div key={i} className="bg-surface border border-border rounded px-2 py-1 max-w-[200px] truncate">
                                                            <span className="text-foreground/40 capitalize mr-1">{key}:</span>
                                                            <span className="font-medium">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                    {Object.keys(result.data).length > 3 && (
                                                        <div className="bg-surface/50 border border-border/50 rounded px-2 py-1 text-foreground/40 font-bold text-[9px]">
                                                            +{Object.keys(result.data).length - 3} MORE
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right hidden sm:table-cell">
                                                <div className="flex items-center justify-end gap-2 text-[11px] text-foreground/60">
                                                    <Calendar size={12} />
                                                    <span>{new Date(result.createdAt).toLocaleString()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        
                        {filteredResults.length > 0 && (
                            <div className="p-4 border-t border-border/50 flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">
                                    Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredResults.length)} of {filteredResults.length}
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

            <SubmissionDetailsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                result={selectedResult} 
            />
        </div>
    );
};

export default Results;
