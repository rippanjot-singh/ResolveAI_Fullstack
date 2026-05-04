import React from 'react';
import { User, Mail, Calendar, Trash2 } from 'lucide-react';
import { Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const LeadsTable = ({ isLoading, leads, paginatedLeads, onLeadClick, onDeleteClick }) => {
    return (
        <div className="bg-surface/10 backdrop-blur-md border border-border rounded relative z-10 overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead>
                        <tr className="border-b border-border bg-surface/5">
                            <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40">Lead Info</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 hidden md:table-cell">Capture Source / Note</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 hidden sm:table-cell">Captured At</th>
                            <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-wider text-foreground/40 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {isLoading && leads.length === 0 ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-5"><Skeleton width={150} height={16} /></td>
                                    <td className="px-6 py-5 hidden md:table-cell"><Skeleton width={250} height={16} /></td>
                                    <td className="px-6 py-5 hidden sm:table-cell"><Skeleton width={100} height={16} /></td>
                                    <td className="px-6 py-5 text-right"><Skeleton width={30} height={16} className="ml-auto" /></td>
                                </tr>
                            ))
                        ) : paginatedLeads.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-foreground/40 text-sm italic">
                                    No leads found.
                                </td>
                            </tr>
                        ) : (
                            paginatedLeads.map((lead) => (
                                <tr 
                                    key={lead._id} 
                                    onClick={() => onLeadClick(lead)}
                                    className="hover:bg-surface/5 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{lead.name || 'Anonymous'}</span>
                                                <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                    <Mail size={10} />
                                                    {lead.email || 'No email provided'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 hidden md:table-cell">
                                        <p className="text-xs text-foreground/60 line-clamp-2 max-w-xs leading-relaxed italic">
                                            {lead.note || 'No additional info'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5 hidden sm:table-cell">
                                        <div className="flex items-center gap-2 text-[11px] text-foreground/40">
                                            <Calendar size={12} />
                                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteClick(lead);
                                            }}
                                            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors text-foreground/20 cursor-pointer"
                                            title="Delete Lead"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsTable;
