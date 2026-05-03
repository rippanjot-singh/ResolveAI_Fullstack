import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/hooks/useAuth';
import { User, Mail, Shield, Server, Lock, Send, RefreshCcw, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { updateUserProfile } from '../services/settings.api';
import toast from 'react-hot-toast';

const AccountSettings = () => {
    const { user, fetchMe } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        speciality: '',
        isSolviingTickets: true,
        emailSettings: {
            SmtpHost: '',
            SmtpPort: '',
            User: '',
            Pass: '',
            IMapHost: '',
            ImapPort: '',
            SupportEmail: ''
        }
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                speciality: user.speciality || '',
                isSolviingTickets: user.isSolviingTickets ?? true,
                emailSettings: {
                    SmtpHost: user.emailSettings?.SmtpHost || '',
                    SmtpPort: user.emailSettings?.SmtpPort || '',
                    User: user.emailSettings?.User || '',
                    Pass: user.emailSettings?.Pass || '',
                    IMapHost: user.emailSettings?.IMapHost || '',
                    ImapPort: user.emailSettings?.ImapPort || '',
                    SupportEmail: user.emailSettings?.SupportEmail || ''
                }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile(user._id, formData);
            await fetchMe();
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12 pb-20 max-w-4xl">
            <div className="flex items-end justify-between border-b border-border pb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
                    <p className="text-sm text-foreground/40">Manage your profile, availability, and external integrations.</p>
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="h-10 px-6 rounded bg-primary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Profile Identity</label>
                        <p className="text-xs text-foreground/40 leading-relaxed">This information will be visible to your team members and used by the AI to route tickets.</p>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <div className="p-6 bg-surface/30 border border-border rounded space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Personal Information</h4>
                                <p className="text-[10px] text-foreground/40">Set your display name and role speciality.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Display Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/50 ml-1">Team Speciality</label>
                                <input 
                                    name="speciality"
                                    value={formData.speciality}
                                    onChange={handleChange}
                                    placeholder="e.g. Technical Support, Sales"
                                    className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded group">
                            <div className="space-y-0.5">
                                <label className="text-xs font-bold group-hover:text-primary transition-colors">Active Ticket Solving</label>
                                <p className="text-[10px] text-foreground/30">Allow the AI to assign new tickets to you based on availability.</p>
                            </div>
                            <button 
                                onClick={() => setFormData(prev => ({ ...prev, isSolviingTickets: !prev.isSolviingTickets }))}
                                className={`w-10 h-5 rounded-full transition-all relative ${formData.isSolviingTickets ? 'bg-primary' : 'bg-foreground/10'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.isSolviingTickets ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default AccountSettings;
