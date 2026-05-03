import React from 'react';
import { X as LucideX, Search, Loader2, FileText, CheckCircle2, Info } from 'lucide-react';
import TreeNode from './TreeNode';

const AddKnowledgeModal = ({
    isOpen,
    onClose,
    replacingId,
    searchQuery,
    setSearchQuery,
    loading,
    availablePages,
    filteredPages,
    notionTree,
    selectedPage,
    setSelectedPage,
    pageDescription,
    setPageDescription,
    handleIntegrate
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-background border border-border rounded shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">{replacingId ? 'Change Knowledge Source' : 'Integrate Knowledge Source'}</h3>
                        <p className="text-xs text-foreground/40 mt-1">{replacingId ? 'Select a different page to replace the current one' : 'Select a Notion page to expose as a dynamic tool for your AI'}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-surface rounded transition-colors"
                    >
                        <LucideX size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Notion pages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 bg-surface/50 py-3 border border-border rounded text-sm focus:outline-none focus:border-primary transition-all shadow-sm"
                            />
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
                        </div>

                        <div className="border border-border rounded p-4 bg-surface/10 min-h-[350px]">
                            {loading && !availablePages.length ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-3">
                                    <Loader2 size={32} className="animate-spin text-primary" />
                                    <p className="text-sm text-foreground/40 font-medium">Fetching workspace pages...</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {searchQuery ? (
                                        filteredPages.length > 0 ? (
                                            filteredPages.map(page => (
                                                <div
                                                    key={page.id}
                                                    onClick={() => setSelectedPage(page)}
                                                    className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all ${selectedPage?.id === page.id ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-surface border-transparent'} border`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText size={16} className={selectedPage?.id === page.id ? 'text-primary' : 'text-foreground/30'} />
                                                        <span className="text-sm font-medium">{page.name}</span>
                                                    </div>
                                                    {selectedPage?.id === page.id && <CheckCircle2 size={16} />}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-foreground/30 italic text-sm">No pages matching your search.</div>
                                        )
                                    ) : (
                                        notionTree.length > 0 ? (
                                            notionTree.map(node => (
                                                <TreeNode
                                                    key={node.id}
                                                    node={node}
                                                    selectedId={selectedPage?.id}
                                                    onSelect={setSelectedPage}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-foreground/30 italic text-sm">No pages found in your workspace.</div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedPage && (
                        <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                <Info size={14} />
                                Integration Details
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-foreground/60">AI Instructions (What is this page for?)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Example: This page contains our product documentation. Use it to answer customer technical queries."
                                    value={pageDescription}
                                    onChange={(e) => setPageDescription(e.target.value)}
                                    className="w-full px-4 py-3 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary transition-all resize-none shadow-inner"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-surface/5">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!selectedPage || loading}
                        onClick={handleIntegrate}
                        className="px-8 py-2.5 bg-primary text-white rounded text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        {loading ? 'Processing...' : replacingId ? 'Update Source' : 'Integrate Page'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddKnowledgeModal;
