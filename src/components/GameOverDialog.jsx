import React from 'react';
import {
    Share2, Trophy,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'src/components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from 'src/components/ui/dialog';

const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
};

export function GameOverDialog({gameStatus, score, difficulty, currentStreak, currentLevel, achievements, startGame, articles}) {
    const levelArticles = articles;

    return (
        <Dialog open={gameStatus === 'ended'}>
            <DialogContent className="bg-ft-background text-ft-text border border-ft-gray/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center font-serif text-ft-black">
                        Game Over!
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2 font-serif text-ft-black">
                            {Math.floor(
                                score *
                                    DIFFICULTY_SETTINGS[difficulty]
                                        .scoreMultiplier
                            )}
                        </div>
                        <div className="text-ft-gray font-serif">Final Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-xl font-bold font-serif text-ft-black">
                                {currentStreak}
                            </div>
                            <div className="text-ft-gray font-serif">
                                Final Streak
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold font-serif text-ft-black">
                                {currentLevel}
                            </div>
                            <div className="text-ft-gray font-serif">
                                Levels Completed
                            </div>
                        </div>
                    </div>

                    {/* New achievements */}
                    {Object.entries(achievements)
                        .filter(
                            ([id, unlocked]) =>
                                unlocked &&
                                !localStorage.getItem(`shown-${id}`)
                        )
                        .map(([id, _]) => {
                            localStorage.setItem(`shown-${id}`, 'true');
                            return (
                                <Alert
                                    key={id}
                                    className="bg-ft-background border border-ft-navy/20"
                                >
                                    <Trophy className="text-ft-navy" />
                                    <AlertTitle className="font-serif text-ft-black">
                                        New Achievement!
                                    </AlertTitle>
                                    <AlertDescription className="text-ft-gray">
                                        You've unlocked "{id}"
                                    </AlertDescription>
                                </Alert>
                            );
                        })}

                    {/* Article Links */}
                    <div className="space-y-2">
                        {levelArticles.map((article) => (
                            <a
                                key={article.id}
                                href={`https://www.ft.com/content/${article.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 bg-ft-background border border-ft-gray/20 rounded-lg hover:bg-ft-gray/10 transition-colors text-ft-text font-serif"
                            >
                                Read Article {article.id}
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={startGame}
                            className="flex-1 py-2 bg-ft-navy text-ft-white rounded-lg font-bold hover:bg-ft-navy/90 transition-colors font-serif"
                        >
                            Play Again
                        </button>
                        <button
                            onClick={() => {
                                const text = `I scored ${Math.floor(
                                    score *
                                        DIFFICULTY_SETTINGS[difficulty]
                                            .scoreMultiplier
                                )} points in Skewdle! Can you beat my score?`;
                                navigator.clipboard.writeText(text);
                            }}
                            className="p-2 rounded-lg bg-ft-background border border-ft-gray/20 hover:bg-ft-gray/10 transition-colors text-ft-gray"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
