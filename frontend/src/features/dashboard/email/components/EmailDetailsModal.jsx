import React from 'react';
import { Mail, X, User, Bot, ExternalLink, AlertCircle } from 'lucide-react';

const EmailDetailsModal = ({ isOpen, onClose, email, statusConfig }) => {
    if (!isOpen || !email) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-2xl bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-primary/10 text-primary">
                            <Mail size={18} />
                        </div>
                        <h2 className="text-sm font-bold uppercase tracking-widest">Message Details</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Subject</label>
                            <h3 className="text-lg font-bold leading-tight">{email.subject || '(No Subject)'}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">From</label>
                                <div className="flex items-center gap-2 text-xs font-medium">
                                    <User size={14} className="text-primary" />
                                    {email.from}
                                </div>
                            </div>
                            <div className="space-y-2 text-right">
                                <label className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Processed At</label>
                                <div className="text-xs font-medium">
                                    {new Date(email.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Bot size={14} />
                                AI Automation Logic
                            </label>
                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border ${statusConfig[email.status]?.class}`}>
                                {statusConfig[email.status]?.label}
                            </div>
                        </div>

                        <div className="p-6 bg-surface/30 border border-border rounded space-y-4 relative overflow-hidden group">
                            <div className="text-xs text-foreground/70 leading-relaxed whitespace-pre-wrap font-mono">
                                {email.aiResponse || 'No details available for this automation step.'}
                            </div>
                        </div>

                        {email.status === 'ticket' && (
                            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded flex gap-3">
                                <AlertCircle size={18} className="text-amber-500 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Escalation Note</p>
                                    <p className="text-[11px] text-amber-500/70 leading-relaxed">
                                        This email required human intervention. An automated ticket has been created in your Support center.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailDetailsModal;
