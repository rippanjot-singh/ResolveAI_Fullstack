import React from 'react';
import { Tag, MessageSquare, Send } from 'lucide-react';

const ResolutionArea = ({ subject, setSubject, response, setResponse, trainAi, setTrainAi, handleResolve, isResolving }) => (
    <div className="bg-background border border-border rounded p-6 shadow-lg shadow-primary/5 space-y-6">
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Tag size={14} />
                    Email Subject
                </label>
            </div>
            <input 
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Resolution subject..."
                className="w-full bg-surface/50 border border-border rounded px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <MessageSquare size={14} />
                    Compose Resolution
                </label>
                <span className="text-[10px] text-foreground/30">Markdown supported</span>
            </div>
            <textarea 
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your response here... Once sent, the ticket will close and we'll move to the next one."
                className="w-full h-48 bg-surface/50 border border-border rounded p-6 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none custom-scrollbar"
            />
        </div>
        <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    id="trainAiFocus"
                    checked={trainAi}
                    onChange={(e) => setTrainAi(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border bg-surface text-primary focus:ring-primary/20 cursor-pointer"
                />
                <label htmlFor="trainAiFocus" className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 cursor-pointer select-none">
                    Use this response to train AI
                </label>
            </div>
            <button 
                onClick={handleResolve}
                disabled={!response.trim() || isResolving}
                className="flex items-center gap-3 px-8 py-3 bg-primary text-white rounded font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none group cursor-pointer"
            >
                {isResolving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                <span>Resolve & Next</span>
            </button>
        </div>
    </div>
);

export default ResolutionArea;
