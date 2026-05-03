import React from 'react';
import { Trash2 } from 'lucide-react';

export const DeleteConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Delete Item", 
    itemName, 
    message = "This action cannot be undone." 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="w-full max-w-md bg-background border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-surface/50">
                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                        <Trash2 size={16} />
                    </div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <div className="p-6">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                        Are you sure you want to delete <span className="font-semibold text-foreground">"{itemName}"</span>? 
                        {" "}{message}
                    </p>
                </div>
                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-background border border-border rounded text-sm font-medium hover:bg-surface transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
