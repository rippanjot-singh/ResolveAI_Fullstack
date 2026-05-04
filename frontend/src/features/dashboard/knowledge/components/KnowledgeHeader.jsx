import React from 'react';
import { Plus } from 'lucide-react';

const KnowledgeHeader = ({ isConnected, connectNotion, onAddSource }) => {
    return (
        <header className="sticky top-0 z-50 h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-8 shrink-0 gap-4 shadow-sm">
            <div className="min-w-0 flex-1">
                <h1 className="text-sm md:text-base font-bold truncate text-foreground">Company Knowledge</h1>
                <p className="text-[10px] md:text-xs text-foreground/40 truncate">Manage shared information and dynamic tools for your AI</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
                {!isConnected ? (
                    <button
                        onClick={connectNotion}
                        className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-3 h-3 md:w-4 md:h-4 rounded" />
                        <span className="hidden sm:inline">Connect Notion</span>
                        <span className="sm:hidden">Connect</span>
                    </button>
                ) : (
                    <button
                        onClick={onAddSource}
                        className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <Plus size={14} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Add Source</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default KnowledgeHeader;
