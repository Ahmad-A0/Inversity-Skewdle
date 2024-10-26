import React, { useMemo } from 'react';
import {
    CheckCircle,
    X,
} from 'lucide-react';


export function ArticleText({articleParts, selectedParts, handleTextSelection, gameStatus}) {
    const renderArticle = useMemo(() => {
        return articleParts.map((part) => {
            if (part.type === 'normal') {
                return <span key={part.id} className="text-gray-200">{part.content}</span>;
            }

            let className = `
        inline-block px-2 py-1 rounded-md transition-all duration-200 
        cursor-pointer select-none
        bg-gray-700 hover:bg-gray-600 hover:scale-105 hover:z-10 text-gray-200
      `;

            if (part.id in selectedParts) {
                className += selectedParts[part.id]
                    ? ' bg-green-900 hover:bg-green-800'
                    : ' bg-red-900 hover:bg-red-800';
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
                                className="inline-block ml-1 text-green-400"
                                size={16}
                            />
                        ) : (
                            <X
                                className="inline-block ml-1 text-red-400"
                                size={16}
                            />
                        ))}
                </span>
            );
        });
    }, [articleParts, selectedParts, handleTextSelection]);

    return (
        <div className={`text-2xl leading-relaxed mb-6 ${gameStatus === 'idle' ? 'blur-sm' : ''}`}>
            {renderArticle}
        </div>
    )
}
