import React, { useState } from 'react';
import { 
    UserPlus, Link as LinkIcon, Copy, Check, Shield, 
    User, AlertCircle, Info, Sparkles, ChevronRight
} from 'lucide-react';
import { createInviteToken } from '../services/settings.api';

const InviteMember = () => {
    const [role, setRole] = useState('member');
    const [speciality, setSpeciality] = useState('');
    const [loading, setLoading] = useState(false);
    const [inviteUrl, setInviteUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setInviteUrl('');
        
        try {
            const data = await createInviteToken({ role, speciality });
            setInviteUrl(data.inviteTokenUrl);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate invite link');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="space-y-2 border-b border-border pb-6">
                <h2 className="text-2xl font-bold tracking-tight">Invite Team Member</h2>
                <p className="text-sm text-foreground/40">Generate a secure invitation link to add new administrators or support members to your workspace.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                <div className="space-y-8">
                    <form onSubmit={handleGenerate} className="space-y-8">
                        {/* Role Selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Shield size={12} />
                                Access Level
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('member')}
                                    className={`
                                        flex items-start gap-4 p-4 rounded border text-left transition-all group
                                        ${role === 'member' ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]' : 'bg-surface/50 border-border hover:border-foreground/20'}
                                    `}
                                >
                                    <div className={`p-2 rounded ${role === 'member' ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground/40'}`}>
                                        <User size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-xs font-bold ${role === 'member' ? 'text-primary' : 'text-foreground'}`}>Support Member</p>
                                        <p className="text-[10px] text-foreground/40 mt-1 leading-relaxed">Can resolve tickets, manage chats, and view analytics.</p>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`
                                        flex items-start gap-4 p-4 rounded border text-left transition-all group
                                        ${role === 'admin' ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]' : 'bg-surface/50 border-border hover:border-foreground/20'}
                                    `}
                                >
                                    <div className={`p-2 rounded ${role === 'admin' ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground/40'}`}>
                                        <Shield size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-xs font-bold ${role === 'admin' ? 'text-primary' : 'text-foreground'}`}>Platform Admin</p>
                                        <p className="text-[10px] text-foreground/40 mt-1 leading-relaxed">Full access to settings, billing, and team management.</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Speciality Input (Only for Member) */}
                        {role === 'member' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Sparkles size={12} />
                                    Support Speciality
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Technical Support, Billing Expert, Sales..."
                                        value={speciality}
                                        onChange={(e) => setSpeciality(e.target.value)}
                                        required={role === 'member'}
                                        className="w-full bg-surface border border-border rounded px-4 py-3 text-xs focus:outline-none focus:border-primary/50 transition-all pl-10"
                                    />
                                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                </div>
                                <p className="text-[10px] text-foreground/30 italic">This will be shown on the member's profile and helps AI route tickets.</p>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded flex items-center gap-3 text-red-500 animate-in shake duration-500">
                                <AlertCircle size={16} />
                                <span className="text-[11px] font-medium">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || (role === 'member' && !speciality)}
                            className="w-full sm:w-auto px-8 py-3 bg-foreground text-background rounded text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-foreground flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                <>
                                    Generate Invitation Link
                                    <ChevronRight size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Result Section */}
                    {inviteUrl && (
                        <div className="space-y-4 animate-in zoom-in-95 duration-500">
                            <div className="p-1 rounded bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center justify-between p-4 bg-background rounded border border-border/50 group">
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <div className="p-2 rounded bg-surface text-green-500 shrink-0">
                                            <LinkIcon size={16} />
                                        </div>
                                        <div className="truncate flex-1">
                                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">Secure Invitation Link</p>
                                            <p className="text-xs font-medium truncate text-foreground/70">{inviteUrl}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`
                                            ml-4 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-2
                                            ${copied ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-surface hover:bg-primary hover:text-white'}
                                        `}
                                    >
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-surface/30 border border-dashed border-border rounded">
                                <Info size={16} className="text-foreground/20 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Important Note</p>
                                    <p className="text-[10px] text-foreground/30 leading-relaxed">
                                        This link is valid for 48 hours and can only be used once. Send it directly to the person you wish to invite.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InviteMember;
