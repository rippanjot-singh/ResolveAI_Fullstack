import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, FileText } from 'lucide-react';

const DashboardHeader = () => {
    return (
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
    );
};

export default DashboardHeader;
