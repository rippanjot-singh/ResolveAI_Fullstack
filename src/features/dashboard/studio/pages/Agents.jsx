import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useChatbots } from '../hooks/useChatbots';
import { 
    Plus, Bot, Settings, Trash2, Power, Globe, 
    MessageSquare, Activity, ChevronRight, Search 
} from 'lucide-react';

const Agents = () => {
    const { chatbots, isLoading, error, handleToggleStatus, handleDelete } = useChatbots();

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />
            
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-medium text-foreground">Studio</h1>
                        <ChevronRight size={16} className="text-foreground/40" />
                        <span className="text-sm text-foreground/60 font-medium">Agents</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink 
                            to="/dashboard/studio/editor" 
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            <span>New Agent</span>
                        </NavLink>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Page Header */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">AI Agents</h2>
                        <p className="text-sm text-foreground/50">Manage your deployed AI chatbots and their performance across domains.</p>
                    </div>

                    {/* Filters & Search Placeholder */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search agents..." 
                                className="w-full pl-10 pr-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Filter buttons could go here */}
                        </div>
                    </div>

                    {/* Agents Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 border border-border rounded bg-surface/20 animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center border border-dashed border-border rounded bg-surface/10">
                            <p className="text-sm text-red-500">{error}</p>
                        </div>
                    ) : chatbots.length === 0 ? (
                        <div className="p-16 text-center border border-dashed border-border rounded bg-surface/5 space-y-4">
                            <div className="w-12 h-12 bg-surface rounded flex items-center justify-center mx-auto">
                                <Bot size={24} className="text-foreground/40" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-medium">No agents found</p>
                                <p className="text-sm text-foreground/50 max-w-xs mx-auto">
                                    You haven't created any AI agents yet. Start by creating your first one.
                                </p>
                            </div>
                            <NavLink 
                                to="/dashboard/studio/editor" 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-sm font-medium hover:bg-surface/70 transition-colors"
                            >
                                <Plus size={16} />
                                <span>Create your first agent</span>
                            </NavLink>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chatbots.map(bot => (
                                <AgentCard 
                                    key={bot._id} 
                                    bot={bot} 
                                    onToggle={() => handleToggleStatus(bot._id)}
                                    onDelete={() => handleDelete(bot._id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const AgentCard = ({ bot, onToggle, onDelete }) => (
    <div className="group border border-border rounded bg-surface/30 hover:bg-surface/50 hover:border-primary/30 transition-all flex flex-col p-5 space-y-4 relative overflow-hidden">
        {/* Status indicator line */}
        <div className={`absolute top-0 left-0 w-full h-0.5 ${bot.isActive ? 'bg-primary/50' : 'bg-foreground/10'}`} />

        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary`}>
                    <Bot size={20} />
                </div>
                <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{bot.name}</h3>
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded ${bot.isActive ? 'bg-green-500' : 'bg-foreground/20'}`} />
                        <span className="text-[10px] uppercase font-medium tracking-wider text-foreground/40">
                            {bot.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 transition-opacity">
                <button 
                    onClick={onToggle}
                    className={`p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors ${bot.isActive ? 'text-primary' : 'text-foreground/40'}`}
                    title={bot.isActive ? "Deactivate" : "Activate"}
                >
                    <Power size={14} />
                </button>
                <NavLink 
                    to={`/dashboard/studio/editor/${bot._id}`}
                    className="p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors text-foreground/60"
                    title="Settings"
                >
                    <Settings size={14} />
                </NavLink>
                <button 
                    onClick={onDelete}
                    className="p-1.5 rounded hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors text-red-500/60 hover:text-red-500"
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <p className="text-[10px] uppercase font-medium tracking-wider text-foreground/30">Model</p>
                <div className="flex items-center gap-1.5 text-xs text-foreground/70">
                    <Activity size={12} className="text-foreground/40" />
                    <span>{bot.model || 'Mistral Large'}</span>
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] uppercase font-medium tracking-wider text-foreground/30">Deployed On</p>
                <div className="flex items-center gap-1.5 text-xs text-foreground/70">
                    <Globe size={12} className="text-foreground/40" />
                    <span className="truncate">{bot.verifiedDomains?.[0] || 'Embedded Widget'}</span>
                </div>
            </div>
        </div>

        <div className="pt-4 border-t border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground/80">0</span>
                    <span className="text-[10px] text-foreground/40 uppercase font-medium tracking-wider leading-none">Chats</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground/80">0%</span>
                    <span className="text-[10px] text-foreground/40 uppercase font-medium tracking-wider leading-none">Resolved</span>
                </div>
            </div>
            <NavLink 
                to={`/dashboard/studio/analytics/${bot._id}`}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
                View Analytics
                <ChevronRight size={12} />
            </NavLink>
        </div>
    </div>
);

export default Agents;
