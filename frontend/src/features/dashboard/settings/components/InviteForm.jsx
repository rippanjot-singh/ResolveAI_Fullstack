import React from 'react';
import { Shield, User, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

const InviteForm = ({ 
    role, 
    setRole, 
    speciality, 
    setSpeciality, 
    loading, 
    error, 
    onSubmit 
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-8">
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
    );
};

export default InviteForm;
