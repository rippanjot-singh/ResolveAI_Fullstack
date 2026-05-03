import React from 'react';
import { Zap, Cpu, Bot, Globe } from 'lucide-react';

const SystemIntelligence = ({ activeChatbots = [] }) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-medium flex items-center gap-2">
                    <Zap size={18} className="text-primary" />
                    System Intelligence
                </h2>
            </div>

            <div className="space-y-6">
                {/* AI Performance Quick Look */}
                <div className="bg-primary/5 border border-primary/20 rounded p-5 relative overflow-hidden group">
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <Zap size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">AI Performance</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold tracking-tight">84%</div>
                            <div className="text-xs text-foreground/50 mb-1">Resolution Rate</div>
                        </div>
                        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[84%] rounded-full shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"></div>
                        </div>
                        <p className="text-[10px] text-foreground/50">AI is handling 84% of inquiries without human intervention.</p>
                    </div>
                </div>

                {/* Active Agents List */}
                <div className="bg-surface/10 backdrop-blur-md border border-border rounded overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-foreground/2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 flex items-center gap-2">
                            <Cpu size={12} />
                            Active Agents
                        </span>
                        <span className="text-[10px] font-medium text-primary">{activeChatbots.length} Live</span>
                    </div>
                    <div className="divide-y divide-border/50">
                        {activeChatbots.length > 0 ? activeChatbots.map(bot => (
                            <div key={bot._id} className="px-4 py-3 flex items-center justify-between group hover:bg-surface/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center text-primary group-hover:border-primary/30 transition-colors">
                                        <Bot size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium">{bot.name}</span>
                                        <span className="text-[10px] text-foreground/40 flex items-center gap-1">
                                            <Globe size={10} />
                                            {bot.verifiedDomains?.[0] || 'Embedded'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-medium text-foreground/40 uppercase tracking-tighter">Live</span>
                                </div>
                            </div>
                        )) : (
                            <div className="px-4 py-6 text-center text-[11px] text-foreground/40">No active agents</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemIntelligence;
