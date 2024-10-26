import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Progress } from 'src/components/ui/progress';
import { Card, CardContent, CardHeader } from 'src/components/ui/card';
import { ArticleText } from './ArticleText'; // Import ArticleText

// Game difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
    flawless: { time: 100, penaltyTime: 100, scoreMultiplier: 3 },
};

// Sample articles database - in real app, this would be much larger
const ARTICLES = [
    {
        id: 1,
        title: "Tech Giants Reshape Silicon Valley's Real Estate Market",
        text: `(Apple Inc) has announced plans to convert its ($16 billion) campus into shared workspace. The [Google-owned] property will feature [underwater meeting rooms] and (automated robot security) by next quarter. The company's [CEO Tim Cook] cited [decreasing office demand] as the primary motivation.`,
        difficulty: 'easy',
        category: 'technology',
        link: 'https://www.ft.com/content/tech-giants-reshape-valley'
    },
    {
        id: 2,
        title: "Revolutionary Breakthrough in Sustainable Aviation",
        text: `British Airways has successfully tested (algae-based jet fuel) in a (commercial flight from London to New York). The [solar-powered] aircraft achieved [supersonic speeds] while reducing emissions by [95%]. The (£2.3 billion) project marks a significant milestone in green aviation.`,
        difficulty: 'medium',
        category: 'science',
        link: 'https://www.ft.com/content/sustainable-aviation-breakthrough'
    },
    {
        id: 3,
        title: "Global Financial Markets Face Historic Shift",
        text: `The [European Central Bank] has announced a partnership with [Amazon] to launch a (digital Euro) by [2024]. The unprecedented move saw (Switzerland's stock market) suspend trading for (72 hours) while [crypto markets] experienced [1000%] growth. [Christine Lagarde] called it "the future of banking."`,
        difficulty: 'hard',
        category: 'finance',
        link: 'https://www.ft.com/content/global-markets-shift'
    },
    {
        id: 4,
        title: "Art Market Disruption: Traditional Galleries Face Digital Revolution",
        text: `The (Louvre Museum) has generated (€300 million) through its first [blockchain-based] art auction. The [AI-created] masterpieces sold for [triple] the price of traditional artwork. Leading galleries are now [replacing physical locations] with (virtual reality exhibitions) that attracted (2.3 million visitors) last month.`,
        difficulty: 'medium',
        category: 'arts',
        link: 'https://www.ft.com/content/art-market-disruption'
    }
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
        <Card className="mb-6 bg-[#1f2335] border-gray-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="text-2xl font-bold">
                            Level {currentLevel}
                        </div>
                        <div className="text-sm text-gray-400">
                            Category: {ARTICLES[currentLevel - 1]?.category}
                        </div>
                    </div>
                    <div className="text-right">
                        <div aria-label={`Current score: ${Math.floor(
                                score *
                                    DIFFICULTY_SETTINGS[difficulty]
                                        .scoreMultiplier
                            )}`} className="text-3xl font-bold">
                            {Math.floor(
                                score *
                                    DIFFICULTY_SETTINGS[difficulty]
                                        .scoreMultiplier
                            )}
                        </div>
                        <div className="text-sm text-gray-400">points</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Timer */}
                <div className="mb-4">
                    <Progress role="progressbar" value={progress} className="bg-gray-700" />
                    <div aria-live="polite" className="text-center mt-2">
                        {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>

                {/* Article */}
                <div className="text-2xl leading-relaxed mb-6">
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
                                    aria-label={`Select ${diff} difficulty`}
                                    onClick={() => setDifficulty(diff)}
                                    className={`px-4 py-2 rounded-lg ${
                                        difficulty === diff
                                            ? 'bg-[#7aa2f7] text-gray-900'
                                            : 'bg-gray-700 text-gray-200'
                                    }`}
                                >
                                    {diff.charAt(0).toUpperCase() +
                                        diff.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button
                            aria-label="Start Game"
                            onClick={startGame}
                            className="w-full py-3 bg-[#7aa2f7] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#5d7bc5] transition-colors"
                        >
                            Start Game
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
