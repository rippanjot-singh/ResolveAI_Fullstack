import React, { useState, useRef, useEffect } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { usePlayground } from '../hooks/usePlayground';
import { 
    Send, Bot, User, Sparkles, Save, Code, Copy, Check, 
    ChevronRight, Info, MessageSquare, Terminal, RefreshCw, X
} from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import ReactMarkdown from 'react-markdown';

const Playground = () => {
    const {
        chatbots,
        selectedBot,
        loading,
        saving,
        messages,
        chatLoading,
        formData,
        selectBot,
        handleInputChange,
        handleSave,
        sendMessage,
        clearChat
    } = usePlayground();

    const [chatInput, setChatInput] = useState('');
    const [copied, setCopied] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!chatInput.trim() || chatLoading) return;
        sendMessage(chatInput);
        setChatInput('');
    };

    const copyCode = () => {
        const code = `<script src="${import.meta.env.VITE_BACKEND_URL}/widget/widget.js" data-id="${selectedBot?._id}" defer></script>`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-lg font-bold">AI Playground</h1>
                            <p className="text-xs text-foreground/40">Test and refine your agent's behavior</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {loading ? (
                            <Skeleton width={180} height={36} />
                        ) : (
                            <div className="relative">
                                <select 
                                    className="appearance-none bg-surface border border-border rounded px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer min-w-[200px]"
                                    value={selectedBot?._id || ''}
                                    onChange={(e) => selectBot(chatbots.find(b => b._id === e.target.value))}
                                >
                                    {chatbots.map(bot => (
                                        <option key={bot._id} value={bot._id}>{bot.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                                    <ChevronRight size={14} className="rotate-90" />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSave}
                            disabled={saving || !selectedBot}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Configuration Sidebar (70%) */}
                    <div className="w-[70%] border-r border-border overflow-y-auto p-8 custom-scrollbar bg-background/50">
                        <div className="max-w-4xl space-y-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 ml-1">Agent Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Support Assistant"
                                            className="w-full bg-surface/50 border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 ml-1">Description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Handles customer inquiries about products"
                                            className="w-full bg-surface/50 border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">System Prompt</label>
                                        <div className="flex items-center gap-1.5 text-[10px] text-primary/70 font-medium">
                                            <Sparkles size={10} />
                                            <span>Best practice: Be specific about persona</span>
                                        </div>
                                    </div>
                                    <textarea
                                        name="prompt"
                                        value={formData.prompt}
                                        onChange={handleInputChange}
                                        rows={12}
                                        placeholder="You are a helpful customer support agent for ResolveAI..."
                                        className="w-full bg-surface/30 backdrop-blur-sm border border-border rounded p-4 text-sm font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none custom-scrollbar"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 ml-1">
                                    <Code size={14} className="text-primary" />
                                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Deployment Script</h3>
                                </div>
                                <div className="bg-[#0a0a0a] border border-border rounded overflow-hidden group relative">
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={copyCode}
                                            className="p-2 bg-primary/20 text-primary border border-primary/20 rounded hover:bg-primary/30 transition-all cursor-pointer"
                                            title="Copy Code"
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <pre className="p-6 font-mono text-[13px] overflow-x-auto whitespace-pre leading-relaxed scrollbar-hide">
                                        <span className="text-[#ebebeb]">&lt;</span><span className="text-[#ff6b6b]">script</span><br />
                                        <span className="text-[#00b5e2]">  src</span><span className="text-[#ebebeb]">=</span><span className="text-[#af97ec]">"{import.meta.env.VITE_BACKEND_URL}/widget/widget.js"</span><br />
                                        <span className="text-[#00b5e2]">  data-id</span><span className="text-[#ebebeb]">=</span><span className="text-[#af97ec]">"{selectedBot?._id || 'YOUR_AGENT_ID'}"</span><br />
                                        <span className="text-[#00b5e2]">  defer</span><br />
                                        <span className="text-[#ebebeb]">&gt;&lt;/</span><span className="text-[#ff6b6b]">script</span><span className="text-[#ebebeb]">&gt;</span>
                                    </pre>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-surface/30 border border-border rounded text-[11px] text-foreground/40 italic">
                                    <Info size={12} className="text-primary" />
                                    <span>Paste this script into your website to enable the chat widget.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Chat (30%) */}
                    <div className="w-[30%] flex flex-col bg-surface/10 backdrop-blur-md border-l border-border relative">
                        <div className="p-4 border-b border-border bg-background/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-semibold">Live Preview</span>
                            </div>
                            <button
                                onClick={clearChat}
                                className="p-1.5 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
                                title="Reset Chat"
                            >
                                <RefreshCw size={14} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Start a conversation</p>
                                        <p className="text-[11px] text-foreground/40 mt-1">Test how your agent responds to specific prompts and instructions.</p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded px-3 py-2 text-sm ${
                                            msg.role === 'user' 
                                            ? 'bg-primary text-white' 
                                            : 'bg-surface border border-border text-foreground'
                                        }`}>
                                            {msg.role === 'ai' && (
                                                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-primary/70">
                                                    <Bot size={10} />
                                                    Agent
                                                </div>
                                            )}
                                            <div className="markdown-content text-sm leading-relaxed wrap-break-word">
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                        code: ({ node, ...props }) => <code className="bg-black/20 px-1 rounded text-xs" {...props} />,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {chatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-surface border border-border rounded px-4 py-3 flex gap-1">
                                        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" />
                                        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 bg-background/50 border-t border-border">
                            <form onSubmit={handleSend} className="relative">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type a message to test..."
                                    className="w-full bg-surface border border-border rounded pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!chatInput.trim() || chatLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                            <p className="text-[10px] text-center text-foreground/30 mt-3 flex items-center justify-center gap-1">
                                <Terminal size={10} />
                                Test context: Default Knowledge Base
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Playground;
