import React from 'react';
import { LayoutGrid, List as ListIcon, RefreshCw } from 'lucide-react';

const KnowledgeToolbar = ({ viewMode, setViewMode, status, connectNotion, disconnectWorkspace, fetchStatus, loading }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 bg-surface border border-border rounded">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
                <div className="text-sm font-medium flex items-center gap-2">
                    <span>{status.knowledge.length} items integrated from <span className="text-primary">{status.workspace}</span></span>
                    <div className="h-3 w-px bg-border mx-1"></div>
                    <button 
                        onClick={connectNotion}
                        className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 hover:text-primary transition-colors"
                    >
                        Reconnect
                    </button>
                    <button 
                        onClick={disconnectWorkspace}
                        className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 hover:text-red-500 transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            </div>
            <button 
                onClick={fetchStatus}
                className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground"
                title="Refresh Status"
            >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>
    );
};

export default KnowledgeToolbar;
