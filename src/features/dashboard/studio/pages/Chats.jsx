import React from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useChats } from '../hooks/useChats';
import { 
    MessageSquare, User, Bot, Calendar, ChevronRight, 
    X, ArrowUpRight, MessageCircle, Users, Zap, Eye, Mail
} from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import ReactMarkdown from 'react-markdown';

const Chats = () => {
    const { 
        chats, 
        loading, 
        selectedChat, 
        interactions, 
        interactionsLoading, 
        stats, 
        fetchInteractions, 
        closeChat 
    } = useChats();

    const [popoverId, setPopoverId] = React.useState(null);

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden" onClick={() => setPopoverId(null)}>
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8">
                    <div>
                        <h1 className="text-lg font-bold">Studio Chats</h1>
                        <p className="text-xs text-foreground/40">Monitor live conversations and agent performance</p>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard 
                            title="Total Conversations" 
                            value={stats.totalChats} 
                            icon={MessageCircle} 
                            loading={loading}
                        />
                        <StatCard 
                            title="Total Interactions" 
                            value={stats.totalMessages} 
                            icon={Zap} 
                            loading={loading}
                        />
                        <StatCard 
                            title="Active Agents" 
                            value={stats.activeAgents} 
                            icon={Users} 
                            loading={loading}
                        />
                    </div>

                    {/* Chats Table */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Recent Conversations</h3>
                        </div>
                        
                        <div className="bg-surface/10 backdrop-blur-md border border-border rounded relative z-10">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border bg-surface/5">
                                        <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40">User</th>
                                        <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40">Agent</th>
                                        <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40 text-center">Messages</th>
                                        <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40">Date</th>
                                        <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-wider text-foreground/40 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {loading ? (
                                        [...Array(5)].map((_, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4"><Skeleton width={120} height={16} /></td>
                                                <td className="px-6 py-4"><Skeleton width={100} height={16} /></td>
                                                <td className="px-6 py-4 text-center"><Skeleton width={30} height={16} className="mx-auto" /></td>
                                                <td className="px-6 py-4"><Skeleton width={80} height={16} /></td>
                                                <td className="px-6 py-4 text-right"><Skeleton width={24} height={24} className="ml-auto" /></td>
                                            </tr>
                                        ))
                                    ) : chats.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-foreground/40 text-sm italic">
                                                No conversations found yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        chats.map((chat) => (
                                            <tr 
                                                key={chat._id} 
                                                className="hover:bg-surface/5 transition-colors cursor-pointer group"
                                                onClick={() => fetchInteractions(chat)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                            <User size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{chat.name || 'Anonymous Guest'}</p>
                                                            <p className="text-[10px] text-foreground/40">{chat.email || 'No email provided'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Bot size={14} className="text-primary/60" />
                                                        <span>{chat.chatbotId?.name || 'Unknown Agent'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center text-xs font-medium">
                                                    {chat.interactionCount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-[11px] text-foreground/60">
                                                        <Calendar size={12} />
                                                        <span>{new Date(chat.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="relative">
                                                            <button 
                                                                className={`p-1.5 rounded border transition-all ${popoverId === chat._id ? 'bg-surface border-border text-primary' : 'border-transparent hover:border-border text-foreground/40 hover:text-primary'}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setPopoverId(popoverId === chat._id ? null : chat._id);
                                                                }}
                                                                title="View User Info"
                                                            >
                                                                <Eye size={16} />
                                                            </button>
                                                            {popoverId === chat._id && (
                                                                <div 
                                                                    className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded shadow-xl p-4 z-999 animate-in fade-in slide-in-from-top-2 duration-200 text-left"
                                                                    onClick={e => e.stopPropagation()}
                                                                >
                                                                    <div className="space-y-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                                                <User size={14} />
                                                                            </div>
                                                                            <div className="min-w-0">
                                                                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">User Name</p>
                                                                                <p className="text-xs font-semibold truncate">{chat.name || 'Anonymous Guest'}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                                                <Mail size={14} />
                                                                            </div>
                                                                            <div className="min-w-0">
                                                                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Email Address</p>
                                                                                <p className="text-xs font-semibold truncate">{chat.email || 'No email provided'}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <button 
                                                            className="p-1.5 rounded hover:bg-primary/10 text-foreground/40 group-hover:text-primary transition-all"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                fetchInteractions(chat);
                                                            }}
                                                        >
                                                            <ArrowUpRight size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>

                {/* Chat Details Modal */}
                {selectedChat && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <div 
                            className="absolute inset-0 bg-background/10 backdrop-blur-md" 
                            onClick={closeChat}
                        />
                        <div className="relative w-full max-w-2xl max-h-[85vh] bg-surface border border-border rounded flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-4 border-b border-border bg-surface/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">{selectedChat.name || 'Anonymous Guest'}</h3>
                                        <div className="flex items-center gap-2 text-[10px] text-foreground/40 font-medium">
                                            <span className="uppercase tracking-wider">Conversation with {selectedChat.chatbotId?.name}</span>
                                            {selectedChat.email && (
                                                <>
                                                    <span className="text-border">•</span>
                                                    <div className="flex items-center gap-1 text-primary/60 lowercase">
                                                        <Mail size={10} />
                                                        <span>{selectedChat.email}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={closeChat}
                                    className="p-2 hover:bg-background rounded-full text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-background/30 overscroll-contain will-change-scroll">
                                {interactionsLoading ? (
                                    <div className="space-y-6">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                                <Skeleton width={200} height={60} />
                                            </div>
                                        ))}
                                    </div>
                                ) : interactions.length === 0 ? (
                                    <div className="text-center py-12 text-foreground/40 text-sm">
                                        No interactions found for this session.
                                    </div>
                                ) : (
                                    interactions.map((interaction, i) => (
                                        <div key={i} className="space-y-4">
                                            {/* User Message */}
                                            <div className="flex justify-end">
                                                <div className="max-w-[85%] bg-primary text-white rounded px-4 py-3 text-sm shadow-lg shadow-primary/10">
                                                    {interaction.question}
                                                    <div className="mt-1 text-[9px] opacity-60 text-right">
                                                        {new Date(interaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AI Response */}
                                            <div className="flex justify-start">
                                                <div className="max-w-[85%] bg-surface border border-border rounded px-4 py-3 text-sm">
                                                    <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-primary/70">
                                                        <Bot size={12} />
                                                        Agent Response
                                                    </div>
                                                    <div className="markdown-content prose-p:leading-relaxed prose-li:mb-1">
                                                        <ReactMarkdown
                                                            components={{
                                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                                ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                            }}
                                                        >
                                                            {interaction.answer}
                                                        </ReactMarkdown>
                                                    </div>
                                                    <div className="mt-2 text-[9px] text-foreground/30">
                                                        {new Date(interaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-border bg-surface/30 flex items-center justify-between text-[11px] text-foreground/40">
                                <span>Total Interactions: {interactions.length}</span>
                                <span>Session ID: {selectedChat._id}</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, loading }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 transition-all">
        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            {loading ? <Skeleton width={60} height={24} /> : <p className="text-2xl font-bold">{value}</p>}
        </div>
    </div>
);

export default Chats;
