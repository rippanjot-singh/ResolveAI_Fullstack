import React from 'react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { User, Mail } from 'lucide-react';

const EmailTable = ({ loading, emails, filteredEmails, onSelectEmail, statusConfig }) => {
    if (loading && emails.length === 0) {
        return (
            <SkeletonWrapper>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} height={60} />)}
                </div>
            </SkeletonWrapper>
        );
    }

    if (filteredEmails.length === 0) {
        return (
            <div className="py-20 text-center border border-dashed border-border rounded bg-surface/5">
                <div className="w-16 h-16 rounded bg-surface border border-border flex items-center justify-center mx-auto mb-4 opacity-50">
                    <Mail size={32} className="text-foreground/20" />
                </div>
                <h3 className="text-sm font-bold text-foreground/60">No emails found</h3>
                <p className="text-xs text-foreground/30 mt-1">Check your filters or ensure your IMAP connection is active.</p>
            </div>
        );
    }

    return (
        <div className="bg-surface/10 border border-border rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-foreground/2 border-b border-border">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inbound Message</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Automation Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Processed At</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {filteredEmails.map((email) => {
                        const cfg = statusConfig[email.status] || { label: 'Skipped', icon: Mail, class: 'bg-foreground/10 text-foreground/40 border-foreground/10' };
                        const StatusIcon = cfg.icon;
                        
                        return (
                            <tr 
                                key={email._id} 
                                onClick={() => onSelectEmail(email)}
                                className="group hover:bg-foreground/2 transition-colors cursor-pointer"
                            >
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1 min-w-0 max-w-xl">
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors truncate">{email.subject || '(No Subject)'}</span>
                                        <span className="text-[11px] text-foreground/40 flex items-center gap-2">
                                            <User size={10} />
                                            {email.from}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border ${cfg.class} text-[10px] font-black uppercase tracking-widest`}>
                                        <StatusIcon size={12} />
                                        {cfg.label}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs font-medium">{new Date(email.createdAt).toLocaleDateString()}</span>
                                        <span className="text-[10px] text-foreground/30">{new Date(email.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmailTable;
