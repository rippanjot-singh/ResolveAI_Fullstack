import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, Cpu, Bot, Globe, Copy, Check, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SystemIntelligence = ({ activeChatbots = [], kpis = {} }) => {
    const [copiedId, setCopiedId] = useState(null);

    const totalTickets = (kpis.openTickets ?? 0) + (kpis.closedTickets ?? 0);
    const resolutionRate = totalTickets > 0
        ? Math.round((kpis.closedTickets / totalTickets) * 100)
        : null;

    const copyCode = (bot) => {
        const snippet = `<script src="${import.meta.env.VITE_BACKEND_URL}/widget/widget.js" data-id="${bot._id}" defer></script>`;
        navigator.clipboard.writeText(snippet);
        setCopiedId(bot._id);
        toast.success('Script copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
    };

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
                {/* AI Performance — only shown when there's real ticket data */}
                {resolutionRate !== null && (
                <div className="bg-primary/5 border border-primary/20 rounded p-5 relative overflow-hidden group">
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                            <Zap size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">AI Performance</span>
                        </div>
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold tracking-tight">{resolutionRate}%</div>
                            <div className="text-xs text-foreground/50 mb-1">Resolution Rate</div>
                        </div>
                        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"
                                style={{ width: `${resolutionRate}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-foreground/50">
                            {resolutionRate}% of tickets have been resolved ({kpis.closedTickets} of {totalTickets} total).
                        </p>
                    </div>
                </div>
                )}

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
                                {/* Bot info */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 shrink-0 rounded bg-background border border-border flex items-center justify-center text-primary group-hover:border-primary/30 transition-colors">
                                        <Bot size={16} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-medium truncate">{bot.name}</span>
                                        <span className="text-[10px] text-foreground/40 flex items-center gap-1">
                                            <Globe size={10} />
                                            <span className="truncate">{bot.verifiedDomains?.[0] || 'Embedded'}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="flex items-center gap-1 shrink-0 transition-opacity">
                                    {/* Copy code */}
                                    <button
                                        onClick={() => copyCode(bot)}
                                        title="Copy embed script"
                                        className="p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors text-foreground/50 hover:text-foreground cursor-pointer"
                                    >
                                        {copiedId === bot._id
                                            ? <Check size={13} className="text-primary" />
                                            : <Copy size={13} />
                                        }
                                    </button>

                                    {/* View analytics */}
                                    <NavLink
                                        to={`/dashboard/studio/analytics/${bot._id}`}
                                        title="View analytics"
                                        className="p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors text-foreground/50 hover:text-primary"
                                    >
                                        <BarChart2 size={13} />
                                    </NavLink>
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
