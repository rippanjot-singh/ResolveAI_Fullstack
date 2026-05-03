import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Inbox, MessageSquare, Zap, Command, Search, User, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../../../../shared/layout/Navbar';

const Home = () => {
    const navigate = useNavigate();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse for a subtle glow effect on the hero
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    const techStackItems = (
        <>
            <span className="font-display font-medium text-lg tracking-tight flex items-center gap-1.5 shrink-0"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg>Next.js</span>
            <span className="font-display font-normal text-lg flex items-center gap-1.5 shrink-0"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" /></svg>React</span>
            <span className="font-display font-normal text-lg flex items-center gap-1.5 shrink-0"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h4.5L12 12.5 17.5 3H22L12 21 2 3z" /></svg>Vue.js</span>
            <span className="font-display font-bold text-lg shrink-0 tracking-tight">Angular</span>
            <span className="font-display font-medium text-lg shrink-0 tracking-tight">Svelte</span>
            <span className="font-mono font-medium text-lg tracking-tight shrink-0">&lt;HTML5/&gt;</span>
            <span className="font-serif font-normal text-xl italic shrink-0">WordPress</span>
            <span className="font-display font-medium text-lg shrink-0">Shopify</span>
            <span className="font-display font-bold text-lg shrink-0">Webflow</span>
            <span className="font-display font-light text-2xl uppercase tracking-tighter shrink-0">W<span className="font-medium">i</span>X</span>
            <span className="font-mono font-medium text-lg shrink-0 tracking-tight">Django</span>
            <span className="font-display font-bold text-lg shrink-0 tracking-tight">Rails</span>
            <span className="font-display font-medium text-lg shrink-0">Node.js</span>
        </>
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-body overflow-x-hidden">
            <Navbar />

            {/* HERO: Interactive Floating Ecosystem */}
            <section className="relative pt-32 pb-32 px-6 lg:pt-40 lg:pb-40 min-h-[95vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[#FAFAFA]">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-700" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Copy & CTAs */}
                    <div className="flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-[11px] font-normal tracking-wide uppercase text-black mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Resolve AI
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-[88px] font-display font-normal tracking-[-0.04em] leading-[0.95] text-[#0A0A0A] mb-8">
                            Support that <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-black to-black/60">
                                never sleeps.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-black/60 font-normal max-w-lg leading-relaxed mb-10">
                            A blazing fast shared inbox where AI handles the repetitive tickets, so your team can focus on the conversations that matter.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Link to="/signup" className="h-14 px-8 bg-black text-white flex items-center justify-center rounded font-medium hover:bg-black/80 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-black/20 w-full sm:w-auto cursor-pointer">
                                Get Started for Free
                            </Link>
                            <button onClick={() => navigate('/login')} className="h-14 px-8 bg-white border border-black/10 text-black flex items-center justify-center rounded font-normal hover:bg-black/5 transition-colors w-full sm:w-auto sm:flex cursor-pointer">
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Right: Floating UI Ecosystem */}
                    <div className="relative h-[500px] lg:h-[600px] w-full hidden md:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        {/* Central Hub Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white rounded border border-black/10 shadow-2xl shadow-black/10 p-6 z-20">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-normal text-sm">Resolve AI</h3>
                                        <p className="text-xs text-black/40">Analyzing incoming queue...</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[85%] rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 w-1/2 -translate-x-full animate-[shimmer_2s_infinite]" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] font-normal text-black/40 uppercase tracking-wider">
                                    <span>Resolution Rate</span>
                                    <span className="text-black">85%</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 1: Incoming Ticket (Top Left) */}
                        <div className="absolute top-[15%] left-[10%] w-[260px] bg-white backdrop-blur-md rounded border border-black/10 shadow-xl p-4 z-30 animate-[bounce_6s_infinite_ease-in-out]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-normal text-xs">JD</div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-normal text-black">John Doe</h4>
                                    <p className="text-[10px] text-black/40">Just now</p>
                                </div>
                                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-normal uppercase rounded">High</span>
                            </div>
                            <p className="text-xs text-black/70 font-light leading-relaxed">I'm locked out of my enterprise account, need immediate help!</p>
                        </div>

                        {/* Floating Card 2: AI Action (Bottom Right) */}
                        <div className="absolute bottom-[10%] right-[5%] w-[280px] bg-white text-black border border-black/10 rounded shadow-xl p-5 z-40 animate-[bounce_7s_infinite_reverse_ease-in-out]">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs font-normal uppercase tracking-wider text-black/40">Action Taken</span>
                            </div>
                            <p className="text-sm font-light mb-4 leading-relaxed text-black/80">Password reset workflow initiated. Secure link delivered to user email.</p>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-black/5 text-black flex items-center justify-center text-[8px] font-normal"><Bot className="w-3 h-3" /></div>
                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-black flex items-center justify-center text-[8px] font-normal text-white">JD</div>
                                </div>
                                <span className="text-[10px] text-black/40 font-light">Ticket auto-resolved</span>
                            </div>
                        </div>

                        {/* Floating Card 3: Live Stats (Top Right) */}
                        <div className="absolute top-[10%] right-[10%] w-[180px] bg-white rounded border border-black/10 shadow-xl p-4 z-10 rotate-3 animate-[bounce_8s_infinite_ease-in-out]">
                            <div className="text-[10px] uppercase font-normal text-black/40 mb-1 tracking-wider">Queue Backlog</div>
                            <div className="text-3xl font-light tracking-tighter text-black">0</div>
                            <div className="mt-2 flex items-center gap-1 text-green-600 text-xs font-normal">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                Inbox Zero Reached
                            </div>
                        </div>

                        {/* Floating Line Connections (Abstract) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: '4 4' }}>
                            <path d="M 130 120 Q 250 200 300 300" fill="none" stroke="currentColor" className="text-black/5" strokeWidth="2" />
                            <path d="M 450 450 Q 350 350 300 300" fill="none" stroke="currentColor" className="text-black/5" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* TECH STACK CAROUSEL */}
            <section className="py-10 border-y border-black/5 bg-[#F9F9F9] overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#F9F9F9] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#F9F9F9] to-transparent z-10 pointer-events-none"></div>

                <div
                    className="flex w-max animate-marquee text-[#0A0A0A] opacity-70 hover:opacity-100 transition-opacity duration-500"
                    style={{ animationPlayState: 'running' }}
                    onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                    onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                >
                    {/* Duplicated 3× for a seamless infinite loop */}
                    <div className="flex items-center gap-16 px-8 shrink-0">{techStackItems}</div>
                    <div className="flex items-center gap-16 px-8 shrink-0" aria-hidden>{techStackItems}</div>
                    <div className="flex items-center gap-16 px-8 shrink-0" aria-hidden>{techStackItems}</div>
                </div>
            </section>

            {/* BENTO GRID PLATFORM SECTION */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-20 max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-[#0A0A0A] mb-6">
                        Everything you need.<br />
                        <span className="text-black/40">Nothing you don't.</span>
                    </h2>
                    <p className="text-xl text-black/60 font-light">
                        We stripped away the clutter of legacy support tools to build a lighting-fast platform designed for the modern team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
                    <div className="md:col-span-2 rounded bg-white border border-black/5 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group hover:border-black/10 transition-colors">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-linear-to-bl from-black/2 to-transparent rounded-bl-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <Inbox className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-normal mb-2">Omnichannel Inbox</h3>
                            <p className="text-black/60 font-light max-w-sm">Bring emails, live chats, and web forms into one beautifully unified queue. Stop switching tabs.</p>
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-96 h-48 bg-white border border-black/10 rounded shadow-2xl flex p-4 gap-4 -rotate-6 group-hover:-rotate-2 transition-transform duration-500">
                            <div className="w-12 h-12 rounded-full bg-black/5 shrink-0" />
                            <div className="space-y-2 flex-1 pt-2">
                                <div className="h-3 w-1/3 bg-black/10 rounded" />
                                <div className="h-2 w-full bg-black/5 rounded" />
                                <div className="h-2 w-4/5 bg-black/5 rounded" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded bg-[#0A0A0A] text-white p-8 flex flex-col justify-between overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mb-6">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-normal mb-2">Autonomous AI</h3>
                            <p className="text-white/80 font-light text-sm">Train an agent on your docs. Watch it resolve 80% of tickets before a human even sees them.</p>
                        </div>
                    </div>

                    <div className="rounded bg-white border border-black/5 shadow-sm p-8 flex flex-col justify-between group hover:border-black/10 transition-colors">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-normal mb-2">Live Chat</h3>
                            <p className="text-black/60 font-light text-sm">Deploy a stunning, customizable chat widget to your site in minutes.</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 rounded bg-white border border-black/5 shadow-sm p-8 flex flex-col justify-between overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-normal text-black mb-2">Agent Workflows & SLAs</h3>
                            <p className="text-black/60 font-light max-w-sm">Set up macros, assignment rules, and strict SLA alerts to ensure no customer is left waiting.</p>
                        </div>
                        <div className="absolute right-8 bottom-8 flex items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                            <div className="px-4 py-2 bg-black/5 text-black rounded text-xs font-normal font-mono border border-black/10">IF Ticket = 'Billing'</div>
                            <ArrowRight className="w-4 h-4 text-black/40" />
                            <div className="px-4 py-2 bg-[#0A0A0A] text-white rounded text-xs font-normal font-mono shadow-xl shadow-black/20">ASSIGN Team_Finance</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NOTION INTEGRATION SECTION */}
            <section className="py-32 px-6 bg-[#FAFAFA] border-t border-black/5 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-white text-[11px] font-normal tracking-wide uppercase text-black shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-3.5 h-3.5 object-contain grayscale" />
                            Knowledge Sync
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            Your docs, <br />
                            instantly alive.
                        </h2>
                        <p className="text-xl text-black/50 font-light max-w-lg leading-relaxed">
                            Integrates directly with Notion to use your internal docs, policies, and knowledge base. Resolve reads your exact tree structure and trains its neural model in seconds.
                        </p>
                        <div className="pt-4 flex items-center gap-4">
                            <button className="h-12 px-6 bg-white border border-black/10 text-black flex items-center gap-3 rounded font-light hover:bg-black/2 transition-colors shadow-sm text-sm">
                                Connect Notion Workspace
                                <ArrowRight className="w-4 h-4 text-black/40" />
                            </button>
                        </div>
                    </div>

                    {/* Visual Mockup - Notion Tree */}
                    <div className="flex-1 w-full max-w-2xl relative">
                        <div className="relative z-10 w-full max-w-lg mx-auto md:mr-0">

                            {/* Resolve Sync Overlay */}
                            <div className="absolute -top-6 -right-6 z-30 bg-[#0A0A0A] text-white px-4 py-3 rounded shadow-2xl border border-white/10 flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out]">
                                <div className="relative flex items-center justify-center w-8 h-8 rounded border border-white/10 bg-white/5">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/50 font-mono">Status</p>
                                    <p className="text-sm font-normal text-white/90">Indexing 1,402 pages</p>
                                </div>
                            </div>

                            {/* The Notion Mockup Container */}
                            <div className="bg-white rounded border border-black/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col h-[380px]">
                                {/* Header */}
                                <div className="h-12 border-b border-black/5 flex items-center px-4 gap-2 bg-[#FAFAFA]">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-4 h-4 object-contain" />
                                    <span className="text-sm font-medium text-black/80 font-sans">Acme Corp Workspace</span>
                                </div>

                                {/* Sidebar / Tree View */}
                                <div className="flex-1 p-5 overflow-hidden bg-white relative">
                                    {/* Scanning beam effect */}
                                    <div className="absolute top-0 left-0 w-full h-16 bg-linear-to-b from-blue-500/0 via-blue-500-[0.03] to-blue-500/0 border-y border-blue-500/10 animate-[shimmer_3s_infinite_linear] z-20 pointer-events-none" />

                                    <div className="space-y-1.5 font-sans text-[13px] text-black/70">

                                        {/* Tree Level 1 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronDown className="w-3.5 h-3.5 text-black/40" />
                                            <span className="text-base">📚</span>
                                            <span className="font-medium text-black/90">Customer Support Wiki</span>
                                        </div>

                                        {/* Tree Level 2 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 pl-7 hover:bg-black/5 rounded cursor-default transition-colors bg-black/2">
                                            <ChevronDown className="w-3.5 h-3.5 text-black/40" />
                                            <span className="text-base">📄</span>
                                            <span className="text-black/80 font-medium">Billing & Subscriptions</span>
                                        </div>

                                        {/* Tree Level 3 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 pl-12 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronRight className="w-3.5 h-3.5 text-transparent" />
                                            <span className="text-base text-black/40">📝</span>
                                            <span className="text-black/60">How to upgrade plan</span>
                                            <span className="ml-auto text-[9px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider font-medium border border-blue-100">Synced</span>
                                        </div>

                                        {/* Tree Level 3 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 pl-12 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronRight className="w-3.5 h-3.5 text-transparent" />
                                            <span className="text-base text-black/40">📝</span>
                                            <span className="text-black/60">Refund policy (2025)</span>
                                            <span className="ml-auto text-[9px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider font-medium border border-blue-100">Synced</span>
                                        </div>

                                        {/* Tree Level 2 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 pl-7 mt-2 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronDown className="w-3.5 h-3.5 text-black/40" />
                                            <span className="text-base">🛠️</span>
                                            <span className="text-black/80 font-medium">Troubleshooting Guides</span>
                                        </div>

                                        {/* Tree Level 3 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 pl-12 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronRight className="w-3.5 h-3.5 text-transparent" />
                                            <span className="text-base text-black/40">⚠️</span>
                                            <span className="text-black/60">API Rate Limits</span>
                                            <span className="ml-auto text-[10px] text-black/30 flex items-center gap-1">
                                                <svg className="animate-spin h-3 w-3 text-black/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Reading
                                            </span>
                                        </div>

                                        {/* Tree Level 1 */}
                                        <div className="flex items-center gap-2 py-1.5 px-2 mt-2 hover:bg-black/5 rounded cursor-default transition-colors">
                                            <ChevronRight className="w-3.5 h-3.5 text-black/40" />
                                            <span className="text-base">🔐</span>
                                            <span className="font-medium text-black/90">Internal Policies</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-sm bg-blue-100 blur-[80px] rounded-full mix-blend-multiply pointer-events-none -z-10"></div>
                    </div>
                </div>
            </section>

            {/* CONTINUOUS LEARNING / AI TRAINING */}
            <section className="py-32 px-6 border-t border-black/5 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
                    {/* Visual Mockup */}
                    <div className="flex-1 w-full max-w-2xl relative">
                        <div className="bg-[#F9F9F9] rounded-xl border border-black/5 p-8 pb-0 overflow-hidden relative shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
                            {/* Background decorative grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

                            <div className="relative z-10 flex flex-col gap-6">
                                {/* Human Agent Action */}
                                <div className="bg-white border border-black/10 rounded shadow-sm p-4 w-5/6 mr-auto relative transform -rotate-1 hover:rotate-0 transition-transform">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black text-[10px]">SJ</div>
                                        <span className="text-xs font-normal text-black">Sarah Jenkins <span className="text-black/40">replied</span></span>
                                    </div>
                                    <p className="text-xs text-black/70 font-light mb-3 leading-relaxed">"Yes, you can absolutely do that by toggling the advanced webhook settings directly in your organization dashboard..."</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                                        <span className="text-[10px] text-black/40 uppercase tracking-widest font-normal">Ticket Resolved</span>
                                        <span className="px-2 py-0.5 bg-black/5 text-black border border-black/10 rounded text-[9px] uppercase tracking-wider">Human Override</span>
                                    </div>
                                </div>

                                {/* AI Learning Pipeline Line */}
                                <div className="flex flex-col items-center">
                                    <div className="h-8 w-px bg-black/10 relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/10"></div>
                                    </div>
                                </div>

                                {/* AI Observation/Training block */}
                                <div className="bg-[#0A0A0A] border border-black/20 rounded shadow-2xl p-5 w-5/6 ml-auto text-white relative transform rotate-1 hover:rotate-0 transition-transform -mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Bot className="w-4 h-4 text-white/50" />
                                            <span className="text-xs font-normal text-white/80">Resolve Engine</span>
                                        </div>
                                        <span className="text-[10px] text-green-400 font-mono animate-pulse uppercase tracking-widest">Syncing</span>
                                    </div>
                                    <p className="text-[11px] text-white/60 font-light font-mono mb-3 uppercase tracking-wider">Analyzing response pattern...</p>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                                        <div className="h-full bg-white/40 w-full rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 bg-white/20 w-1/2 -translate-x-full animate-[shimmer_2s_infinite]" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-[10px] text-white font-light">New behavioral vector added to model</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-black/5 text-[11px] font-normal tracking-wide uppercase text-black">
                            Continuous Learning
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            Gets smarter with<br />
                            every conversation.
                        </h2>
                        <p className="text-xl text-black/50 font-light max-w-lg leading-relaxed">
                            Static knowledge bases get outdated quickly. Resolve's engine continuously observes how your human agents solve complex edge-cases, dynamically updating its own neural model in real-time.
                        </p>
                        <div className="flex flex-col gap-5 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-black/60 text-[10px]">1</span>
                                </div>
                                <div>
                                    <h4 className="font-normal text-black text-sm mb-1">Human Agent steps in</h4>
                                    <p className="text-sm text-black/50 font-light">When AI isn't sure, it seamlessly hands off to a human.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-black/60 text-[10px]">2</span>
                                </div>
                                <div>
                                    <h4 className="font-normal text-black text-sm mb-1">Real-time analysis</h4>
                                    <p className="text-sm text-black/50 font-light">The engine processes the human's solution structure and tone.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                                    <span className="text-[10px]">3</span>
                                </div>
                                <div>
                                    <h4 className="font-normal text-black text-sm mb-1">Permanent knowledge upgrade</h4>
                                    <p className="text-sm text-black/50 font-light">The AI handles identical future tickets completely autonomously.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ONE-LINE INTEGRATION */}
            <section className="py-32 px-6 bg-[#FAFAFA] border-t border-black/5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-black/5 text-[11px] font-normal tracking-wide uppercase text-black">
                            Seamless Deployment
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            One line of code.<br />
                            Ready to resolve.
                        </h2>
                        <p className="text-xl text-black/50 font-light max-w-lg leading-relaxed">
                            No complex SDKs. No massive dependencies. Just drop a single script tag into your application's `&lt;head&gt;` and instantly deploy a fully-trained AI support agent to your users.
                        </p>
                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4 text-black/60 font-light">
                                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Zero impact on your core web vitals.</span>
                            </div>
                            <div className="flex items-center gap-4 text-black/60 font-light">
                                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span>Works with React, Vue, Next.js, or plain HTML.</span>
                            </div>
                        </div>
                    </div>

                    {/* IDE Mockup */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="bg-[#0A0A0A] rounded-xl shadow-2xl overflow-hidden border border-black/10">
                            {/* IDE Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-white/40 text-xs font-mono font-normal">index.html</div>
                                <div className="w-4"></div> {/* spacer */}
                            </div>
                            {/* IDE Body */}
                            <div className="p-6 overflow-x-auto">
                                <pre className="font-mono text-xs md:text-sm leading-loose">
                                    <code className="text-white/70">
                                        <span className="text-black/40">&lt;!-- Resolve AI Widget --&gt;</span>{'\n'}
                                        <span className="text-blue-400">&lt;script</span>{'\n'}
                                        {'  '}<span className="text-green-300">src</span>=<span className="text-yellow-300">"https://resolveai.morelogical.tech"</span>{'\n'}
                                        {'  '}<span className="text-green-300">data-id</span>=<span className="text-yellow-300">"Your-Chatbot-Id"</span>{'\n'}
                                        {'  '}<span className="text-green-300">defer</span>{'\n'}
                                        <span className="text-blue-400">&gt;&lt;/script&gt;</span>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* METRICS SECTION (Clean typographic approach) */}
            <section className="py-24 border-y border-black/5 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                    {[
                        { label: 'Time to Value', value: 'Minutes' },
                        { label: 'Deflection Rate', value: 'Up to 65%' },
                        { label: 'Platform Uptime', value: '99.99%' },
                        { label: 'Support Experience', value: '10/10' },
                    ].map((metric, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="h-px w-8 bg-black/20" />
                            <span className="text-4xl md:text-5xl font-display font-light text-black tracking-tight">{metric.value}</span>
                            <span className="text-sm font-light text-black/50 uppercase tracking-widest">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-40 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-5xl md:text-7xl font-display font-light tracking-tight mb-8">
                    Stop answering the<br />same questions.
                </h2>
                <p className="text-xl text-black/50 font-light mb-12 max-w-xl mx-auto">
                    Give your team the workspace they deserve. Start your 14-day free trial today. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/signup" className="h-14 px-8 bg-primary text-white flex items-center justify-center rounded font-light hover:bg-primary/80 transition-colors shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 cursor-pointer">
                        Get Started for Free
                    </Link>
                    <button onClick={() => navigate('/login')} className="h-14 px-8 bg-transparent text-black border border-black/10 flex items-center justify-center rounded font-light hover:bg-black/5 transition-colors cursor-pointer">
                        Login
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-black/5 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-display font-light tracking-tight text-xl">
                        ResolveAI
                    </div>
                    <div className="flex gap-8 text-sm font-light text-black/50">
                        <p>
                            © 2026 MoreLogical.tech
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;