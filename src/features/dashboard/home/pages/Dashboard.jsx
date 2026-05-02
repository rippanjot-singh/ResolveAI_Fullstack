import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { Ticket, AlertCircle, Bot, Users, Activity, ExternalLink, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const PriorityBadge = ({ priority }) => {
    const colors = {
        high: 'bg-red-500/10 text-red-500 border-red-500/20',
        medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        low: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    const style = colors[priority?.toLowerCase()] || 'bg-surface text-foreground/40 border-border';
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${style}`}>
            {priority || 'None'}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        open: 'text-primary bg-primary/5',
        closed: 'text-green-500 bg-green-500/5',
        pending: 'text-amber-500 bg-amber-500/5'
    };
    const style = styles[status?.toLowerCase()] || styles.open;
    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${style}`}>
            {status === 'closed' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
            <span className="capitalize">{status || 'open'}</span>
        </div>
    );
};

const Dashboard = () => {
    const { data, isLoading, error } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <SideNav />
                <main className="flex-1 overflow-y-auto">
                    <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-8">
                        <Skeleton width={120} height={20} />
                    </header>
                    <div className="p-8 mx-auto space-y-8">
                        <SkeletonWrapper>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="border border-border rounded p-5 bg-surface/30 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <Skeleton width={100} height={14} />
                                            <Skeleton width={18} height={18} />
                                        </div>
                                        <Skeleton width={60} height={32} />
                                        <Skeleton width={120} height={10} />
                                    </div>
                                ))}
                            </div>
                            <div className="border border-border rounded overflow-hidden bg-surface/30">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-border">
                                        <Skeleton width={80} height={14} />
                                        <Skeleton width={200} height={14} />
                                        <Skeleton width={70} height={20} />
                                        <Skeleton width={30} height={14} className="ml-auto" />
                                    </div>
                                ))}
                            </div>
                        </SkeletonWrapper>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full bg-background text-foreground">
                <SideNav />
                <main className="flex-1 flex items-center justify-center flex-col gap-4">
                    <p className="text-red-500">Error: {error}</p>
                </main>
            </div>
        );
    }

    if (!data) return null;

    const { kpis, recentTickets } = data;

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 overflow-y-auto">
                {/* Top Nav Header */}
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8">
                    <h1 className="text-lg font-medium">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/dashboard/studio/editor"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white border border-border rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            <Bot size={16} />
                            <span>Create Chatbot</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/forms"
                            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-sm font-medium hover:bg-surface/70 transition-colors"
                        >
                            <FileText size={16} />
                            <span>Manage Forms</span>
                        </NavLink>
                    </div>
                </header>

                <div className="p-8 mx-auto space-y-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KpiCard
                            title="Open Tickets"
                            value={kpis.openTickets}
                            icon={Ticket}
                            description="Requires attention"
                        />
                        <KpiCard
                            title="High Priority"
                            value={kpis.highPriority}
                            icon={AlertCircle}
                            className="text-red-500"
                            description="Critical issues"
                        />
                        <KpiCard
                            title="Active Bots"
                            value={kpis.activeChatbots}
                            icon={Bot}
                            description="Live across domains"
                        />
                        <KpiCard
                            title="Total Leads"
                            value={kpis.totalLeads}
                            icon={Users}
                            description="Collected via forms/bots"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-8">

                        {/* Triage Table */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-medium flex items-center gap-2">
                                    <Activity size={18} className="text-foreground/70" />
                                    Needs Attention
                                </h2>
                                <NavLink to="/dashboard/tickets" className="text-sm text-primary hover:underline">
                                    View all
                                </NavLink>
                            </div>

                            <div className="bg-surface/30 border border-border rounded overflow-hidden">
                                {recentTickets && recentTickets.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-surface/50 border-b border-border">
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Status</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {recentTickets.map(ticket => (
                                                <tr key={ticket._id} className="group hover:bg-primary/[0.02] transition-colors cursor-pointer">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-sm group-hover:text-primary transition-colors line-clamp-1">{ticket.inquiree || 'No subject'}</span>
                                                            <span className="text-[11px] text-foreground/40 flex items-center gap-1">
                                                                <Ticket size={10} />
                                                                {ticket.type || 'manual'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <PriorityBadge priority={ticket.priority} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-medium">{ticket.name}</span>
                                                            <span className="text-[10px] text-foreground/30">{ticket.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={ticket.status} />
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-[11px] text-foreground/30 font-medium whitespace-nowrap">
                                                            {ticket.createdAt
                                                                ? new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                                : 'N/A'
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-foreground/50 text-sm italic">
                                        No open tickets right now.
                                    </div>
                                )}
                            </div>
                        </div>



                    </div>
                </div>
            </main>
        </div>
    );
};

const KpiCard = ({ title, value, icon: Icon, className = "", description }) => (
    <div className="border border-border rounded p-5 bg-surface/30 flex flex-col gap-3">
        <div className="flex items-center justify-between text-foreground/70">
            <span className="text-sm font-medium">{title}</span>
            <Icon size={18} className={className} />
        </div>
        <div>
            <div className={`text-3xl font-semibold tracking-tight ${className}`}>{value}</div>
            <div className="text-xs text-foreground/50 mt-1">{description}</div>
        </div>
    </div>
);

export default Dashboard;