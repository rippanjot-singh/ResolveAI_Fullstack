import React from 'react';
import { User, X } from 'lucide-react';

const LeadDetailsModal = ({ isOpen, onClose, lead }) => {
    if (!isOpen || !lead) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-lg bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <User size={16} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Lead Details</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Name</p>
                                <p className="text-sm font-medium">{lead.name || 'Anonymous'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Email</p>
                                <p className="text-sm font-medium">{lead.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Captured On</p>
                            <p className="text-sm font-medium">{new Date(lead.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Capture Source / Note</p>
                            <div className="bg-surface border border-border rounded p-4 text-xs text-foreground/70 leading-relaxed italic">
                                {lead.note || 'No additional capture notes provided.'}
                            </div>
                        </div>
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

export default LeadDetailsModal;
