import React, { useMemo } from 'react';
import {
    CheckCircle,
    X,
} from 'lucide-react';

export function ArticleText({articleParts, selectedParts, handleTextSelection, gameStatus}) {
    const renderArticle = useMemo(() => {
        return articleParts.map((part) => {
            if (part.type === 'normal') {
                return <span key={part.id} className="text-ft-text">{part.content}</span>;
            }

            let className = `
                inline-block px-2 py-1 rounded-md transition-all duration-200 
                cursor-pointer select-none font-serif
            `;

            // Base styling for unselected items
            if (part.type === 'incorrect') {
                className += ' bg-ft-background border border-ft-gray/20 hover:bg-ft-gray/10';
            } else {
                className += ' bg-ft-background border border-ft-gray/20 hover:bg-ft-gray/10';
            }

            // Selected items styling
            if (part.id in selectedParts) {
                if (selectedParts[part.id]) {
                    // Correct selection
                    className += ' bg-ft-navy/10 border-ft-navy text-ft-navy hover:bg-ft-navy/20';
                } else {
                    // Incorrect selection
                    className += ' bg-red-100 border-red-300 text-red-700 hover:bg-red-200';
                }
            }

            return (
                <span
                    key={part.id}
                    className={`${className} mb-1`}
                    onClick={() => handleTextSelection(part)}
                    role="button"
                    aria-pressed={part.id in selectedParts}
                    tabIndex={0}
                >
                    {part.content}
                    {part.id in selectedParts &&
                        (selectedParts[part.id] ? (
                            <CheckCircle
                                className="inline-block ml-1 text-ft-navy"
                                size={16}
                            />
                        ) : (
                            <X
                                className="inline-block ml-1 text-red-500"
                                size={16}
                            />
                        ))}
                </span>
            );
        });
    }, [articleParts, selectedParts, handleTextSelection]);

    return (
        <div className={`text-2xl leading-relaxed mb-6 font-serif ${gameStatus === 'idle' ? 'blur-sm' : ''}`}>
            {renderArticle}
        </div>
    )
}
