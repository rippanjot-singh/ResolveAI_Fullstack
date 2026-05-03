import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { 
    Ticket, AlertCircle, Bot, Users, Activity, ExternalLink, FileText, 
    Clock, CheckCircle2, Zap, ShieldCheck, Cpu, MessageSquare, Globe,
    ChevronRight, Sparkles
} from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const PriorityBadge = ({ priority }) => {
    const colors = {
        high: 'bg-red-500/10 text-red-500 border-red-500/20',
        medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        low: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    const style = colors[priority?.toLowerCase()] || 'bg-surface text-foreground/40 border-border';
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style}`}>
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
            <div className="flex h-screen w-full bg-f text-foreground overflow-hidden">
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
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                <div className="lg:col-span-3 border border-border rounded overflow-hidden bg-surface/30">
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-0">
                                            <Skeleton width={120} height={14} />
                                            <Skeleton width={60} height={18} />
                                            <Skeleton width={100} height={14} />
                                            <Skeleton width={80} height={14} className="ml-auto" />
                                        </div>
                                    ))}
                                </div>
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="border border-border rounded p-5 bg-surface/30 space-y-4">
                                        <Skeleton width={100} height={14} />
                                        <Skeleton width={200} height={40} />
                                        <Skeleton width="100%" height={8} />
                                    </div>
                                    <div className="border border-border rounded overflow-hidden bg-surface/30">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="px-4 py-3 border-b border-border last:border-0 flex items-center gap-3">
                                                <Skeleton circle width={32} height={32} />
                                                <div className="space-y-2">
                                                    <Skeleton width={80} height={12} />
                                                    <Skeleton width={120} height={10} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

    const { kpis, recentTickets, activeChatbots = [], recentInteractions = [] } = data;

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 overflow-y-auto">
                {/* Top Nav Header */}
                <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 gap-4">
                    <div className="min-w-0">
                        <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
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
                    {/* Welcome Section for New Users */}
                    {activeChatbots.length === 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                                <Sparkles size={120} />
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                    <Sparkles size={12} />
                                    <span>Welcome to AI Studio</span>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Let's build your first AI Agent</h2>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    Your dashboard is currently waiting for data. Start by creating an agent, training it with your knowledge, and embedding it on your site to see live analytics here.
                                </p>
                                <div className="flex items-center gap-4 pt-2">
                                    <NavLink
                                        to="/dashboard/studio/editor"
                                        className="px-6 py-2.5 bg-primary text-white rounded font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
                                    >
                                        Create My First Agent
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard/knowledge"
                                        className="px-6 py-2.5 bg-surface border border-border rounded font-medium text-sm hover:bg-surface/50 transition-all"
                                    >
                                        Setup Knowledge Base
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <KpiCard
                            title="Open Tickets"
                            value={kpis.openTickets}
                            icon={Ticket}
                            description={activeChatbots.length === 0 ? "Setup agents first" : "Requires attention"}
                        />
                        <KpiCard
                            title="High Priority"
                            value={kpis.highPriority}
                            icon={AlertCircle}
                            className={kpis.highPriority > 0 ? "text-red-500" : ""}
                            description={activeChatbots.length === 0 ? "No issues yet" : "Critical issues"}
                        />
                        <KpiCard
                            title="Active Bots"
                            value={kpis.activeChatbots}
                            icon={Bot}
                            description={activeChatbots.length === 0 ? "Start creating now" : "Live across domains"}
                        />
                        <KpiCard
                            title="Total Leads"
                            value={kpis.totalLeads}
                            icon={Users}
                            description={activeChatbots.length === 0 ? "Awaiting interactions" : "Collected via forms/bots"}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* Left Side: Needs Attention (3/5 width) */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-medium flex items-center gap-2">
                                    <Activity size={18} className="text-foreground/70" />
                                    Needs Attention
                                </h2>
                                <NavLink to="/dashboard/tickets" className="text-sm text-primary hover:underline flex items-center gap-1">
                                    <span>View all</span>
                                    <ChevronRight size={14} />
                                </NavLink>
                            </div>

                            <div className="bg-surface/10 backdrop-blur-md border border-border rounded overflow-hidden">
                                {recentTickets && recentTickets.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-foreground/2 border-b border-border">
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Inquiry</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Priority</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40">Customer</th>
                                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-foreground/40 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/50">
                                            {recentTickets.map(ticket => (
                                                <tr key={ticket._id} className="group hover:bg-primary/2 transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/tickets/${ticket._id}`}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-sm group-hover:text-primary transition-colors line-clamp-1 font-medium">{ticket.inquiree || 'No subject'}</span>
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
                                                            <span className="text-xs font-medium text-foreground/80">{ticket.name}</span>
                                                            <span className="text-[10px] text-foreground/30">{ticket.email}</span>
                                                        </div>
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

                        {/* Right Side: System Intelligence (2/5 width) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-medium flex items-center gap-2">
                                    <Zap size={18} className="text-primary" />
                                    System Intelligence
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* AI Performance Quick Look */}
                                <div className="bg-primary/5 border border-primary/20 rounded p-5 relative overflow-hidden group">
                                    <div className="absolute -right-4 -top-4 text-primary/10 group-hover:scale-110 transition-transform">
                                    </div>
                                    <div className="relative z-10 space-y-3">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Zap size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">AI Performance</span>
                                        </div>
                                        <div className="flex items-end gap-3">
                                            <div className="text-3xl font-bold tracking-tight">84%</div>
                                            <div className="text-xs text-foreground/50 mb-1">Resolution Rate</div>
                                        </div>
                                        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[84%] rounded-full shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"></div>
                                        </div>
                                        <p className="text-[10px] text-foreground/50">AI is handling 84% of inquiries without human intervention.</p>
                                    </div>
                                </div>

                                {/* Active Agents List */}
                                <div className="bg-surface/10 backdrop-blur-md border border-border rounded overflow-hidden">
                                    <div className="px-4 py-3 border-b border-border bg-foreground/2 flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 flex items-center gap-2">
                                            <Cpu size={12} />
                                            Active Agents
                                        </span>
                                        <span className="text-[10px] font-medium text-primary">{activeChatbots.length} Live</span>
                                    </div>
                                    <div className="divide-y divide-border/50">
                                        {activeChatbots.length > 0 ? activeChatbots.map(bot => (
                                            <div key={bot._id} className="px-4 py-3 flex items-center justify-between group hover:bg-surface/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center text-primary group-hover:border-primary/30 transition-colors">
                                                        <Bot size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-medium">{bot.name}</span>
                                                        <span className="text-[10px] text-foreground/40 flex items-center gap-1">
                                                            <Globe size={10} />
                                                            {bot.verifiedDomains?.[0] || 'Embedded'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span className="text-[10px] font-medium text-foreground/40 uppercase tracking-tighter">Live</span>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="px-4 py-6 text-center text-[11px] text-foreground/40">No active agents</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </main>
        </div>
    );
};

const KpiCard = ({ title, value, icon: Icon, className = "", description }) => (
    <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5 group hover:border-primary/20 hover:bg-surface/20 transition-all cursor-default">
        <div className={`w-12 h-12 rounded bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform ${className.includes('text-red') ? 'bg-red-500/10' : 'bg-primary/10'}`}>
            <Icon size={22} className={className || 'text-primary'} />
        </div>
        <div className="space-y-0.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">{value}</span>
                <span className="text-[10px] text-foreground/30 font-medium truncate max-w-[100px]">{description}</span>
            </div>
        </div>
    </div>
);

export default Dashboard;