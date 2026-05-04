import React from 'react';
import { Database } from 'lucide-react';
import { SkeletonWrapper, Skeleton } from '../../../../shared/components/ui/SkeletonWrapper';

const KnowledgeEmptyState = ({ loading, isConnected, connectNotion }) => {
    if (isConnected) return null;

    if (loading) {
        return (
            <SkeletonWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-border rounded p-5 bg-surface/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <Skeleton width={32} height={32} />
                                <Skeleton width={140} height={16} />
                            </div>
                            <Skeleton height={40} />
                            <div className="flex gap-2 pt-2">
                                <Skeleton width={60} height={28} />
                                <Skeleton width={60} height={28} />
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonWrapper>
        );
    }

    return (
        <div className="p-6 md:p-12 border border-dashed border-border rounded bg-surface/20 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded bg-surface flex items-center justify-center border border-border overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-6 h-6 md:w-8 md:h-8 rounded" />
            </div>
            <div>
                <h3 className="text-[clamp(1.125rem,4vw,1.5rem)] font-bold text-foreground">Connect Your Knowledge Base</h3>
                <p className="text-xs md:text-sm text-foreground/50 max-w-md mt-2 mx-auto">
                    Integrate Notion pages to provide your AI with real-time access to company documentation, guides, and data.
                </p>
            </div>
            <button
                onClick={connectNotion}
                className="mt-4 flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-primary text-white rounded text-sm md:text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
                Get Started with Notion
            </button>
        </div>
    );
};

export default KnowledgeEmptyState;
