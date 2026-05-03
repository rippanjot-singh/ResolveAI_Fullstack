import React from 'react';
import { Save, Loader2 } from 'lucide-react';

const AccountHeader = ({ onSave, loading }) => {
    return (
        <div className="flex items-end justify-between border-b border-border pb-8">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
                <p className="text-sm text-foreground/40">Manage your profile, availability, and external integrations.</p>
            </div>
            <button 
                onClick={onSave}
                disabled={loading}
                className="h-10 px-6 rounded bg-primary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                Save Changes
            </button>
        </div>
    );
};

export default AccountHeader;
