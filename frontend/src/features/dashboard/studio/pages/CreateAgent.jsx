import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useAgentEditor } from '../hooks/useAgentEditor';
import ChatbotPreview from '../components/ChatbotPreview';
import {
    ChevronRight, ChevronDown, Save, Info, Palette,
    Database, Link as LinkIcon, Globe as GlobeIcon, FileText,
    Plus, Trash2, Sliders, CheckCircle2, AlertCircle, Loader2, Upload, X as LucideX,
    ChevronLeft, ExternalLink, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';
import * as notionApi from '../services/notion.api';

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

const CreateAgent = () => {
    const [activeTab, setActiveTab] = useState('general');
    const {
        formData, setFormData, isLoading, isSaving, isEditing, error,
        handleSave, handleTrainWebsite, handleTrainPDF, handleSetMaster
    } = useAgentEditor();

    const [websiteUrl, setWebsiteUrl] = useState('');
    const [trainingFile, setTrainingFile] = useState(null);
    const [isScraping, setIsScraping] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [notionStatus, setNotionStatus] = useState({ isConnected: false, workspace: null });
    const [notionPages, setNotionPages] = useState([]);
    const [isLoadingPages, setIsLoadingPages] = useState(false);
    const [isIntegrating, setIsIntegrating] = useState(false);

    const [isAddingPage, setIsAddingPage] = useState(false);
    const [selectedPageForIntegration, setSelectedPageForIntegration] = useState(null);
    const [pageDescription, setPageDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const fetchNotionStatus = async () => {
            try {
                const response = await notionApi.getNotionStatus();
                if (response.success) setNotionStatus(response);
                if (response.isConnected) fetchPages();
            } catch (err) {
                console.error('Failed to fetch notion status');
            }
        };
        fetchNotionStatus();
    }, []);

    React.useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'NOTION_AUTH_SUCCESS') {
                toast.success('Notion connected successfully');
                setNotionStatus({ isConnected: true });
                fetchPages();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const fetchPages = async () => {
        try {
            setIsLoadingPages(true);
            const response = await notionApi.getNotionPages();
            if (response.success) setNotionPages(response.pages);
        } catch (err) {
            toast.error('Failed to load Notion pages');
        } finally {
            setIsLoadingPages(false);
        }
    };

    const handleConnectNotion = async () => {
        try {
            const response = await notionApi.getNotionAuthUrl();
            if (response.success) {
                window.open(response.authUrl, 'Notion Auth', 'width=600,height=700');
            }
        } catch (err) {
            toast.error('Failed to start Notion auth');
        }
    };

    const handleIntegratePage = async () => {
        if (!isEditing) {
            toast.error('Please save your agent first');
            return;
        }
        if (!selectedPageForIntegration) return;

        try {
            setIsIntegrating(true);
            const response = await notionApi.integrateNotionPage({
                chatbotId: formData._id,
                pageId: selectedPageForIntegration.id,
                name: selectedPageForIntegration.name,
                description: pageDescription
            });
            if (response.success) {
                setFormData(prev => ({ ...prev, integrations: response.integrations }));
                toast.success(`${selectedPageForIntegration.name} integrated`);
                setIsAddingPage(false);
                setSelectedPageForIntegration(null);
                setPageDescription('');
            }
        } catch (err) {
            toast.error('Integration failed');
        } finally {
            setIsIntegrating(false);
        }
    };

    const handleRemoveIntegration = async (pageId) => {
        try {
            const response = await notionApi.removeNotionIntegration({
                chatbotId: formData._id,
                pageId
            });
            if (response.success) {
                setFormData(prev => ({ ...prev, integrations: response.integrations }));
                toast.success('Integration removed');
            }
        } catch (err) {
            toast.error('Removal failed');
        }
    };

    const notionTree = React.useMemo(() => {
        const buildTree = (nodes, parentId = 'root') => {
            return nodes
                .filter(node => node.parentId === parentId)
                .map(node => ({
                    ...node,
                    children: buildTree(nodes, node.id)
                }));
        };
        return buildTree(notionPages);
    }, [notionPages]);

    const filteredPages = React.useMemo(() => {
        if (!searchQuery) return [];
        return notionPages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [notionPages, searchQuery]);

    const updateStyle = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            style: {
                ...prev.style,
                [section]: typeof prev.style[section] === 'object'
                    ? { ...prev.style[section], [field]: value }
                    : value
            }
        }));
    };

    const handleSaveAgent = async () => {
        const result = await handleSave();
        if (result.success) {
            toast.success('Agent saved successfully');
        } else {
            toast.error(result.message || 'Failed to save agent');
        }
    };

    const handleWebsiteTrain = async () => {
        if (!websiteUrl) return;
        setIsScraping(true);
        const result = await handleTrainWebsite(websiteUrl);
        setIsScraping(false);
        if (result.success) {
            toast.success('Trained with website data');
        } else {
            toast.error(result.message || 'Training failed');
        }
    };

    const handleFileTrain = async () => {
        if (!trainingFile) return;
        setIsUploading(true);
        const result = await handleTrainPDF(trainingFile);
        setIsUploading(false);
        if (result.success) {
            toast.success('Trained with PDF data');
        } else {
            toast.error(result.message || 'Training failed');
        }
    };

    const addFaq = () => {
        setFormData(prev => ({
            ...prev,
            faq: [...prev.faq, { question: '', answer: '' }]
        }));
    };

    const updateFaq = (index, field, value) => {
        const newFaq = [...formData.faq];
        newFaq[index][field] = value;
        setFormData(prev => ({ ...prev, faq: newFaq }));
    };

    const removeFaq = (index) => {
        setFormData(prev => ({
            ...prev,
            faq: prev.faq.filter((_, i) => i !== index)
        }));
    };

    const handleTabChange = async (tabId) => {
        if (!isEditing && formData.name && tabId !== 'general') {
            await handleSave();
        }
        setActiveTab(tabId);
    };

    if (isLoading) return <div className="flex h-screen w-full bg-background"><SideNav /><div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div></div>;

    const tabs = [
        { id: 'general', label: 'General', icon: Info },
        { id: 'knowledge', label: 'Knowledge', icon: Database },
        { id: 'design', label: 'Design', icon: Palette },
        { id: 'connect', label: 'Connect', icon: LinkIcon }
    ];

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <NavLink to="/dashboard/studio/agents" className="text-sm text-foreground/40 hover:text-foreground transition-colors font-medium whitespace-nowrap">Agents</NavLink>
                        <ChevronRight size={16} className="text-foreground/20 shrink-0" />
                        <span className="text-sm text-foreground font-medium truncate">{isEditing ? formData.name : 'Create Agent'}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <NavLink
                            to="/dashboard/studio/agents"
                            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-sm font-medium hover:bg-surface/70 transition-colors"
                        >
                            <ChevronLeft size={16} />
                            <span>Get back to Agents</span>
                        </NavLink>
                        {isEditing && (
                            <button
                                onClick={handleSetMaster}
                                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${formData.isMaster
                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                    : 'bg-surface border border-border text-foreground/60 hover:text-foreground hover:bg-surface/80'
                                    }`}
                            >
                                <Shield size={16} className={formData.isMaster ? 'fill-current' : ''} />
                                <span>{formData.isMaster ? 'Master Agent' : 'Set as Master'}</span>
                            </button>
                        )}
                        <button
                            onClick={handleSaveAgent}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>{isEditing ? 'Save Changes' : 'Save Agent'}</span>
                        </button>

                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Form Area */}
                    <div className="flex-1 overflow-y-auto min-w-0 scrollbar-hide">
                        <div className="max-w-4xl mx-auto p-8 space-y-8">

                            {/* Tabs Navigation */}
                            <div className="flex items-center gap-1 border-b border-border">
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabChange(tab.id)}
                                            className={`flex items-center gap-2 px-[clamp(0.5rem,2vw,1.5rem)] py-3 text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium border-b-2 transition-all ${activeTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-foreground/50 hover:text-foreground hover:bg-surface/50'}`}
                                        >
                                            <Icon size={16} className="shrink-0" />
                                            <span className="whitespace-nowrap">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-8">
                                {activeTab === 'general' && (
                                    <div className="space-y-6">
                                        <section className="space-y-4">
                                            <h3 className="text-lg font-semibold">Basic Information</h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Agent Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="e.g. Customer Support Bot"
                                                        className="w-full px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Description</label>
                                                    <textarea
                                                        rows={4}
                                                        value={formData.description}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                                        placeholder="Briefly describe what this agent does..."
                                                        className="w-full px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'knowledge' && (
                                    <div className="space-y-8">
                                        <section className="space-y-4">
                                            <h3 className="text-lg font-semibold">Training Data</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-4 border border-border rounded bg-surface/30 space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <GlobeIcon size={18} className="text-primary" />
                                                        <span className="text-sm font-medium">Website URL</span>
                                                    </div>
                                                    <input
                                                        type="url"
                                                        placeholder="https://example.com"
                                                        value={websiteUrl}
                                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                                        className="w-full px-3 py-1.5 bg-background border border-border rounded text-xs focus:outline-none focus:border-primary"
                                                    />
                                                    <button
                                                        onClick={handleWebsiteTrain}
                                                        disabled={isScraping || isUploading || (!isEditing && !formData._id)}
                                                        className="w-full py-2 bg-surface hover:bg-surface/80 border border-border rounded text-xs font-medium transition-colors disabled:opacity-50"
                                                    >
                                                        {isScraping ? 'Scraping...' : 'Fetch Website Data'}
                                                    </button>
                                                </div>
                                                <div className="p-4 border border-border rounded bg-surface/30 space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <FileText size={18} className="text-primary" />
                                                        <span className="text-sm font-medium">PDF Document</span>
                                                    </div>
                                                    <div className="relative group">
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => setTrainingFile(e.target.files[0])}
                                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className="w-full px-3 py-1.5 bg-background border border-border rounded text-xs text-foreground/50 flex items-center justify-between">
                                                            <span className="truncate">{trainingFile ? trainingFile.name : 'Select PDF file...'}</span>
                                                            <Upload size={14} />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleFileTrain}
                                                        disabled={isUploading || isScraping || !trainingFile || (!isEditing && !formData._id)}
                                                        className="w-full py-2 bg-surface hover:bg-surface/80 border border-border rounded text-xs font-medium transition-colors disabled:opacity-50"
                                                    >
                                                        {isUploading ? 'Processing...' : 'Upload & Train'}
                                                    </button>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold">Integrations</h3>
                                                {notionStatus.isConnected && (
                                                    <button
                                                        onClick={fetchPages}
                                                        className="text-xs text-primary hover:underline font-medium"
                                                    >
                                                        Refresh Notion Pages
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-6 border border-border rounded bg-surface/30 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded bg-white flex items-center justify-center border border-border shadow-sm">
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold">Notion</p>
                                                            <p className="text-xs text-foreground/40">{notionStatus.isConnected ? `Connected to ${notionStatus.workspace || 'Workspace'}` : 'Connect Notion pages to your AI'}</p>
                                                        </div>
                                                    </div>
                                                    {!notionStatus.isConnected ? (
                                                        <button
                                                            onClick={handleConnectNotion}
                                                            className="px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                                                        >
                                                            Connect Notion
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => setIsAddingPage(true)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                            Add Page
                                                        </button>
                                                    )}
                                                </div>

                                                {notionStatus.isConnected && (
                                                    <div className="space-y-4 pt-4 border-t border-border">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Connected Pages</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {formData.integrations?.filter(i => i.provider === 'notion').map((item, i) => (
                                                                    <div key={i} className="flex items-start justify-between p-4 bg-surface border border-border rounded group">
                                                                        <div className="flex gap-4">
                                                                            <div className="mt-1">
                                                                                <FileText size={18} className="text-primary/60" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-semibold">{item.name}</p>
                                                                                <p className="text-xs text-foreground/50 mt-1 leading-relaxed">{item.description}</p>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleRemoveIntegration(item.fileId)}
                                                                            className="p-1.5 text-foreground/20 hover:text-red-500 transition-colors"
                                                                        >
                                                                            <Trash2 size={16} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                {formData.integrations?.filter(i => i.provider === 'notion').length === 0 && (
                                                                    <p className="text-xs text-foreground/30 py-4 italic text-center bg-surface/20 rounded border border-dashed border-border">No pages added to knowledge base yet.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* Add Page Modal */}
                                        {isAddingPage && (
                                            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                                                <div className="bg-background border border-border rounded shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                                                    <div className="p-6 border-b border-border flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-xl font-bold">Add Notion Page</h3>
                                                            <p className="text-xs text-foreground/40 mt-1">Select a page and define its role for the AI</p>
                                                        </div>
                                                        <button onClick={() => { setIsAddingPage(false); setSelectedPageForIntegration(null); }} className="p-2 hover:bg-surface rounded-full transition-colors">
                                                            <LucideX size={20} />
                                                        </button>
                                                    </div>

                                                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                                        <div className="space-y-4">
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search pages..."
                                                                    value={searchQuery}
                                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                                    className="w-full pl-10 pr-4 bg-background py-2.5 border border-border rounded text-sm focus:outline-none focus:border-primary transition-all shadow-sm"
                                                                />
                                                                <Database size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
                                                            </div>

                                                            <div className="border border-border rounded p-4 bg-surface/30 min-h-[300px]">
                                                                {isLoadingPages ? (
                                                                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                                                                        <Loader2 size={32} className="animate-spin text-primary" />
                                                                        <p className="text-sm text-foreground/40">Loading workspace tree...</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-1">
                                                                        {searchQuery ? (
                                                                            filteredPages.map(page => (
                                                                                <div
                                                                                    key={page.id}
                                                                                    onClick={() => setSelectedPageForIntegration(page)}
                                                                                    className={`flex items-center justify-between p-2.5 rounded cursor-pointer transition-all ${selectedPageForIntegration?.id === page.id ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-surface border-transparent'} border`}
                                                                                >
                                                                                    <div className="flex items-center gap-3">
                                                                                        <FileText size={16} className={selectedPageForIntegration?.id === page.id ? 'text-primary' : 'text-foreground/30'} />
                                                                                        <span className="text-sm font-medium">{page.name}</span>
                                                                                    </div>
                                                                                    {selectedPageForIntegration?.id === page.id && <CheckCircle2 size={16} />}
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            notionTree.map(node => (
                                                                                <TreeNode
                                                                                    key={node.id}
                                                                                    node={node}
                                                                                    selectedId={selectedPageForIntegration?.id}
                                                                                    onSelect={setSelectedPageForIntegration}
                                                                                />
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {selectedPageForIntegration && (
                                                            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                                                    <Info size={14} />
                                                                    Integration Details
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-xs font-medium text-foreground/60">AI Instructions (What is this page for?)</label>
                                                                    <textarea
                                                                        rows={3}
                                                                        placeholder="Example: This page contains our product documentation for Q1. Use it to answer customer technical queries."
                                                                        value={pageDescription}
                                                                        onChange={(e) => setPageDescription(e.target.value)}
                                                                        className="w-full px-4 py-3 bg-background border border-border rounded text-sm focus:outline-none focus:border-primary transition-all resize-none shadow-inner"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-surface/10">
                                                        <button
                                                            onClick={() => { setIsAddingPage(false); setSelectedPageForIntegration(null); }}
                                                            className="px-6 py-2 text-sm font-medium hover:text-primary transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            disabled={!selectedPageForIntegration || !pageDescription || isIntegrating}
                                                            onClick={handleIntegratePage}
                                                            className="px-8 py-2 bg-primary text-white rounded text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
                                                        >
                                                            {isIntegrating ? 'Integrating...' : 'Add Integration'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <section className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold">Base Instructions (Prompt)</h3>
                                                <span className="text-[10px] text-foreground/40 font-mono uppercase">AI Personality & Logic</span>
                                            </div>
                                            <textarea
                                                rows={12}
                                                value={formData.prompt}
                                                onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                                                placeholder="Define how your AI should behave, its tone, and its knowledge limits..."
                                                className="w-full px-4 py-3 bg-surface/50 border border-border rounded text-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                                            />
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'design' && (
                                    <div className="space-y-10">
                                        {/* Brand Colors */}
                                        <section className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <Palette size={18} className="text-primary" />
                                                <h3 className="text-lg font-semibold">Brand Colors</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <ColorInput label="Primary" value={formData.style.brandColor.primary} onChange={(v) => updateStyle('brandColor', 'primary', v)} />
                                                <ColorInput label="Secondary" value={formData.style.brandColor.secondary} onChange={(v) => updateStyle('brandColor', 'secondary', v)} />
                                                <ColorInput label="Accent" value={formData.style.brandColor.accent} onChange={(v) => updateStyle('brandColor', 'accent', v)} />
                                            </div>
                                        </section>

                                        {/* Global Styling */}
                                        <section className="space-y-6">
                                            <h3 className="text-lg font-semibold border-b border-border pb-2">Global Appearance</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <ColorInput label="Text Color" value={formData.style.textColor} onChange={(v) => updateStyle('textColor', null, v)} />
                                                    <ColorInput label="Window Background" value={formData.style.bgColor} onChange={(v) => updateStyle('bgColor', null, v)} />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Window Corners</label>
                                                        <div className="flex gap-2 p-1 bg-surface/50 border border-border rounded">
                                                            <button onClick={() => updateStyle('corner', null, 'rounded')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.corner === 'rounded' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Rounded</button>
                                                            <button onClick={() => updateStyle('corner', null, 'square')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.corner === 'square' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Square</button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Avatar Corners</label>
                                                        <div className="flex gap-2 p-1 bg-surface/50 border border-border rounded">
                                                            <button onClick={() => updateStyle('icon', null, 'rounded')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.icon === 'rounded' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Rounded</button>
                                                            <button onClick={() => updateStyle('icon', null, 'square')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.icon === 'square' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Square</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Bot Reply Style */}
                                        <section className="space-y-6">
                                            <h3 className="text-lg font-semibold border-b border-border pb-2">Bot Reply Style</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <ColorInput label="Reply Text Color" value={formData.style.replyStyle.textColor} onChange={(v) => updateStyle('replyStyle', 'textColor', v)} />
                                                    <ColorInput label="Reply Background" value={formData.style.replyStyle.bgColor} onChange={(v) => updateStyle('replyStyle', 'bgColor', v)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Reply Type</label>
                                                    <div className="flex gap-2 p-1 bg-surface/50 border border-border rounded">
                                                        <button onClick={() => updateStyle('replyStyle', 'replyType', 'bubble')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.replyStyle.replyType === 'bubble' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Bubble</button>
                                                        <button onClick={() => updateStyle('replyStyle', 'replyType', 'text')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.replyStyle.replyType === 'text' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Text</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* User Message Style */}
                                        <section className="space-y-6 pb-8">
                                            <h3 className="text-lg font-semibold border-b border-border pb-2">User Message Style</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <ColorInput label="Sender Text Color" value={formData.style.senderStyle.textColor} onChange={(v) => updateStyle('senderStyle', 'textColor', v)} />
                                                    <ColorInput label="Sender Background" value={formData.style.senderStyle.bgColor} onChange={(v) => updateStyle('senderStyle', 'bgColor', v)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Sender Type</label>
                                                    <div className="flex gap-2 p-1 bg-surface/50 border border-border rounded">
                                                        <button onClick={() => updateStyle('senderStyle', 'senderType', 'bubble')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.senderStyle.senderType === 'bubble' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Bubble</button>
                                                        <button onClick={() => updateStyle('senderStyle', 'senderType', 'text')} className={`flex-1 py-1.5 rounded text-xs transition-colors ${formData.style.senderStyle.senderType === 'text' ? 'bg-background shadow-sm border border-border font-medium text-primary' : 'text-foreground/50'}`}>Text</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'connect' && (
                                    <div className="space-y-10">
                                        {/* FAQ Management */}
                                        <section className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Sliders size={18} className="text-primary" />
                                                    <h3 className="text-lg font-semibold">Common Questions (FAQ)</h3>
                                                </div>
                                                <button
                                                    onClick={addFaq}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded text-xs font-bold transition-colors"
                                                >
                                                    <Plus size={14} />
                                                    Add FAQ
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {formData.faq.map((item, i) => (
                                                    <div key={i} className="p-4 border border-border rounded bg-surface/30 space-y-3 relative group">
                                                        <button
                                                            onClick={() => removeFaq(i)}
                                                            className="absolute top-4 right-4 text-foreground/20 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <div className="space-y-2 pr-8">
                                                            <input
                                                                type="text"
                                                                placeholder="Question..."
                                                                value={item.question}
                                                                onChange={(e) => updateFaq(i, 'question', e.target.value)}
                                                                className="w-full bg-background border border-border rounded px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                                                            />
                                                            <textarea
                                                                rows={2}
                                                                placeholder="Answer..."
                                                                value={item.answer}
                                                                onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                                                                className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                {formData.faq.length === 0 && (
                                                    <div className="text-center py-12 border border-dashed border-border rounded bg-surface/10">
                                                        <p className="text-sm text-foreground/40 font-medium">No FAQs added yet.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <section className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <GlobeIcon size={18} className="text-primary" />
                                                <h3 className="text-lg font-semibold">Security & Domains</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Verified Domains</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            id="verified-domain-input"
                                                            placeholder="e.g. app.yoursite.com"
                                                            className="flex-1 px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary transition-colors"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    const val = e.target.value.trim();
                                                                    if (val) {
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            verifiedDomains: [...(prev.verifiedDomains || []), val]
                                                                        }));
                                                                        e.target.value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const input = document.getElementById('verified-domain-input');
                                                                const val = input.value.trim();
                                                                if (val) {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        verifiedDomains: [...(prev.verifiedDomains || []), val]
                                                                    }));
                                                                    input.value = '';
                                                                }
                                                            }}
                                                            className="px-3 py-2 bg-surface border border-border rounded text-xs font-bold hover:bg-surface/80 transition-colors"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.verifiedDomains?.map((domain, i) => (
                                                            <div key={i} className="flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded text-xs font-medium">
                                                                {domain}
                                                                <button onClick={() => setFormData(prev => ({ ...prev, verifiedDomains: prev.verifiedDomains.filter((_, idx) => idx !== i) }))} className="hover:text-red-500"><LucideX size={12} /></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Restricted Domains</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            id="restricted-domain-input"
                                                            placeholder="e.g. localhost, test.com"
                                                            className="flex-1 px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-red-400/50 transition-colors"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    const val = e.target.value.trim();
                                                                    if (val) {
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            restrictedDomains: [...(prev.restrictedDomains || []), val]
                                                                        }));
                                                                        e.target.value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const input = document.getElementById('restricted-domain-input');
                                                                const val = input.value.trim();
                                                                if (val) {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        restrictedDomains: [...(prev.restrictedDomains || []), val]
                                                                    }));
                                                                    input.value = '';
                                                                }
                                                            }}
                                                            className="px-3 py-2 bg-surface border border-border rounded text-xs font-bold hover:bg-surface/80 transition-colors"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.restrictedDomains?.map((domain, i) => (
                                                            <div key={i} className="flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded text-xs font-medium text-foreground/70">
                                                                {domain}
                                                                <button onClick={() => setFormData(prev => ({ ...prev, restrictedDomains: prev.restrictedDomains.filter((_, idx) => idx !== i) }))} className="hover:text-red-500"><LucideX size={12} /></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <Sliders size={18} className="text-primary" />
                                                <h3 className="text-lg font-semibold">Widget Behavior</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Greeting Message</label>
                                                    <input
                                                        type="text"
                                                        value={formData.greeting}
                                                        onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                                                        className="w-full px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Widget Position</label>
                                                    <select
                                                        value={formData.position}
                                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                        className="w-full px-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary"
                                                    >
                                                        <option value="bottom-right">Bottom Right</option>
                                                        <option value="bottom-left">Bottom Left</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="w-[480px] border-l border-border bg-surface/10 overflow-y-auto hidden xl:block">
                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/30">Live Preview</h3>
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500/20" />
                                    <span className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                    <span className="w-2 h-2 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <ChatbotPreview config={formData} />
                            <div className="p-4 bg-primary/5 border border-primary/10 rounded">
                                <p className="text-[10px] text-primary/80 font-bold leading-relaxed italic">
                                    This is a replica of how your widget will look in the wild. All style changes are reflected instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ColorInput = ({ label, value, onChange, mini = false }) => (
    <div className={`space-y-2 ${mini ? 'flex items-center justify-between gap-4' : ''}`}>
        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">{label}</label>
        <div className={`flex items-center gap-2 p-1.5 bg-background border border-border rounded ${mini ? 'flex-1' : ''}`}>
            <div className="w-6 h-6 rounded border border-border relative overflow-hidden shrink-0">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 scale-150 cursor-pointer"
                />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-xs font-mono focus:outline-none uppercase"
            />
        </div>
    </div>
);

export default CreateAgent;
