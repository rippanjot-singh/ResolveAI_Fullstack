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
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-foreground/2 border-b border-border">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {tickets.map(ticket => (
                                <tr key={ticket._id} className="group hover:bg-primary/2 transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/tickets/${ticket._id}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm group-hover:text-primary transition-colors line-clamp-1 font-medium">{ticket.inquiree || 'No subject'}</span>
                                            <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                <Ticket size={10} />
                                                {ticket.type || 'manual'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <PriorityBadge priority={ticket.priority} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-foreground/80">{ticket.name}</span>
                                            <span className="text-[10px] text-foreground/30">{ticket.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[11px] text-foreground/30 font-medium whitespace-nowrap">
                                            {ticket.createdAt
                                                ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                : 'N/A'
                                            }
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
