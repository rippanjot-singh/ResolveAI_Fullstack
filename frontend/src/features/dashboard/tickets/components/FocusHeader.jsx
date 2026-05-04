import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, SkipForward, SkipBack } from 'lucide-react';

const FocusHeader = ({ openTicketsLength, handleNext, handlePrev }) => (
    <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
            <NavLink to="/dashboard/tickets" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-medium whitespace-nowrap">Tickets</NavLink>
            <ChevronRight size={16} className="text-foreground/20 shrink-0" />
            <span className="text-sm text-foreground font-medium truncate">Focus Area</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
            <button 
                onClick={handlePrev}
                disabled={openTicketsLength <= 1}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-xs font-bold uppercase tracking-wider hover:bg-surface/70 transition-all disabled:opacity-50 cursor-pointer"
            >
                <SkipBack size={14} />
                <span className="hidden sm:inline">Prev</span>
            </button>
            <button 
                onClick={handleNext}
                disabled={openTicketsLength <= 1}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-xs font-bold uppercase tracking-wider hover:bg-surface/70 transition-all disabled:opacity-50 cursor-pointer"
            >
                <span>Skip / Next</span>
                <SkipForward size={14} />
            </button>
        </div>
    </header>
);

export default FocusHeader;
