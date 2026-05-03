import React from 'react';
import { useAuth } from '../../../auth/hooks/useAuth';
import { User, Mail, Shield, Clock } from 'lucide-react';

const AccountSettings = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-10 pb-20">
            <div className="space-y-2 border-b border-border pb-6">
                <h2 className="text-2xl font-bold tracking-tight">Account Profile</h2>
                <p className="text-sm text-foreground/40">Manage your personal information and security preferences.</p>
            </div>

            <div className="max-w-xl space-y-8">
                <div className="flex items-center gap-6 p-6 bg-surface/30 border border-border rounded">
                    <div className="w-16 h-16 rounded bg-primary flex items-center justify-center text-white text-xl font-bold">
                        {user?.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">{user?.name}</h3>
                        <p className="text-xs text-foreground/40">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                {user?.role}
                            </span>
                            {user?.speciality && (
                                <span className="px-2 py-0.5 rounded bg-surface text-foreground/40 text-[10px] font-black uppercase tracking-widest border border-border">
                                    {user.speciality}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Organization Info</label>
                        <div className="p-4 bg-surface/10 border border-border rounded space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-border/50">
                                <span className="text-xs text-foreground/40">Company Name</span>
                                <span className="text-xs font-medium">{user?.companyId?.name}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-foreground/40">Join Date</span>
                                <span className="text-xs font-medium">{new Date(user?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
