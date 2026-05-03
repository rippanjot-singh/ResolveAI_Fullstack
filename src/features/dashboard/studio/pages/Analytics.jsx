import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';
import { useAnalytics } from '../hooks/useAnalytics';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, MessageSquare, Users, Bot, RefreshCw, Info, Smile, Frown, Meh, HelpCircle, ArrowLeft } from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
    const colorMap = {
        primary: 'bg-primary/10 text-primary',
        amber: 'bg-amber-500/10 text-amber-500',
        indigo: 'bg-indigo-500/10 text-indigo-500',
        green: 'bg-green-500/10 text-green-500'
    };
    const iconStyle = colorMap[color] || colorMap.primary;

    return (
        <div className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex flex-col justify-center relative group hover:border-primary/20 transition-all h-full">
            <div className="flex items-center gap-5">
                <div className={`w-12 h-12 shrink-0 rounded flex items-center justify-center group-hover:scale-110 transition-transform ${iconStyle}`}>
                    <Icon size={24} />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
            {trend !== undefined && trend !== null && (
                <div className="absolute top-6 right-6">
                    <div className={`text-[10px] font-bold px-2 py-1 rounded border ${trend > 0 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'} flex items-center gap-1`}>
                        {trend > 0 ? '+' : ''}{trend}%
                        <TrendingUp size={10} className={trend < 0 ? 'rotate-180' : ''} />
                    </div>
                </div>
            )}
        </div>
    );
};

const SentimentIcon = ({ sentiment }) => {
    switch (sentiment?.toLowerCase()) {
        case 'positive': return <Smile size={14} className="text-green-500" />;
        case 'negative': return <Frown size={14} className="text-red-500" />;
        case 'neutral': return <Meh size={14} className="text-amber-500" />;
        default: return <HelpCircle size={14} className="text-foreground/30" />;
    }
};

const Analytics = () => {
    const { id } = useParams();
    const { loading, timeframe, setTimeframe, data, refresh } = useAnalytics('7d', id);

    const COLORS = {
        positive: '#22c55e',
        negative: '#ef4444',
        neutral: '#f59e0b',
        unknown: '#94a3b8'
    };

    const LINE_COLORS = [
        '#6366f1', // Indigo (Primary)
        '#8b5cf6', // Violet
        '#3b82f6', // Blue
        '#06b6d4', // Cyan
        '#7c3aed', // Purple
        '#2dd4bf', // Teal
    ];

    const timeframeLabels = {
        '24h': 'Last 24 Hours',
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days'
    };

    // Get bot names from data (keys in dailyChats excluding 'date' and 'total')
    const bots = data.dailyChats.length > 0 
        ? Object.keys(data.dailyChats[0]).filter(k => k !== 'date' && k !== 'total')
        : [];

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-10 gap-4">
                    <div className="min-w-0 flex-1 flex items-center gap-4">
                        {id && (
                            <NavLink to="/dashboard/studio/analytics" className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground">
                                <ArrowLeft size={18} />
                            </NavLink>
                        )}
                        <div>
                            <h1 className="text-[clamp(1rem,3vw,1.125rem)] font-bold truncate">
                                {id ? `${bots[0] || 'Agent'} Analytics` : 'Studio Analytics'}
                            </h1>
                            <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-foreground/40 truncate">
                                {id ? 'Individual performance metrics' : 'Monitor AI behavior across all agents'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1 bg-surface border border-border rounded p-1">
                            {Object.entries(timeframeLabels).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => setTimeframe(key)}
                                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${timeframe === key ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground'}`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={refresh}
                            className="p-2 hover:bg-surface rounded transition-colors text-foreground/40 hover:text-foreground"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="mx-auto space-y-8">
                        
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {loading ? (
                                <SkeletonWrapper>
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-surface/10 backdrop-blur-md border border-border rounded p-6 flex items-center gap-5">
                                            <Skeleton width={48} height={48} />
                                            <div className="space-y-1">
                                                <Skeleton width={80} height={12} />
                                                <Skeleton width={60} height={24} />
                                            </div>
                                        </div>
                                    ))}
                                </SkeletonWrapper>
                            ) : (
                                <>
                                    <StatCard title="Total Chats" value={data.stats.totalChats} icon={Users} trend={data.stats.chatTrend} />
                                    <StatCard title="Total Messages" value={data.stats.totalMessages} icon={MessageSquare} trend={data.stats.messageTrend} color="amber" />
                                    <StatCard title="Active Agents" value={data.stats.chatbotCount} icon={Bot} color="indigo" />
                                    <StatCard title="Avg. Resolution" value={`${data.stats.resolutionRate ?? 100}%`} icon={TrendingUp} trend={null} color="green" />
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Daily Chats Chart */}
                            <div className="lg:col-span-2 bg-surface/30 border border-border rounded p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-sm font-bold">Interactions Breakdown</h3>
                                        <p className="text-xs text-foreground/40">
                                            {id ? 'Daily volume for this agent' : 'Comparative volume across all agents'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {!id && (
                                            <div className="hidden sm:flex items-center gap-3">
                                                {bots.map((bot, i) => (
                                                    <div key={bot} className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LINE_COLORS[i % LINE_COLORS.length] }}></div>
                                                        <span className="text-[10px] font-bold text-foreground/40 uppercase">{bot}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">
                                            <div className="w-2 h-2 rounded bg-primary animate-pulse"></div>
                                            Live Trends
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[350px] w-full min-w-0">
                                    {data.dailyChats.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                            <LineChart data={data.dailyChats}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                                <XAxis 
                                                    dataKey="date" 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{fontSize: 10, fill: 'var(--color-foreground)', opacity: 0.4}}
                                                    dy={10}
                                                    tickFormatter={(str) => {
                                                        try {
                                                            const date = new Date(str);
                                                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                                        } catch (e) { return str; }
                                                    }}
                                                />
                                                <YAxis 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{fontSize: 10, fill: 'var(--color-foreground)', opacity: 0.4}}
                                                    allowDecimals={false}
                                                />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                                                    itemSorter={(item) => -item.value}
                                                />
                                                {id ? (
                                                    <Line 
                                                        type="monotone" 
                                                        dataKey={bots[0]} 
                                                        stroke="var(--color-primary)" 
                                                        strokeWidth={3}
                                                        dot={false}
                                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                                    />
                                                ) : (
                                                    bots.map((bot, i) => (
                                                        <Line 
                                                            key={bot}
                                                            type="monotone" 
                                                            dataKey={bot} 
                                                            stroke={LINE_COLORS[i % LINE_COLORS.length]} 
                                                            strokeWidth={2}
                                                            dot={false}
                                                            activeDot={{ r: 4, strokeWidth: 0 }}
                                                        />
                                                    ))
                                                )}
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-foreground/20 italic text-sm">
                                            No data available for this period
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sentiment Donut */}
                            <div className="bg-surface/30 border border-border rounded p-6 flex flex-col">
                                <div className="mb-8">
                                    <h3 className="text-sm font-bold">User Sentiment</h3>
                                    <p className="text-xs text-foreground/40">Mood analysis of current interactions</p>
                                </div>
                                <div className="h-[250px] w-full min-w-0 relative">
                                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                        <PieChart>
                                            <Pie
                                                data={data.sentimentDistribution}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {data.sentimentDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.unknown} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                                        <span className="text-xs text-foreground/30 font-medium uppercase tracking-widest">Sentiment</span>
                                        <span className="text-xl font-bold">Index</span>
                                    </div>
                                </div>
                                <div className="mt-auto space-y-2">
                                    {data.sentimentDistribution.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between p-2 rounded hover:bg-surface/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <SentimentIcon sentiment={item.name} />
                                                <span className="text-xs font-medium capitalize">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                    {data.sentimentDistribution.length === 0 && (
                                        <div className="text-center py-4 text-foreground/20 italic text-xs">
                                            No sentiment data yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Highlights / Insights */}
                        <div className="bg-surface/10 border border-border border-dashed rounded p-8 flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center">
                                <Info size={24} className="text-primary/60" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Smart Insights</h4>
                                <p className="text-xs text-foreground/40 max-w-md mt-1">
                                    Your AI is successfully resolving 84% of queries without human intervention. 
                                    Positive sentiment has increased by 5% compared to the previous period.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
