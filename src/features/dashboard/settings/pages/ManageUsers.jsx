import React from 'react';
import { useUserManagement } from '../hooks/useUserManagement';
import { useAuth } from '../../../auth/hooks/useAuth';
import { Shield, User, Trash2, ShieldCheck, MoreVertical, Search, Filter, Building2, Save } from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const ManageUsers = () => {
    const { users, loading, error, handleUpdateRole, handleDeleteUser, handleUpdateCompanyName } = useUserManagement();
    const { user: currentUser } = useAuth();
    const [companyName, setCompanyName] = React.useState(currentUser?.companyId?.name || '');
    const [isSaving, setIsSaving] = React.useState(false);

    React.useEffect(() => {
        if (currentUser?.companyId?.name) {
            setCompanyName(currentUser.companyId.name);
        }
    }, [currentUser]);

    const onUpdateCompanyName = async () => {
        if (!companyName.trim()) return;
        setIsSaving(true);
        await handleUpdateCompanyName(companyName);
        setIsSaving(false);
    };

    if (currentUser?.role !== 'admin') {
        return (
            <div className="p-12 text-center bg-surface/30 border border-border rounded animate-in fade-in zoom-in duration-500">
                <Shield className="w-12 h-12 text-red-500/20 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                <p className="text-foreground/50 max-w-sm mx-auto">You do not have administrative privileges to manage company details.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* COMPANY GENERAL SETTINGS */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Company Management</h2>
                    <p className="text-foreground/50 text-sm">Update your company identity and workspace settings.</p>
                </div>

                <div className="p-6 bg-surface/30 border border-border rounded space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Company Name</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1 max-w-md">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter company name"
                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                            </div>
                            <button
                                onClick={onUpdateCompanyName}
                                disabled={isSaving || companyName === currentUser?.companyId?.name}
                                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isSaving ? 'Saving...' : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM MANAGEMENT */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Team Members</h3>
                        <p className="text-foreground/50 text-sm">Manage roles and permissions for your company members.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                            <input
                                type="text"
                                placeholder="Search members..."
                                className="pl-9 pr-4 py-2 bg-surface border border-border rounded text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-surface/30 border border-border rounded overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-foreground/5">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Member</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Role</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton width={32} height={32} borderRadius="100%" />
                                                    <div className="space-y-1">
                                                        <Skeleton width={120} height={14} />
                                                        <Skeleton width={180} height={12} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Skeleton width={80} height={24} borderRadius={4} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end">
                                                    <Skeleton width={32} height={32} borderRadius={4} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="group hover:bg-foreground/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold truncate">{user.name} {user._id === currentUser?.userId && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-tighter">You</span>}</p>
                                                        <p className="text-xs text-foreground/40 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.role === 'admin' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-500 text-[11px] font-bold uppercase tracking-wide border border-amber-500/20">
                                                            <ShieldCheck size={12} />
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-500 text-[11px] font-bold uppercase tracking-wide border border-blue-500/20">
                                                            <User size={12} />
                                                            Member
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2transition-opacity">
                                                    {user._id !== currentUser?.userId && (
                                                        <>
                                                            {user.role === 'member' ? (
                                                                <button
                                                                    onClick={() => handleUpdateRole(user._id, 'admin')}
                                                                    className="p-2 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded transition-all"
                                                                    title="Promote to Admin"
                                                                >
                                                                    <Shield size={18} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleUpdateRole(user._id, 'member')}
                                                                    className="p-2 text-foreground/40 hover:text-amber-500 hover:bg-amber-500/10 rounded transition-all"
                                                                    title="Demote to Member"
                                                                >
                                                                    <User size={18} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteUser(user._id)}
                                                                className="p-2 text-foreground/40 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                                                                title="Remove User"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="p-6 bg-primary/5 border border-primary/10 rounded flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-primary mb-1">Administrative Privileges</h4>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                        Admins can manage bots, view analytics, and control company-wide settings.
                        Members can participate in resolving tickets but cannot modify system-level configurations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
