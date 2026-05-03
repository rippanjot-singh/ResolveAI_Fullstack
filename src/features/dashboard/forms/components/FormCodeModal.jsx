import React from 'react';
import { Code, X, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const FormCodeModal = ({ isOpen, onClose, form }) => {
    if (!isOpen || !form) return null;

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

    const htmlCode = generateHtml(form);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="w-full max-w-2xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-2">
                        <Code size={18} className="text-primary" />
                        <h3 className="font-semibold text-foreground">Form HTML Output</h3>
                    </div>
                    <button
                        onClick={onClose}
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
                                onClick={() => copyToClipboard(htmlCode)}
                                className="p-2 bg-primary text-white rounded hover:bg-primary/90 shadow-lg transition-all cursor-pointer"
                                title="Copy Code"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                        <pre className="p-6 bg-[#0a0a0a] border border-border rounded font-mono text-[13px] whitespace-pre-wrap wrap-break-word leading-relaxed shadow-inner text-[#ebebeb]">
                            {htmlCode}
                        </pre>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border bg-surface/30 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-background border border-border rounded text-sm font-medium hover:bg-surface transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormCodeModal;
