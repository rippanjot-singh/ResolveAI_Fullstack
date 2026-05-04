import React, { useState, useEffect, useMemo } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useKnowledge } from '../hooks/useKnowledge';

// Extracted Components
                    import KnowledgeHeader from '../components/KnowledgeHeader';
                    import KnowledgeEmptyState from '../components/KnowledgeEmptyState';
                    import KnowledgeToolbar from '../components/KnowledgeToolbar';
                    import KnowledgeItem from '../components/KnowledgeItem';
                    import AddKnowledgeModal from '../components/AddKnowledgeModal';

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

    const handleCloseModal = () => {
        setIsAddingPage(false); 
        setSelectedPage(null); 
        setReplacingId(null);
        setPageDescription('');
        setSearchQuery('');
    };

    const handleOpenReplace = (fileId, currentDescription) => {
        setReplacingId(fileId);
        setPageDescription(currentDescription);
        setIsAddingPage(true);
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0">
                <KnowledgeHeader 
                    isConnected={status.isConnected} 
                    connectNotion={connectNotion} 
                    onAddSource={() => setIsAddingPage(true)} 
                />

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        <KnowledgeEmptyState 
                            loading={loading} 
                            isConnected={status.isConnected} 
                            connectNotion={connectNotion} 
                        />

                        {status.isConnected && (
                            <div className="space-y-6">
                                <KnowledgeToolbar 
                                    viewMode={viewMode} 
                                    setViewMode={setViewMode} 
                                    status={status} 
                                    connectNotion={connectNotion} 
                                    disconnectWorkspace={disconnectWorkspace} 
                                    fetchStatus={fetchStatus} 
                                    loading={loading} 
                                />

                                {status.knowledge.length === 0 ? (
                                    <div className="py-20 text-center border border-dashed border-border rounded bg-surface/10">
                                        <p className="text-foreground/30 italic">No knowledge sources added yet. Click "Add Knowledge Source" to begin.</p>
                                    </div>
                                ) : (
                                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                                        {status.knowledge.map((item) => (
                                            <KnowledgeItem 
                                                key={item.fileId}
                                                item={item}
                                                viewMode={viewMode}
                                                editingDescription={editingDescription}
                                                setEditingDescription={setEditingDescription}
                                                updateDescription={updateDescription}
                                                onReplace={handleOpenReplace}
                                                onRemove={removeIntegration}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <AddKnowledgeModal 
                isOpen={isAddingPage}
                onClose={handleCloseModal}
                replacingId={replacingId}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                loading={loading}
                availablePages={availablePages}
                filteredPages={filteredPages}
                notionTree={notionTree}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                pageDescription={pageDescription}
                setPageDescription={setPageDescription}
                handleIntegrate={handleIntegrate}
            />
        </div>
    );
};

export default Knowledge;