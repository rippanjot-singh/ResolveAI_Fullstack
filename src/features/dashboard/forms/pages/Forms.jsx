import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { Plus, FileText, ChevronRight, Search, Power, Code, Trash2, Edit, X, Copy } from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { DeleteConfirmModal } from '../../../../shared/components/ui/DeleteConfirmModal';
import { useForms } from '../hooks/useForms';
import toast from 'react-hot-toast';

const FormsList = () => {
    const { forms, isLoading, error, fetchForms, handleToggleStatus, handleDelete } = useForms();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFormForCode, setSelectedFormForCode] = useState(null);
    const [formToDelete, setFormToDelete] = useState(null);

    useEffect(() => {
        fetchForms();
    }, [fetchForms]);

    const filteredForms = React.useMemo(() => {
        if (!forms) return [];
        return forms.filter(f => 
            f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [forms, searchTerm]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('HTML copied to clipboard');
    };

    const generateHtml = (form) => {
        if (!form) return '';
        
        const getFieldHTML = (field) => {
            let inputHtml = '';
            const nameAttr = field.name;
            const reqAttr = field.required ? ' required' : '';

            switch (field.type) {
                case 'textarea':
                    inputHtml = `<textarea name="${nameAttr}"${reqAttr}></textarea>`;
                    break;
                case 'select':
                    inputHtml = `<select name="${nameAttr}"${reqAttr}>\n` + 
                        (field.options || []).map(opt => `                <option value="${opt}">${opt}</option>`).join('\n') +
                        `\n            </select>`;
                    break;
                case 'checkbox':
                    if (field.options && field.options.length > 0) {
                        inputHtml = `<div class="checkbox-group">\n` + 
                            field.options.map(opt => `                <label><input type="checkbox" name="${nameAttr}[]" value="${opt}"> ${opt}</label>`).join('\n') +
                            `\n            </div>`;
                    } else {
                        inputHtml = `<input type="checkbox" name="${nameAttr}"${reqAttr}>`;
                    }
                    break;
                default:
                    inputHtml = `<input type="${field.type}" name="${nameAttr}"${reqAttr}>`;
            }
            
            return `\n        <div>\n            <label>${field.label}</label>\n            ${inputHtml}\n        </div>\n`;
        };

        let htmlFields = '';
        (form.fields || []).forEach(field => {
            htmlFields += getFieldHTML(field);
        });

        return `<form action="${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'}/api/form/submit/${form._id}" method="POST">${htmlFields}
        <button type="submit">Submit Data to Server</button>
</form>`;
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 overflow-y-auto relative">
                <header className="sticky top-0 z-10 min-h-[clamp(3.5rem,8vh,4rem)] border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-2">
                    <div>
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold">Forms List</h1>
                        <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40">Manage your dynamic forms and view submissions from embedded widgets</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/dashboard/forms/create"
                            className="flex items-center gap-2 px-[clamp(0.5rem,2vw,1rem)] py-2 bg-primary text-white rounded text-[clamp(0.75rem,2vw,0.875rem)] font-medium hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            <span className="hidden sm:inline">Create Form</span>
                        </NavLink>
                    </div>
                </header>

                <div className="p-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto space-y-[clamp(1rem,4vw,2rem)]">


                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                            <input
                                type="text"
                                placeholder="Search forms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-surface/50 border border-border rounded text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <SkeletonWrapper>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map(i => (
                                    <div key={i} className="border border-border rounded p-5 bg-background space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton width={40} height={40} />
                                            <div>
                                                <Skeleton width={120} height={14} />
                                                <Skeleton width={60} height={10} className="mt-1" />
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-border/30">
                                            <Skeleton width={80} height={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SkeletonWrapper>
                    ) : error ? (
                        <div className="p-8 text-center border border-dashed border-border rounded bg-surface/10">
                            <p className="text-sm text-red-500">{error}</p>
                        </div>
                    ) : filteredForms.length === 0 ? (
                        <div className="p-16 text-center border border-dashed border-border rounded bg-surface/5 space-y-4">
                            <div className="w-12 h-12 bg-surface rounded flex items-center justify-center mx-auto">
                                <FileText size={24} className="text-foreground/40" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-medium">
                                    {searchTerm ? 'No forms match your search' : 'No forms found'}
                                </p>
                                <p className="text-sm text-foreground/50 max-w-xs mx-auto">
                                    {searchTerm 
                                        ? `We couldn't find any forms matching "${searchTerm}".`
                                        : "You haven't created any forms yet. Start by creating your first one to capture leads."}
                                </p>
                            </div>
                            {!searchTerm && (
                                <NavLink
                                    to="/dashboard/forms/create"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-sm font-medium hover:bg-surface/70 transition-colors"
                                >
                                    <Plus size={16} />
                                    <span>Create your first form</span>
                                </NavLink>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(280px,30vw,400px),1fr))] gap-[clamp(1rem,3vw,1.5rem)]">
                            {filteredForms.map(form => (
                                <FormCard
                                    key={form._id}
                                    form={form}
                                    onToggle={() => handleToggleStatus(form._id)}
                                    onDelete={() => setFormToDelete(form)}
                                    onShowCode={() => setSelectedFormForCode(form)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Code Modal */}
                {selectedFormForCode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                        <div className="w-full max-w-2xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                                <div className="flex items-center gap-2">
                                    <Code size={18} className="text-primary" />
                                    <h3 className="font-semibold text-foreground">Form HTML Output</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedFormForCode(null)}
                                    className="cursor-pointer p-1 hover:bg-background rounded-full transition-colors text-foreground/40 hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                        Copy and paste this HTML code directly into your website. It uses standard inputs and posts data directly to your form's endpoint.
                                    </p>
                                </div>

                                <div className="relative group">
                                    <div className="absolute top-3 right-3 transition-opacity">
                                        <button
                                            onClick={() => copyToClipboard(generateHtml(selectedFormForCode))}
                                            className="p-2 bg-primary text-white rounded hover:bg-primary/90 shadow-lg transition-all cursor-pointer"
                                            title="Copy Code"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <pre className="p-6 bg-[#0a0a0a] border border-border rounded font-mono text-[13px] whitespace-pre-wrap wrap-break-word leading-relaxed shadow-inner text-[#ebebeb]">
                                        {generateHtml(selectedFormForCode)}
                                    </pre>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                                <button
                                    onClick={() => setSelectedFormForCode(null)}
                                    className="px-4 py-2 bg-background border border-border rounded text-sm font-medium hover:bg-surface transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <DeleteConfirmModal 
                    isOpen={!!formToDelete}
                    onClose={() => setFormToDelete(null)}
                    onConfirm={async () => {
                        await handleDelete(formToDelete._id);
                        setFormToDelete(null);
                    }}
                    title="Delete Form"
                    itemName={formToDelete?.name}
                    message="This action will permanently remove the form configuration and all associated lead submissions. This cannot be undone."
                />
            </main>
        </div>
    );
};

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

export default FormsList;
