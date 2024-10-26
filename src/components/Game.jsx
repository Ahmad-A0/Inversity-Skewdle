import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Progress } from 'src/components/ui/progress';
import { Card, CardContent, CardHeader } from 'src/components/ui/card';
import { ArticleText } from './ArticleText';

const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
};

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
    selectedParts = {},
}) {
    const articleParts = useMemo(() => {
        return parseArticleText(ARTICLES[currentLevel - 1]?.text || '');
    }, [currentLevel]);

    const totalLevels = ARTICLES.length;
    const progress =
        gameStatus == 'ended' ? 100 : ((currentLevel - 1) / totalLevels) * 100;

    return (
        <Card className="mb-6 bg-ft-background border border-ft-gray/20">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="text-2xl font-bold text-ft-black font-serif">
                            Level {currentLevel}
                        </div>
                        <div className="text-sm text-ft-gray font-serif">
                            Category: {ARTICLES[currentLevel - 1]?.category}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-ft-black font-serif">
                            {Math.floor(
                                score *
                                    DIFFICULTY_SETTINGS[difficulty]
                                        .scoreMultiplier
                            )}
                        </div>
                        <div className="text-sm text-ft-gray font-serif">points</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Timer */}
                <div className="mb-4">
                    <Progress 
                        value={progress} 
                        className="bg-ft-gray/20" 
                        indicatorClassName="bg-ft-navy"
                    />
                    <div className="text-center mt-2 text-ft-gray font-serif">
                        {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>

                {/* Article */}
                <div className="text-2xl leading-relaxed mb-6 text-ft-text font-serif">
                    <ArticleText
                        gameStatus={gameStatus}
                        articleParts={articleParts}
                        selectedParts={selectedParts}
                        handleTextSelection={handleTextSelection}
                    />
                </div>

                {/* Game Controls */}
                {gameStatus === 'idle' && (
                    <div className="space-y-4">
                        <div className="flex justify-center gap-4">
                            {Object.keys(DIFFICULTY_SETTINGS).map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => setDifficulty(diff)}
                                    className={`px-4 py-2 rounded-lg font-serif ${
                                        difficulty === diff
                                            ? 'bg-ft-navy text-ft-white'
                                            : 'bg-ft-gray/20 text-ft-text hover:bg-ft-gray/30'
                                    }`}
                                >
                                    {diff.charAt(0).toUpperCase() +
                                        diff.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={startGame}
                            className="w-full py-3 bg-ft-navy text-ft-white rounded-lg font-bold text-lg hover:bg-ft-navy/90 transition-colors font-serif"
                        >
                            Start Game
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
