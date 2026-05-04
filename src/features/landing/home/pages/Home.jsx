import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Inbox, MessageSquare, Zap, Command, Search, User, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../../../../shared/layout/Navbar';

const Home = () => {
    const navigate = useNavigate();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

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
            <section className="relative pt-24 pb-20 px-6 lg:pt-40 lg:pb-40 min-h-[85vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[#FAFAFA]">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] lg:w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[80px] lg:blur-[120px] mix-blend-multiply animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] lg:w-[40%] h-[40%] bg-black/5 rounded-full blur-[80px] lg:blur-[120px] mix-blend-multiply animate-pulse delay-700" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy & CTAs */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-primary/5 text-[10px] lg:text-[11px] font-normal tracking-wide uppercase text-black mb-6 lg:mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Resolve AI
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-[88px] font-display font-normal tracking-[-0.04em] leading-[1.1] lg:leading-[0.95] text-[#0A0A0A] mb-6 lg:mb-8">
                            Support that <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-black to-black/60">
                                never sleeps.
                            </span>
                        </h1>

                        <p className="text-lg lg:text-2xl text-black/60 font-normal max-w-lg leading-relaxed mb-8 lg:mb-10">
                            A blazing fast shared inbox where AI handles the repetitive tickets, so your team can focus on the conversations that matter.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Link to="/signup" className="h-14 px-8 bg-[#0A0A0A] text-white flex items-center justify-center rounded font-medium hover:bg-black/80 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-black/20 w-full sm:min-w-[200px] cursor-pointer">
                                Get Started for Free
                            </Link>
                            <button onClick={() => navigate('/login')} className="h-14 px-8 bg-white border border-black/10 text-black flex items-center justify-center rounded font-normal hover:bg-black/5 transition-colors w-full sm:w-auto cursor-pointer">
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Right: Floating UI Ecosystem */}
                    <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        {/* Central Hub Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white rounded border border-black/10 shadow-2xl shadow-black/10 p-6 z-20">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5">
                                <div className="flex items-center gap-3 text-left">
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

                        {/* Floating Cards (Simplified for hero impact) */}
                        <div className="absolute top-[15%] left-[10%] w-[260px] bg-white rounded border border-black/10 shadow-xl p-4 z-30 animate-[bounce_6s_infinite_ease-in-out]">
                            <div className="flex items-center gap-3 mb-2 text-left">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-normal text-xs">JD</div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-normal text-black">John Doe</h4>
                                    <p className="text-[10px] text-black/40">Just now</p>
                                </div>
                            </div>
                            <p className="text-xs text-black/70 font-light leading-relaxed text-left">Locked out of enterprise account, need help!</p>
                        </div>

                        <div className="absolute bottom-[10%] right-[5%] w-[280px] bg-white border border-black/10 rounded shadow-xl p-5 z-40 animate-[bounce_7s_infinite_reverse_ease-in-out]">
                            <div className="flex items-center gap-3 mb-3 text-left">
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
                    </div>
                </div>
            </section>

            {/* TECH STACK CAROUSEL */}
            <section className="py-8 lg:py-12 border-y border-black/5 bg-[#F9F9F9] overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-linear-to-r from-[#F9F9F9] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-linear-to-l from-[#F9F9F9] to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee text-[#0A0A0A] opacity-60">
                    <div className="flex items-center gap-8 lg:gap-16 px-8 shrink-0">{techStackItems}</div>
                    <div className="flex items-center gap-8 lg:gap-16 px-8 shrink-0" aria-hidden>{techStackItems}</div>
                    <div className="flex items-center gap-8 lg:gap-16 px-8 shrink-0" aria-hidden>{techStackItems}</div>
                </div>
            </section>

            {/* BENTO GRID PLATFORM SECTION */}
            <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-12 lg:mb-20 max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
                    <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-[#0A0A0A] mb-6">
                        Everything you need.<br />
                        <span className="text-black/40">Nothing you don't.</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-black/60 font-light">
                        Stripped away the clutter of legacy tools to build a lighting-fast platform designed for the modern team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto lg:auto-rows-[320px]">
                    <div className="lg:col-span-2 rounded bg-white border border-black/5 shadow-sm p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-300">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <Inbox className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-normal mb-2">Omnichannel Inbox</h3>
                            <p className="text-black/60 font-light max-w-sm text-sm lg:text-base">Bring emails, live chats, and web forms into one beautifully unified queue. Stop switching tabs.</p>
                        </div>
                        <div className="hidden lg:block absolute -bottom-12 -right-12 w-96 h-48 bg-white border border-black/10 rounded shadow-2xl p-4 -rotate-6 group-hover:-rotate-2 transition-transform duration-500">
                            <div className="space-y-2 flex-1 pt-2">
                                <div className="h-3 w-1/3 bg-black/10 rounded" />
                                <div className="h-2 w-full bg-black/5 rounded" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded bg-[#0A0A0A] text-white p-6 lg:p-8 flex flex-col justify-between overflow-hidden relative group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mb-6">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-normal mb-2">Autonomous AI</h3>
                            <p className="text-white/80 font-light text-sm">Train an agent on your docs. Watch it resolve 80% of tickets automatically.</p>
                        </div>
                    </div>

                    <div className="rounded bg-white border border-black/5 shadow-sm p-6 lg:p-8 flex flex-col justify-between group transition-all duration-300">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-normal mb-2">Live Chat</h3>
                            <p className="text-black/60 font-light text-sm">Deploy a stunning, customizable chat widget to your site in minutes.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded bg-white border border-black/5 shadow-sm p-6 pb-12 lg:p-8 flex flex-col justify-between relative group min-h-[340px] lg:min-h-0 overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-black/5 rounded flex items-center justify-center mb-6 text-black">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-normal text-black mb-2">Agent Workflows & SLAs</h3>
                            <p className="text-black/60 font-light max-w-sm text-sm lg:text-base leading-relaxed">Set up macros, assignment rules, and strict SLA alerts to ensure no customer is left waiting.</p>
                        </div>
                        <div className="relative lg:absolute lg:right-8 lg:bottom-8 mt-10 lg:mt-0 flex flex-col lg:flex-row items-center gap-3 lg:gap-4 group-hover:scale-105 transition-transform duration-500 z-10">
                            <div className="px-3 lg:px-4 py-2 bg-black/5 text-black rounded text-[10px] lg:text-xs font-normal font-mono border border-black/10 whitespace-nowrap shadow-sm">
                                IF Ticket = 'Billing'
                            </div>
                            <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-black/40 shrink-0 rotate-90 lg:rotate-0" />
                            <div className="px-3 lg:px-4 py-2 bg-[#0A0A0A] text-white rounded text-[10px] lg:text-xs font-normal font-mono shadow-xl shadow-black/20 whitespace-nowrap">
                                ASSIGN Team_Finance
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NOTION INTEGRATION SECTION */}
            <section className="py-20 lg:py-32 px-6 bg-[#FAFAFA] border-t border-black/5 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-white text-[10px] lg:text-[11px] font-normal tracking-wide uppercase text-black shadow-sm mx-auto lg:mx-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-3.5 h-3.5 object-contain grayscale" />
                            Knowledge Sync
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            Your docs, <br />
                            instantly alive.
                        </h2>
                        <p className="text-lg lg:text-xl text-black/50 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            Integrates directly with Notion to use your internal docs. Resolve trains its neural model in seconds.
                        </p>
                        <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
                            <button className="h-12 px-6 bg-white border border-black/10 text-black flex items-center gap-3 rounded font-light hover:bg-black/2 transition-colors shadow-sm text-sm">
                                Connect Notion
                                <ArrowRight className="w-4 h-4 text-black/40" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-2xl relative mt-8 lg:mt-0">
                        <div className="relative z-10 w-full max-w-lg mx-auto">
                            <div className="absolute -top-4 lg:-top-6 -right-2 lg:-right-6 z-30 bg-[#0A0A0A] text-white px-3 lg:px-4 py-2 lg:py-3 rounded shadow-2xl border border-white/10 flex items-center gap-3 lg:gap-4 animate-[bounce_5s_infinite_ease-in-out]">
                                <Bot className="w-4 h-4 text-white/50" />
                                <p className="text-xs lg:text-sm font-normal text-white/90">Indexing 1,402 pages</p>
                            </div>

                            <div className="bg-white rounded border border-black/10 shadow-2xl overflow-hidden flex flex-col h-[300px] lg:h-[380px]">
                                <div className="h-10 lg:h-12 border-b border-black/5 flex items-center px-4 gap-2 bg-[#FAFAFA]">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-4 h-4 object-contain" />
                                    <span className="text-[12px] lg:text-sm font-medium text-black/80 font-sans">Acme Corp Workspace</span>
                                </div>
                                <div className="flex-1 p-4 lg:p-5 overflow-hidden bg-white relative">
                                    <div className="space-y-1.5 font-sans text-[12px] lg:text-[13px] text-black/70">
                                        <div className="flex items-center gap-2 py-1.5 px-2 bg-black/5 rounded">
                                            <ChevronDown className="w-3.5 h-3.5 text-black/40" />
                                            <span className="font-medium text-black/90 text-left">Support Wiki</span>
                                        </div>
                                        <div className="pl-6 space-y-1 mt-1 text-left">
                                            <div className="h-6 w-3/4 bg-black/5 rounded animate-pulse" />
                                            <div className="h-6 w-1/2 bg-black/5 rounded animate-pulse delay-75" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-sm bg-blue-100 blur-[80px] rounded-full mix-blend-multiply pointer-events-none -z-10 opacity-50"></div>
                    </div>
                </div>
            </section>

            {/* AI TRAINING SECTION */}
            <section className="py-20 lg:py-32 px-6 border-t border-black/5 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="flex-1 w-full max-w-2xl relative mt-12 lg:mt-0">
                        <div className="bg-[#F9F9F9] rounded-xl border border-black/5 p-6 lg:p-8 pb-0 overflow-hidden relative shadow-inner">
                            <div className="relative z-10 flex flex-col gap-6">
                                <div className="bg-white border border-black/10 rounded shadow-sm p-4 w-full sm:w-5/6 mr-auto relative transform -rotate-1">
                                    <p className="text-xs text-black/70 font-light mb-3 text-left">"Yes, you can do that by toggling the advanced webhook settings..."</p>
                                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                                        <span className="text-[9px] lg:text-[10px] text-black/40 uppercase tracking-widest">Human Override</span>
                                    </div>
                                </div>
                                <div className="bg-[#0A0A0A] border border-black/20 rounded shadow-2xl p-4 lg:p-5 w-full sm:w-5/6 ml-auto text-white relative transform rotate-1 -mb-6 lg:-mb-8">
                                    <div className="flex items-center gap-3 mb-4 text-left">
                                        <Bot className="w-4 h-4 text-white/50" />
                                        <span className="text-xs font-normal">Resolve Engine</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                                        <div className="h-full bg-white/40 w-full rounded-full animate-[shimmer_2s_infinite]" />
                                    </div>
                                    <span className="text-[10px] text-white/60 font-light">New vector added to model</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-black/5 text-[10px] lg:text-[11px] font-normal tracking-wide uppercase text-black mx-auto lg:mx-0">
                            Continuous Learning
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            Gets smarter with<br />
                            every conversation.
                        </h2>
                        <p className="text-lg lg:text-xl text-black/50 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            Neural models that update in real-time by observing how your human experts solve complex edge-cases.
                        </p>
                        <div className="flex flex-col gap-4 lg:gap-5 pt-4 text-left">
                            {[
                                { t: "Human Agent steps in", d: "When AI isn't sure, it hands off to a human." },
                                { t: "Real-time analysis", d: "The engine processes the human's solution structure." },
                                { t: "Permanent upgrade", d: "The AI handles identical future tickets autonomously." }
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-black/60 text-[10px]">{i+1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-normal text-black text-sm mb-1">{step.t}</h4>
                                        <p className="text-sm text-black/50 font-light">{step.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ONE-LINE INTEGRATION */}
            <section className="py-20 lg:py-32 px-6 bg-[#FAFAFA] border-t border-black/5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-black/5 text-[10px] lg:text-[11px] font-normal tracking-wide uppercase text-black mx-auto lg:mx-0">
                            Seamless Deployment
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight text-[#0A0A0A]">
                            One line of code.<br />
                            Ready to resolve.
                        </h2>
                        <p className="text-lg lg:text-xl text-black/50 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            No complex SDKs. Just drop a single script tag and instantly deploy your fully-trained agent.
                        </p>
                    </div>

                    <div className="flex-1 w-full max-w-2xl">
                        <div className="bg-[#0A0A0A] rounded-xl shadow-2xl overflow-hidden border border-black/10">
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-white/40 text-[10px] font-mono">index.html</div>
                            </div>
                            <div className="p-4 lg:p-6">
                                <pre className="p-4 lg:p-6 bg-[#0a0a0a] border border-white/10 rounded font-mono text-[10px] lg:text-[13px] overflow-x-auto whitespace-pre-wrap break-all text-left">
                                    <span className="text-[#555]">{`<!-- Resolve AI Widget -->`}</span>{'\n'}
                                    <span className="text-[#ebebeb]">&lt;</span><span className="text-[#ff6b6b]">script</span>{'\n'}
                                    {'  '}<span className="text-[#00b5e2]">src</span><span className="text-[#ebebeb]">=</span><span className="text-[#af97ec]">"https://resolveai.morelogical.tech"</span>{'\n'}
                                    {'  '}<span className="text-[#00b5e2]">data-id</span><span className="text-[#ebebeb]">=</span><span className="text-[#af97ec]">"Your-Chatbot-Id"</span>{'\n'}
                                    {'  '}<span className="text-[#00b5e2]">defer</span>{'\n'}
                                    <span className="text-[#ebebeb]">&gt;&lt;/</span><span className="text-[#ff6b6b]">script</span><span className="text-[#ebebeb]">&gt;</span>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS SECTION */}
            <section className="py-20 lg:py-24 border-y border-black/5 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {[
                        { label: 'Time to Value', value: 'Minutes' },
                        { label: 'Deflection Rate', value: '65%' },
                        { label: 'Platform Uptime', value: '99.9%' },
                        { label: 'Support UX', value: '10/10' },
                    ].map((metric, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="h-px w-8 bg-black/20" />
                            <span className="text-3xl md:text-5xl font-display font-light text-black tracking-tight">{metric.value}</span>
                            <span className="text-[10px] lg:text-sm font-light text-black/50 uppercase tracking-widest">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 lg:py-40 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-7xl font-display font-light tracking-tight mb-8">
                    Stop answering the<br />same questions.
                </h2>
                <p className="text-lg lg:text-xl text-black/50 font-light mb-10 max-w-xl mx-auto">
                    Give your team the workspace they deserve. Start your 14-day free trial today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/signup" className="h-14 px-8 bg-primary text-white flex items-center justify-center rounded font-light hover:bg-primary/80 transition-all w-full sm:w-auto shadow-xl shadow-black/20 hover:scale-[1.02] cursor-pointer">
                        Get Started for Free
                    </Link>
                    <button onClick={() => navigate('/login')} className="h-14 px-8 bg-transparent text-black border border-black/10 flex items-center justify-center rounded font-light hover:bg-black/5 transition-colors w-full sm:w-auto cursor-pointer">
                        Login
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-8 lg:py-12 px-6 border-t border-black/5 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-display font-light tracking-tight text-xl">
                        ResolveAI
                    </div>
                    <p className="text-xs lg:text-sm font-light text-black/50">
                        © 2026 MoreLogical.tech
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;