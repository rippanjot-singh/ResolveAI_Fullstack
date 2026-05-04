import React from 'react';
import { Bot, Send, Trash2, Minus, X, MessageSquare, ChevronLeft, ChevronRight, User } from 'lucide-react';

const ChatbotPreview = ({ config }) => {
    const { 
        style, 
        greeting = 'Hello! How can I help you today?',
        name = 'AI Assistant',
        faq = []
    } = config;

    const primary = style?.brandColor?.primary || '#158effff';
    const secondary = style?.brandColor?.secondary || '#003ba8ff';
    const accent = style?.brandColor?.accent || '#53d7ffff';
    const bgColor = style?.bgColor || '#ffffff';
    const textColor = style?.textColor || '#000000';
    
    // Extract base hex for shadow/opacity (strip alpha if present)
    const getBase = (color) => (color && color.startsWith('#') && color.length > 7) ? color.substring(0, 7) : color;
    const pBase = getBase(primary);
    const sBase = getBase(style?.senderStyle?.bgColor || primary);

    const winRadius = style?.corner === 'square' ? '0px' : '20px';
    const avatarRad = style?.icon === 'square' ? '4px' : '50%';
    const chipRadius = style?.corner === 'square' ? '0px' : '20px';

    const isBubbleBot = style?.replyStyle?.replyType === 'bubble';
    const isBubbleUser = style?.senderStyle?.senderType === 'bubble';

    return (
        <div className="w-full h-[650px] bg-zinc-100 dark:bg-zinc-900/50 rounded border border-border flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* The Chat Window Replica */}
            <div 
                className="w-[360px] h-[580px] flex flex-col shadow-2xl overflow-hidden transition-all duration-300"
                style={{ 
                    backgroundColor: bgColor, 
                    color: textColor,
                    borderRadius: winRadius,
                    border: '1px solid rgba(0,0,0,0.08)',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
            >
                {/* Chat Header */}
                <div 
                    className="flex items-center justify-between px-4 py-3.5 shrink-0"
                    style={{ backgroundColor: primary, color: '#ffffff' }}
                >
                    <div className="flex items-center gap-2.5">
                        <div 
                            className="w-9 h-9 flex items-center justify-center shrink-0 border-[1.5px] border-white/30 bg-white/18"
                            style={{ borderRadius: avatarRad }}
                        >
                            <Bot size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-bold leading-tight">{name}</div>
                            <div className="flex items-center gap-1.5 text-[11px] opacity-90 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                                Online
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-70">
                        <Trash2 size={15} className="p-1 hover:bg-white/15 rounded cursor-pointer" />
                        <Minus size={15} className="p-1 hover:bg-white/15 rounded cursor-pointer" />
                        <X size={17} className="p-1 hover:bg-white/15 rounded cursor-pointer" />
                    </div>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ backgroundColor: bgColor }}>
                    {/* Bot Message */}
                    <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[82%] items-start">
                            <div 
                                className="w-[26px] h-[26px] flex items-center justify-center shrink-0 mt-1"
                                style={{ 
                                    borderRadius: avatarRad,
                                    backgroundColor: style?.replyStyle?.bgColor === 'transparent' ? 'transparent' : style?.replyStyle?.bgColor,
                                    color: style?.replyStyle?.textColor
                                }}
                            >
                                <Bot size={16} />
                            </div>
                            <div 
                                className={`text-[13.5px] leading-[1.55] p-[10px_14px] ${isBubbleBot ? '' : 'bg-transparent border-none p-[6px_0]'}`}
                                style={{ 
                                    color: isBubbleBot ? style?.replyStyle?.textColor : textColor,
                                    backgroundColor: isBubbleBot ? (style?.replyStyle?.bgColor === 'transparent' ? pBase + '11' : style?.replyStyle?.bgColor) : 'transparent',
                                    borderRadius: isBubbleBot ? '2px 16px 16px 16px' : '0',
                                    border: isBubbleBot ? `1px solid ${pBase}18` : 'none'
                                }}
                            >
                                {greeting}
                            </div>
                        </div>
                    </div>

                    {/* User Message Sample */}
                    <div className="flex justify-end">
                        <div className="flex flex-row-reverse gap-2 max-w-[82%] items-start">
                            <div 
                                className="w-[26px] h-[26px] flex items-center justify-center shrink-0 mt-1"
                                style={{ 
                                    borderRadius: avatarRad,
                                    backgroundColor: style?.senderStyle?.bgColor,
                                    color: style?.senderStyle?.textColor
                                }}
                            >
                                <span className="text-[11px] font-bold"><User size={14} /></span>
                            </div>
                            <div 
                                className={`text-[13.5px] leading-[1.55] p-[10px_14px] ${isBubbleUser ? '' : 'bg-transparent border-none p-[6px_0]'}`}
                                style={{ 
                                    color: isBubbleUser ? style?.senderStyle?.textColor : style?.senderStyle?.bgColor,
                                    backgroundColor: isBubbleUser ? style?.senderStyle?.bgColor : 'transparent',
                                    borderRadius: isBubbleUser ? '16px 2px 16px 16px' : '0',
                                    boxShadow: isBubbleUser ? `0 4px 12px ${sBase}44` : 'none'
                                }}
                            >
                                How do I get started?
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Footer */}
                <div className="p-3 border-t border-black/5 shrink-0" style={{ backgroundColor: bgColor }}>
                    {/* FAQ Preview */}
                    {faq.length > 0 && (
                        <div className="flex gap-2 overflow-x-hidden mb-3 items-center">
                            <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shrink-0"><ChevronLeft size={14} /></div>
                            <div className="flex gap-2 overflow-hidden flex-1 py-1">
                                {faq.slice(0, 2).map((f, i) => (
                                    <div 
                                        key={i} 
                                        className="px-3 py-1.5 border whitespace-nowrap text-[12px] font-medium transition-colors"
                                        style={{ 
                                            borderRadius: chipRadius,
                                            borderColor: primary,
                                            color: primary
                                        }}
                                    >
                                        {f.question}
                                    </div>
                                ))}
                            </div>
                            <div className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shrink-0"><ChevronRight size={14} /></div>
                        </div>
                    )}

                    <div className="relative flex items-center">
                        <input 
                            disabled
                            className="w-full pl-4 pr-12 py-[11px] bg-black/3 border-[1.5px] border-black/10 rounded-[12px] text-[13.5px] outline-none"
                            placeholder="Type a message..."
                            style={{ color: textColor }}
                        />
                        <div 
                            className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-[9px]"
                            style={{ backgroundColor: primary, color: '#ffffff' }}
                        >
                            <Send size={15} />
                        </div>
                    </div>
                    <div className="text-center text-[10.5px] mt-2 opacity-40 font-medium">Powered by Resolve AI</div>
                </div>
            </div>

            {/* Floating Widget Toggle Button Replica */}
            <div 
                className="absolute bottom-6 right-6 w-[56px] h-[56px] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                style={{ 
                    backgroundColor: primary, 
                    color: '#ffffff',
                    borderRadius: avatarRad,
                    // boxShadow: `0 8px 30px ${pBase}77`
                }}
            >
                <MessageSquare size={22} />
            </div>
        </div>
    );
};

export default ChatbotPreview;
