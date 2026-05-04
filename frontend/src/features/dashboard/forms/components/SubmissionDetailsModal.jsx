import React from 'react';
import { FileText, X, Globe, User, Hash } from 'lucide-react';

const SubmissionDetailsModal = ({ isOpen, onClose, result }) => {
    if (!isOpen || !result) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-2xl bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <FileText size={16} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">{result.formId?.name || 'Form Submission'}</h3>
                            <p className="text-[10px] text-foreground/40 uppercase font-medium">{new Date(result.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                    {/* Submitted Data Section */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            Submitted Data
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(result.data).map(([key, value]) => (
                                <div key={key} className="bg-surface/30 border border-border rounded p-4 space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">{key}</p>
                                    <p className="text-sm font-medium break-all">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 flex items-center gap-2">
                            <div className="w-1 h-3 bg-foreground/20 rounded-full" />
                            Technical Metadata
                        </h4>
                        <div className="bg-surface/10 border border-border rounded p-4 divide-y divide-border/50">
                            <div className="py-2 flex justify-between text-xs items-center">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <Globe size={12} />
                                    IP Address
                                </div>
                                <span className="font-mono text-foreground/80">{result.metadata?.ip || 'N/A'}</span>
                            </div>
                            <div className="py-2 flex justify-between text-xs items-center">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <Hash size={12} />
                                    Referrer
                                </div>
                                <span className="truncate max-w-[250px] text-foreground/80">{result.metadata?.referrer || 'Direct'}</span>
                            </div>
                            <div className="py-3 flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-foreground/40 uppercase font-bold text-[9px] tracking-wider">
                                    <User size={12} />
                                    User Agent
                                </div>
                                <span className="text-[10px] text-foreground/60 leading-relaxed italic bg-surface p-2 rounded border border-border/50">{result.metadata?.userAgent || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Response Section (if exists) */}
                    {result.aiResponse?.reply && (
                        <div className="space-y-4">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-green-500 flex items-center gap-2">
                                <div className="w-1 h-3 bg-green-500 rounded-full" />
                                AI Auto-Response
                            </h4>
                            <div className="bg-green-500/5 border border-green-500/10 rounded p-4">
                                <p className="text-sm leading-relaxed text-foreground/80 italic">"{result.aiResponse.reply}"</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetailsModal;
