import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../../../../shared/layout/SideNav';

const SettingsLayout = () => {
    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <SideNav />

            <main className="flex-1 flex flex-col min-w-0">
                {/* Standard Module Header */}
                <header className="sticky top-0 z-10 min-h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-8 shrink-0">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg font-bold truncate">System Settings</h1>
                        <p className="text-xs text-foreground/40 truncate">Configure your platform and team workspace</p>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-background">
                    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsLayout;
