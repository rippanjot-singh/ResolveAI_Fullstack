import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

const TreeNode = ({ node, selectedId, onSelect, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    return (
        <div className="select-none">
            <div
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all ${isSelected ? 'bg-primary/10 border-primary/30 text-primary' : 'hover:bg-surface border-transparent'} border`}
                style={{ marginLeft: `${depth * 12}px` }}
                onClick={() => onSelect(node)}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="p-1 hover:bg-foreground/5 rounded transition-colors"
                        onClick={(e) => {
                            if (hasChildren) {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }
                        }}
                    >
                        {hasChildren ? (
                            isOpen ? <ChevronDown size={14} className="text-foreground/40" /> : <ChevronRight size={14} className="text-foreground/40" />
                        ) : (
                            <div className="w-3.5" />
                        )}
                    </div>
                    <FileText size={16} className={isSelected ? 'text-primary' : 'text-foreground/30'} />
                    <span className="text-sm font-medium truncate max-w-[300px]">{node.name}</span>
                </div>
                {isSelected && <CheckCircle2 size={16} className="text-primary" />}
            </div>
            {isOpen && hasChildren && (
                <div className="mt-1">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
