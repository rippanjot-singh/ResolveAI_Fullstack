import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, ChevronRight, Ticket } from 'lucide-react';
import PriorityBadge from './PriorityBadge';

const NeedsAttention = ({ tickets = [] }) => {
    return (
        <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-medium flex items-center gap-2">
                    <Activity size={18} className="text-foreground/70" />
                    Needs Attention
                </h2>
                <NavLink to="/dashboard/tickets" className="text-sm text-primary hover:underline flex items-center gap-1">
                    <span>View all</span>
                    <ChevronRight size={14} />
                </NavLink>
            </div>

            <div className="bg-surface/10 backdrop-blur-md border border-border rounded overflow-hidden">
                {tickets && tickets.length > 0 ? (
                    <>
                        {/* Column headers — hidden on mobile */}
                        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto] gap-4 px-6 py-3 bg-foreground/2 border-b border-border">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</span>
                        </div>

                        <div className="divide-y divide-border/50">
                            {tickets.map(ticket => (
                                <div
                                    key={ticket._id}
                                    className="group hover:bg-primary/2 transition-colors cursor-pointer px-4 md:px-6 py-4"
                                    onClick={() => window.location.href = `/dashboard/tickets/${ticket._id}`}
                                >
                                    {/* Mobile layout: stacked */}
                                    <div className="flex items-start justify-between gap-3 md:hidden">
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm group-hover:text-primary transition-colors line-clamp-1 font-medium">
                                                {ticket.inquiree || 'No subject'}
                                            </span>
                                            <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                <Ticket size={10} />
                                                {ticket.type || 'manual'}
                                            </span>
                                            <span className="text-[11px] text-foreground/50 mt-0.5">{ticket.name}</span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                            <PriorityBadge priority={ticket.priority} />
                                            <span className="text-[10px] text-foreground/30 font-medium whitespace-nowrap">
                                                {ticket.createdAt
                                                    ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                    : 'N/A'
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* Desktop layout: 4-column grid */}
                                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto] gap-4 items-center">
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm group-hover:text-primary transition-colors line-clamp-1 font-medium">
                                                {ticket.inquiree || 'No subject'}
                                            </span>
                                            <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                <Ticket size={10} />
                                                {ticket.type || 'manual'}
                                            </span>
                                        </div>

                                        <PriorityBadge priority={ticket.priority} />

                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-medium text-foreground/80 truncate">{ticket.name}</span>
                                            <span className="text-[10px] text-foreground/30 truncate">{ticket.email}</span>
                                        </div>

                                        <span className="text-[11px] text-foreground/30 font-medium whitespace-nowrap text-right">
                                            {ticket.createdAt
                                                ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                : 'N/A'
                                            }
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center text-foreground/50 text-sm italic">
                        No open tickets right now.
                    </div>
                )}
            </div>
        </div>
    );
};

export default NeedsAttention;
