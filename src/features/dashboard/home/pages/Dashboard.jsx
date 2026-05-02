import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { 
    Ticket, AlertCircle, Bot, Users, Activity, ExternalLink, FileText
} from 'lucide-react';

const Dashboard = () => {
    const { data, isLoading, error } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full bg-background text-foreground">
                <SideNav />
                <main className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded h-8 w-8 border-b-2 border-primary"></div>
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
                            
                            <div className="border border-border rounded overflow-hidden bg-surface/30">
                                {recentTickets && recentTickets.length > 0 ? (
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-foreground/60 uppercase bg-surface/50 border-b border-border">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Source</th>
                                                <th className="px-4 py-3 font-medium">Inquiry</th>
                                                <th className="px-4 py-3 font-medium">Priority</th>
                                                <th className="px-4 py-3 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {recentTickets.map(ticket => (
                                                <tr key={ticket._id} className="hover:bg-surface/50 cursor-pointer transition-colors">
                                                    <td className="px-4 py-3 capitalize text-foreground/80">
                                                        {ticket.type}
                                                    </td>
                                                    <td className="px-4 py-3 truncate max-w-[200px]" title={ticket.inquiree}>
                                                        {ticket.inquiree || "No subject"}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium 
                                                            ${ticket.priority === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                                                            ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                                                            'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                                                        >
                                                            {ticket.priority}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <NavLink 
                                                            to={`/dashboard/tickets/${ticket._id}`}
                                                            className="inline-flex p-1.5 hover:bg-background rounded text-foreground/70 hover:text-foreground transition-colors"
                                                        >
                                                            <ExternalLink size={16} />
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-foreground/50 text-sm">
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