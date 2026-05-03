import React from 'react';
import { Link as LinkIcon, Check, Copy, Info } from 'lucide-react';

const InviteResult = ({ inviteUrl, copied, copyToClipboard }) => {
    if (!inviteUrl) return null;

    return (
        <div className="space-y-4 animate-in zoom-in-95 duration-500">
            <div className="p-1 rounded bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between p-4 bg-background rounded border border-border/50 group">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="p-2 rounded bg-surface text-green-500 shrink-0">
                            <LinkIcon size={16} />
                        </div>
                        <div className="truncate flex-1">
                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mb-1">Secure Invitation Link</p>
                            <p className="text-xs font-medium truncate text-foreground/70">{inviteUrl}</p>
                        </div>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className={`
                            ml-4 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-2
                            ${copied ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-surface hover:bg-primary hover:text-white'}
                        `}
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-surface/30 border border-dashed border-border rounded">
                <Info size={16} className="text-foreground/20 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Important Note</p>
                    <p className="text-[10px] text-foreground/30 leading-relaxed">
                        This link is valid for 48 hours and can only be used once. Send it directly to the person you wish to invite.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InviteResult;
