import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, FileText } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <header className="sticky top-0 z-50 h-16 border-b border-border bg-background flex items-center justify-between px-4 lg:px-8 gap-4 shadow-sm">
            <div className="min-w-0 flex items-center gap-3">
                <h1 className="text-sm md:text-base font-bold truncate text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                <NavLink
                    to="/dashboard/studio/editor"
                    className="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-primary text-white border border-primary rounded text-xs lg:text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Bot size={14} className="lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Create Bot</span>
                    <span className="sm:hidden">Create</span>
                </NavLink>
                <NavLink
                    to="/dashboard/forms"
                    className="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 bg-surface border border-border rounded text-xs lg:text-sm font-medium hover:bg-surface/70 transition-colors"
                >
                    <FileText size={14} className="lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Manage Forms</span>
                    <span className="sm:hidden">Forms</span>
                </NavLink>
            </div>
        </header>
    );
};

export default DashboardHeader;
