import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const ResultsTable = ({ 
    isLoading, 
    paginatedResults, 
    totalResults, 
    startIndex, 
    itemsPerPage, 
    currentPage, 
    totalPages, 
    onPageChange, 
    onSelectResult 
}) => {
    return (
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
                                onClick={() => onSelectResult(result)}
                                className="hover:bg-surface/30 transition-all cursor-pointer group"
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
            
            {totalResults > 0 && (
                <div className="p-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalResults)} of {totalResults}
                    </span>
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            className="px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/70 transition-all text-foreground cursor-pointer"
                        >
                            Prev
                        </button>
                        <span className="text-xs font-bold text-foreground/60 w-8 text-center">{currentPage}</span>
                        <button 
                            disabled={currentPage >= totalPages} 
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            className="px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/70 transition-all text-foreground cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsTable;
