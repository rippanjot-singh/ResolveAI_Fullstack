import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const WelcomeSection = ({ show }) => {
    if (!show) return null;

    return (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors hidden sm:block">
                <Sparkles size={120} />
            </div>
            <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Welcome to ResolveAI</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold tracking-tight text-foreground">Let's build your first AI Agent</h2>
                <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-xl">
                    Your dashboard is currently waiting for data. Start by creating an agent, training it with your knowledge, and embedding it on your site.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <NavLink
                        to="/dashboard/studio/editor"
                        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all text-center"
                    >
                        Create My First Agent
                    </NavLink>
                    <NavLink
                        to="/dashboard/knowledge"
                        className="w-full sm:w-auto px-6 py-2.5 bg-surface border border-border rounded font-medium text-sm hover:bg-surface/50 transition-all text-center"
                    >
                        Setup Knowledge Base
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;
