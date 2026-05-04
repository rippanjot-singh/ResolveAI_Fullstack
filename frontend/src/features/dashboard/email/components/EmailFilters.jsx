import React from 'react';
import { Search } from 'lucide-react';

const EmailFilters = ({ searchQuery, setSearchQuery, filter, setFilter }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface/10 p-4 border border-border rounded">
            <div className="relative group flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={14} />
                <input 
                    type="text" 
                    placeholder="Search by sender or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded text-xs focus:outline-none focus:border-primary/50 transition-all"
                />
            </div>
        </div>
    );
};

export default EmailFilters;
