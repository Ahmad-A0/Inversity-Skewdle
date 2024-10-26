import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    CheckCircle,
    X,
} from 'lucide-react';
import { Progress } from 'src/components/ui/progress';
import { Card, CardContent, CardHeader } from 'src/components/ui/card';
import { ArticleText } from './ArticleText'; // Import ArticleText

// Game difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
};

// Sample articles database - in real app, this would be much larger
const ARTICLES = [
    {
        id: 1,
        text: `(Last week) McDonalds corporation bought [starbucks] for ($2 million). The [CEO] of McDonalds said the purchase was [finger lickin' good].`,
        difficulty: 'easy',
        category: 'business',
    },
    {
        id: 2,
        text: `Scientists at [NASA] have discovered ($life on Venus) using their newest [quantum telescope]. The [alien bacteria] were observed [dancing] under the clouds.`,
        difficulty: 'medium',
        category: 'science',
    },
    {
        id: 3,
        text: `In sports news, [Michael Jordan] has come out of retirement to join the ($Los Angeles Lakers) for a record [billion dollar] contract. The [90-year-old] athlete says he's in peak condition.`,
        difficulty: 'hard',
        category: 'sports',
    },
];

const parseArticleText = (text) => {
    const parts = [];
    let currentIndex = 0;
    const regex = /\[.*?\]|\(.*?\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > currentIndex) {
            parts.push({
                type: 'normal',
                content: text.slice(currentIndex, match.index),
            });
        }
        parts.push({
            type: match[0].startsWith('[') ? 'incorrect' : 'maybe',
            content: match[0].slice(1, -1),
            start: match.index,
            end: regex.lastIndex,
            id: `selection-${parts.length}`,
        });
        currentIndex = regex.lastIndex;
    }

    if (currentIndex < text.length) {
        parts.push({ type: 'normal', content: text.slice(currentIndex) });
    }

    return parts;
};

export function Game({
    gameStatus,
    currentLevel,
    score,
    timeLeft,
    difficulty,
    setDifficulty,
    startGame,
    handleTextSelection,
    selectedParts = {}
}) {
    const articleParts = useMemo(() => {
        return parseArticleText(ARTICLES[currentLevel - 1]?.text || '');
    }, [currentLevel]);

    const totalLevels = ARTICLES.length;
    const progress = (currentLevel / totalLevels) * 100;


    return (
        <Card className="mb-6 bg-[#1f2335] border-gray-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">Level {currentLevel}</div>
                        <div className="text-sm text-gray-400">Category: {ARTICLES[currentLevel - 1]?.category}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">{Math.floor(score * DIFFICULTY_SETTINGS[difficulty].scoreMultiplier)}</div>
                        <div className="text-sm text-gray-400">points</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Timer */}
                <div className="mb-4">
                    <Progress value={progress} className="bg-gray-700" />
                    <div className="text-center mt-2">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                </div>

                {/* Article */}
                <div className="text-2xl leading-relaxed mb-6">
                    <ArticleText gameStatus={gameStatus} articleParts={articleParts} selectedParts={selectedParts} handleTextSelection={handleTextSelection} />
                </div>

                {/* Game Controls */}
                {gameStatus === 'idle' && (
                    <div className="space-y-4">
                        <div className="flex justify-center gap-4">
                            {Object.keys(DIFFICULTY_SETTINGS).map((diff) => (
                                <button key={diff} onClick={() => setDifficulty(diff)} className={`px-4 py-2 rounded-lg ${difficulty === diff ? 'bg-[#7aa2f7] text-gray-900' : 'bg-gray-700 text-gray-200'}`}>
                                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button onClick={startGame} className="w-full py-3 bg-[#7aa2f7] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#5d7bc5] transition-colors">Start Game</button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
