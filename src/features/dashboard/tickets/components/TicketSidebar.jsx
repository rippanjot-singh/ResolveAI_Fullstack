import React from 'react';
import { Trash2, Info } from 'lucide-react';

const TicketSidebar = ({ currentTicket, handlePriorityChange, setIsDeleteModalOpen }) => (
    <div className="space-y-6">
        <div className="bg-surface/30 border border-border rounded p-6 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40 border-b border-border pb-3">Ticket Options</h3>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40">Priority Level</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['low', 'medium', 'high'].map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePriorityChange(p)}
                                className={`py-2 text-[10px] font-bold uppercase tracking-tighter rounded border transition-all cursor-pointer ${
                                    currentTicket.priority === p 
                                        ? (p === 'high' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' :
                                           p === 'medium' ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' :
                                           'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20')
                                        : 'bg-surface border-border text-foreground/60 hover:border-primary/30'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 space-y-3">
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all cursor-pointer"
                    >
                        <Trash2 size={14} />
                        Delete Ticket
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-500">
                <Info size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Quick Tip</span>
            </div>
            <p className="text-[11px] text-blue-500/60 leading-relaxed">
                You are currently in Focus Mode. We've prioritized your high-impact inquiries so you can resolve them one by one without distraction.
            </p>
        </div>
    </div>
);

export default TicketSidebar;
