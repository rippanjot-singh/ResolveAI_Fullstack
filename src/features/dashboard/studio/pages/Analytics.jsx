import React, { useState } from 'react';
import SideNav from '../../../../shared/layout/SideNav';
import { useAnalytics } from '../hooks/useAnalytics';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
    TrendingUp, MessageSquare, Users, Bot, 
    Calendar, ChevronDown, RefreshCw, Info,
    Smile, Frown, Meh, HelpCircle
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => (
    <div className="bg-surface/30 border border-border rounded p-6 space-y-4">
        <div className="flex items-center justify-between">
            <div className={`p-2 rounded bg-${color}/10 text-${color}`}>
                <Icon size={20} />
            </div>
            {trend && (
                <div className={`text-xs font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                    {trend > 0 ? '+' : ''}{trend}%
                    <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                </div>
            )}
        </div>
        <div>
            <p className="text-xs text-foreground/40 font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    </div>
);

const SentimentIcon = ({ sentiment }) => {
    switch (sentiment?.toLowerCase()) {
        case 'positive': return <Smile size={14} className="text-green-500" />;
        case 'negative': return <Frown size={14} className="text-red-500" />;
        case 'neutral': return <Meh size={14} className="text-amber-500" />;
        default: return <HelpCircle size={14} className="text-foreground/30" />;
    }
};

const Analytics = () => {
    const { loading, timeframe, setTimeframe, data, refresh } = useAnalytics();

    const COLORS = {
        positive: '#22c55e',
        negative: '#ef4444',
        neutral: '#f59e0b',
        unknown: '#94a3b8'
    };

    const timeframeLabels = {
        '24h': 'Last 24 Hours',
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days'
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 shrink-0 z-10">
                    <div>
                        <h1 className="text-lg font-bold">Studio Analytics</h1>
                        <p className="text-xs text-foreground/40">Monitor AI behavior and interaction trends</p>
                    </div>
                    <div className="flex items-center gap-3">
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
                            <StatCard 
                                title="Total Chats" 
                                value={data.stats.totalChats} 
                                icon={Users} 
                                trend={data.stats.chatTrend} 
                            />
                            <StatCard 
                                title="Total Messages" 
                                value={data.stats.totalMessages} 
                                icon={MessageSquare} 
                                trend={data.stats.messageTrend}
                                color="amber" 
                            />
                            <StatCard 
                                title="Active Agents" 
                                value={data.stats.chatbotCount} 
                                icon={Bot} 
                                color="indigo" 
                            />
                            <StatCard 
                                title="Avg. Resolution" 
                                value={`${data.stats.resolutionRate}%`} 
                                icon={TrendingUp} 
                                trend={null}
                                color="green" 
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Daily Chats Chart */}
                            <div className="lg:col-span-2 bg-surface/30 border border-border rounded p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-sm font-bold">Daily Interactions</h3>
                                        <p className="text-xs text-foreground/40">Conversation volume over {timeframeLabels[timeframe]}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">
                                        <div className="w-2 h-2 rounded bg-primary animate-pulse"></div>
                                        Live Trends
                                    </div>
                                </div>
                                <div className="h-[350px] w-full">
                                    {data.dailyChats.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data.dailyChats}>
                                                <defs>
                                                    <linearGradient id="colorChats" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
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
                                                        } catch (e) {
                                                            return str;
                                                        }
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
                                                    itemStyle={{ color: 'var(--color-primary)' }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="chats" 
                                                    stroke="var(--color-primary)" 
                                                    strokeWidth={2}
                                                    fillOpacity={1} 
                                                    fill="url(#colorChats)" 
                                                />
                                            </AreaChart>
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
                                <div className="h-[250px] w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
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
