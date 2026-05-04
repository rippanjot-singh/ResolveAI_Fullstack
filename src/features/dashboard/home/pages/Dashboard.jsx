import React from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';
import { Ticket, AlertCircle, Bot, Users } from 'lucide-react';

// Extracted Components
                    import DashboardHeader from '../components/DashboardHeader';
                    import WelcomeSection from '../components/WelcomeSection';
                    import KpiCard from '../components/KpiCard';
                    import NeedsAttention from '../components/NeedsAttention';
                    import SystemIntelligence from '../components/SystemIntelligence';

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

    const { kpis, recentTickets, activeChatbots = [] } = data;

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 overflow-y-auto">
                <DashboardHeader />

                <div className="p-8 mx-auto space-y-8">
                    <WelcomeSection show={activeChatbots.length === 0} />

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
                        <NeedsAttention tickets={recentTickets} />
                        <SystemIntelligence activeChatbots={activeChatbots} kpis={kpis} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;