import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Code, Power, Edit, Trash2, ChevronRight } from 'lucide-react';

const FormCard = ({ form, onToggle, onDelete, onShowCode }) => (
    <div className="group border border-border rounded bg-background hover:bg-surface/10 hover:border-primary/10 transition-all flex flex-col p-5 space-y-4 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-0.5 ${form.isActive ? 'bg-primary/50' : 'bg-foreground/10'}`} />

        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary">
                    <FileText size={20} />
                </div>
                <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{form.name}</h3>
                    <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded ${form.isActive ? 'bg-green-500' : 'bg-foreground/20'}`} />
                        <span className="text-[10px] uppercase font-medium tracking-wider text-foreground/40">
                            {form.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 transition-opacity">
                <button
                    onClick={onShowCode}
                    className="p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors text-foreground/60 cursor-pointer"
                    title="Code"
                >
                    <Code size={14} />
                </button>
                <button
                    onClick={onToggle}
                    className={`p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors cursor-pointer ${form.isActive ? 'text-primary' : 'text-foreground/40'}`}
                    title={form.isActive ? "Deactivate" : "Activate"}
                >
                    <Power size={14} />
                </button>
                <NavLink
                    to={`/dashboard/forms/edit/${form._id}`}
                    className="p-1.5 rounded hover:bg-surface border border-transparent hover:border-border transition-colors text-foreground/60 cursor-pointer"
                    title="Edit"
                >
                    <Edit size={14} />
                </NavLink>
                <button
                    onClick={onDelete}
                    className="p-1.5 rounded hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors text-red-500/60 hover:text-red-500 cursor-pointer"
                    title="Delete"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>

        {form.description && (
            <p className="text-xs text-foreground/60 line-clamp-2">{form.description}</p>
        )}

        <div className="pt-4 border-t border-border/30 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground/80">{form.fields?.length || 0}</span>
                <span className="text-[10px] text-foreground/40 uppercase font-medium tracking-wider leading-none">Fields</span>
            </div>
            
            <NavLink
                to={`/dashboard/forms/results/${form._id}`}
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
                View Submissions
                <ChevronRight size={12} />
            </NavLink>
        </div>
    </div>
);

export default FormCard;
