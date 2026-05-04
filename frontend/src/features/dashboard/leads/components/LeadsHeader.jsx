import React from 'react';
import { Search, Download, RefreshCw } from 'lucide-react';

const LeadsHeader = ({ 
    fetchLeads, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    handleExportCsv, 
    leadsCount 
}) => {
    return (
        <header className="sticky top-0 z-10 min-h-[clamp(3.5rem,8vh,4rem)] border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-2 gap-4">
            <div className="min-w-0 flex-1 flex items-center gap-4">
                <div>
                    <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Captured Leads</h1>
                    <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Manage your potential customers and contacts</p>
                </div>
                <button 
                    onClick={fetchLeads}
                    className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground ml-2"
                    title="Reload Leads"
                >
                    <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                </button>
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
                    disabled={leadsCount === 0}
                    className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-3 py-1.5 rounded transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download size={14} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Export CSV</span>
                </button>
            </div>
        </header>
    );
};

export default LeadsHeader;
