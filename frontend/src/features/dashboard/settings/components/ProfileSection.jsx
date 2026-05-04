import React from 'react';
import { User } from 'lucide-react';

const ProfileSection = ({ formData, handleChange, setFormData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Profile Identity</label>
                    <p className="text-xs text-foreground/40 leading-relaxed">This information will be visible to your team members and used by the AI to route tickets.</p>
                </div>
            </div>

            <div className="md:col-span-2 space-y-8">
                <div className="p-6 bg-surface/30 border border-border rounded space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold">Personal Information</h4>
                            <p className="text-[10px] text-foreground/40">Set your display name and role speciality.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/50 ml-1">Display Name</label>
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/50 ml-1">Team Speciality</label>
                            <input 
                                name="speciality"
                                value={formData.speciality}
                                onChange={handleChange}
                                placeholder="e.g. Technical Support, Sales"
                                className="w-full h-10 px-4 bg-background border border-border rounded text-xs focus:border-primary outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded group">
                        <div className="space-y-0.5">
                            <label className="text-xs font-bold group-hover:text-primary transition-colors">Active Ticket Solving</label>
                            <p className="text-[10px] text-foreground/30">Allow the AI to assign new tickets to you based on availability.</p>
                        </div>
                        <button 
                            onClick={() => setFormData(prev => ({ ...prev, isSolviingTickets: !prev.isSolviingTickets }))}
                            className={`w-10 h-5 rounded-full transition-all relative ${formData.isSolviingTickets ? 'bg-primary' : 'bg-foreground/10'}`}
                        >
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.isSolviingTickets ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
