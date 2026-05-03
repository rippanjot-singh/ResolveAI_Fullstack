import React from 'react';
import { Plus } from 'lucide-react';

const KnowledgeHeader = ({ isConnected, connectNotion, onAddSource }) => {
    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 gap-4">
            <div className="min-w-0 flex-1">
                <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Company Knowledge</h1>
                <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Manage shared information and dynamic tools for your AI</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                {!isConnected ? (
                    <button
                        onClick={connectNotion}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-4 h-4 rounded" />
                        <span>Connect Notion</span>
                    </button>
                ) : (
                    <button
                        onClick={onAddSource}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        <Plus size={16} />
                        <span>Add Knowledge Source</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default KnowledgeHeader;
