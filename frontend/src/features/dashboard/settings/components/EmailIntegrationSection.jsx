import React from 'react';
import { Server, Send, Lock } from 'lucide-react';

const EmailIntegrationSection = ({ formData, handleChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-border">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Email Integration</label>
                    <p className="text-xs text-foreground/40 leading-relaxed">Configure your IMAP and SMTP settings to enable the AI to read and reply to support emails.</p>
                </div>
            </div>

            <div className="md:col-span-2 space-y-8">
                <div className="p-6 bg-surface/30 border border-border rounded space-y-8">
                    {/* IMAP Settings */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center text-foreground/40">
                                <Server className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-wider">Incoming Mail (IMAP)</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Host Address</label>
                                <input 
                                    name="emailSettings.IMapHost"
                                    value={formData.emailSettings.IMapHost}
                                    onChange={handleChange}
                                    placeholder="imap.gmail.com"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Port</label>
                                <input 
                                    name="emailSettings.ImapPort"
                                    value={formData.emailSettings.ImapPort}
                                    onChange={handleChange}
                                    placeholder="993"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SMTP Settings */}
                    <div className="space-y-6 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center text-foreground/40">
                                <Send className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-wider">Outgoing Mail (SMTP)</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Host Address</label>
                                <input 
                                    name="emailSettings.SmtpHost"
                                    value={formData.emailSettings.SmtpHost}
                                    onChange={handleChange}
                                    placeholder="smtp.gmail.com"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Port</label>
                                <input 
                                    name="emailSettings.SmtpPort"
                                    value={formData.emailSettings.SmtpPort}
                                    onChange={handleChange}
                                    placeholder="465"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Auth Credentials */}
                    <div className="space-y-6 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface border border-border flex items-center justify-center text-foreground/40">
                                <Lock className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-wider">Authentication</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Username / Email</label>
                                <input 
                                    name="emailSettings.User"
                                    value={formData.emailSettings.User}
                                    onChange={handleChange}
                                    placeholder="support@company.com"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">App Password</label>
                                <input 
                                    name="emailSettings.Pass"
                                    type="password"
                                    value={formData.emailSettings.Pass}
                                    onChange={handleChange}
                                    placeholder="••••••••••••••••"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Display Support Email (Sent to Customers | Use only if you want to show email alias to customers)</label>
                                <input 
                                    name="emailSettings.SupportEmail"
                                    value={formData.emailSettings.SupportEmail}
                                    onChange={handleChange}
                                    placeholder="support@company.com"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailIntegrationSection;
