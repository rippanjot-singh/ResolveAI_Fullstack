import React from 'react';
import { FileText, Link as LinkIcon, Pencil, Trash2 } from 'lucide-react';

const KnowledgeItem = ({ item, viewMode, editingDescription, setEditingDescription, updateDescription, onReplace, onRemove }) => {
    return (
        <div 
            className={`bg-surface/30 border border-border rounded transition-all hover:border-primary/30 group ${viewMode === 'list' ? 'flex items-center justify-between p-4' : 'p-6 space-y-4'}`}
        >
            <div className={`flex gap-4 ${viewMode === 'list' ? 'items-center flex-1' : 'items-start'}`}>
                <div className={`shrink-0 rounded bg-background border border-border flex items-center justify-center ${viewMode === 'list' ? 'w-10 h-10' : 'w-12 h-12'}`}>
                    <FileText className="text-primary/60" size={viewMode === 'list' ? 20 : 24} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{item.name}</h3>
                    <div className="mt-3">
                        {editingDescription.id === item.fileId ? (
                            <div className="space-y-2">
                                <textarea
                                    autoFocus
                                    className="w-full bg-background border border-primary/30 rounded p-2 text-xs focus:outline-none resize-none"
                                    rows={viewMode === 'list' ? 2 : 3}
                                    value={editingDescription.value}
                                    onChange={(e) => setEditingDescription(prev => ({ ...prev, value: e.target.value }))}
                                    onBlur={() => {
                                        if (editingDescription.value !== item.description) {
                                            updateDescription(item.fileId, editingDescription.value);
                                        }
                                        setEditingDescription({ id: null, value: '' });
                                    }}
                                />
                                <p className="text-[10px] text-foreground/30">Auto-saves on blur</p>
                            </div>
                        ) : (
                            <p 
                                className={`text-xs text-foreground/50 leading-relaxed cursor-pointer hover:text-foreground transition-colors ${viewMode === 'grid' ? 'line-clamp-3 min-h-12' : 'truncate max-w-md'}`}
                                onClick={() => setEditingDescription({ id: item.fileId, value: item.description || '' })}
                            >
                                {item.description || "Add description for the AI..."}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            
            <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'pt-4 border-t border-border mt-auto' : ''}`}>
                <button 
                    onClick={() => onReplace(item.fileId, item.description || '')}
                    className="p-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded transition-all ml-auto"
                    title="Change Notion Source"
                >
                    <LinkIcon size={16} />
                </button>
                <button 
                    onClick={() => setEditingDescription({ id: item.fileId, value: item.description || '' })}
                    className="p-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded transition-all"
                    title="Edit description"
                >
                    <Pencil size={16} />
                </button>
                <button 
                    onClick={() => onRemove(item.fileId)}
                    className="p-2 text-foreground/80 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                    title="Remove source"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default KnowledgeItem;
