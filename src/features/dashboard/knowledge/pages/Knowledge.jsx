import React, { useState, useEffect, useMemo } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useKnowledge } from '../hooks/useKnowledge';
import {
    Database, Plus, Trash2, FileText, ChevronRight, ChevronDown,
    CheckCircle2, Loader2, Info, Search, X as LucideX,
    ExternalLink, RefreshCw, LayoutGrid, List as ListIcon, Pencil, Link as LinkIcon
} from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const TreeNode = ({ node, selectedId, onSelect, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    return (
        <div className="select-none">
            <div
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all ${isSelected ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-surface border-transparent'} border`}
                style={{ marginLeft: `${depth * 12}px` }}
                onClick={() => onSelect(node)}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="p-1 hover:bg-foreground/5 rounded transition-colors"
                        onClick={(e) => {
                            if (hasChildren) {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }
                        }}
                    >
                        {hasChildren ? (
                            isOpen ? <ChevronDown size={14} className="text-foreground/40" /> : <ChevronRight size={14} className="text-foreground/40" />
                        ) : (
                            <div className="w-3.5" />
                        )}
                    </div>
                    <FileText size={16} className={isSelected ? 'text-primary' : 'text-foreground/30'} />
                    <span className="text-sm font-medium truncate max-w-[300px]">{node.name}</span>
                </div>
                {isSelected && <CheckCircle2 size={16} className="text-primary" />}
            </div>
            {isOpen && hasChildren && (
                <div className="mt-1">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Knowledge = () => {
    const {
        loading,
        status,
        availablePages,
        fetchStatus,
        fetchPages,
        connectNotion,
        integratePage,
        removeIntegration,
        updateDescription,
        replaceSource,
        disconnectWorkspace
    } = useKnowledge();

    const [isAddingPage, setIsAddingPage] = useState(false);
    const [replacingId, setReplacingId] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const [pageDescription, setPageDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [editingDescription, setEditingDescription] = useState({ id: null, value: '' });

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    useEffect(() => {
        if (isAddingPage && status.isConnected) {
            fetchPages();
        }
    }, [isAddingPage, status.isConnected, fetchPages]);

    const notionTree = useMemo(() => {
        const buildTree = (nodes, parentId = 'root') => {
            return nodes
                .filter(node => node.parentId === parentId)
                .map(node => ({
                    ...node,
                    children: buildTree(nodes, node.id)
                }));
        };
        return buildTree(availablePages);
    }, [availablePages]);

    const filteredPages = useMemo(() => {
        if (!searchQuery) return [];
        return availablePages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [availablePages, searchQuery]);

    const handleIntegrate = async () => {
        if (selectedPage) {
            if (replacingId) {
                await replaceSource(replacingId, selectedPage, pageDescription);
            } else {
                await integratePage(selectedPage, pageDescription);
            }
            setIsAddingPage(false);
            setSelectedPage(null);
            setPageDescription('');
            setReplacingId(null);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 gap-4">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Company Knowledge</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">Manage shared information and dynamic tools for your AI</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        {!status.isConnected ? (
                            <button
                                onClick={connectNotion}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-4 h-4 rounded" />
                                <span>Connect Notion</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsAddingPage(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                <Plus size={16} />
                                <span>Add Knowledge Source</span>
                            </button>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        {/* Status Card */}
                        {loading && !status.isConnected ? (
                            <SkeletonWrapper>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="border border-border rounded p-5 bg-surface/30 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Skeleton width={32} height={32} />
                                                <Skeleton width={140} height={16} />
                                            </div>
                                            <Skeleton height={40} />
                                            <div className="flex gap-2 pt-2">
                                                <Skeleton width={60} height={28} />
                                                <Skeleton width={60} height={28} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SkeletonWrapper>
                        ) : !status.isConnected ? (
                            <div className="p-12 border border-dashed border-border rounded bg-surface/20 flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded bg-surface flex items-center justify-center border border-border">
                                    <Database size={32} className="text-foreground/20" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Connect Your Knowledge Base</h3>
                                    <p className="text-sm text-foreground/50 max-w-md mt-2">
                                        Integrate Notion pages to provide your AI with real-time access to company documentation, guides, and data.
                                    </p>
                                </div>
                                <button
                                    onClick={connectNotion}
                                    className="mt-4 flex items-center gap-2 px-8 py-3 bg-primary text-white rounded font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    Get Started with Notion
                                </button>
                            </div>
                        ) : null}

                        {status.isConnected && (
                            <div className="space-y-6">
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

                                {status.knowledge.length === 0 ? (
                                    <div className="py-20 text-center border border-dashed border-border rounded bg-surface/10">
                                        <p className="text-foreground/30 italic">No knowledge sources added yet. Click "Add Knowledge Source" to begin.</p>
                                    </div>
                                ) : (
                                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                                        {status.knowledge.map((item) => (
                                            <div 
                                                key={item.fileId} 
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
                                                        onClick={() => {
                                                            setReplacingId(item.fileId);
                                                            setPageDescription(item.description || '');
                                                            setIsAddingPage(true);
                                                        }}
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
                                                        onClick={() => removeIntegration(item.fileId)}
                                                        className="p-2 text-foreground/80 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                                                        title="Remove source"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add Source Modal */}
            {isAddingPage && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-background border border-border rounded shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">{replacingId ? 'Change Knowledge Source' : 'Integrate Knowledge Source'}</h3>
                                <p className="text-xs text-foreground/40 mt-1">{replacingId ? 'Select a different page to replace the current one' : 'Select a Notion page to expose as a dynamic tool for your AI'}</p>
                            </div>
                            <button 
                                onClick={() => { 
                                    setIsAddingPage(false); 
                                    setSelectedPage(null); 
                                    setReplacingId(null);
                                    setPageDescription('');
                                }} 
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
                                onClick={() => { 
                                    setIsAddingPage(false); 
                                    setSelectedPage(null); 
                                    setReplacingId(null);
                                    setPageDescription('');
                                }}
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
            )}
        </div>
    );
};

export default Knowledge;