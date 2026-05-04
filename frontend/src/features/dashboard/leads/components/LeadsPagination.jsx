import React from 'react';

const LeadsPagination = ({ startIndex, ITEMS_PER_PAGE, filteredLeadsCount, currentPage, totalPages, setCurrentPage }) => {
    if (filteredLeadsCount === 0) return null;

    return (
        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-surface/5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredLeadsCount)} of {filteredLeadsCount}
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
    );
};

export default LeadsPagination;
