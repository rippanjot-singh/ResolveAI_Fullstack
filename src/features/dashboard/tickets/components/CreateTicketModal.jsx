import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CreateTicketModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiree: '',
        priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onCreate(formData);
            onClose();
            setFormData({ name: '', email: '', inquiree: '', priority: 'medium' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
            <div className="w-full max-w-lg bg-background border border-border rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Plus size={16} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Create New Ticket</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Customer Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Priority</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">Inquiry Details</label>
                        <textarea
                            required
                            value={formData.inquiree}
                            onChange={(e) => setFormData({ ...formData, inquiree: e.target.value })}
                            className="w-full h-32 bg-surface/50 border border-border rounded p-4 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none custom-scrollbar"
                            placeholder="What is the customer asking about?"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-surface border border-border rounded text-[10px] font-bold uppercase tracking-wider hover:bg-surface/70 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
