import React from 'react';
import {
    Share2, Trophy,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Game difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
};

export function GameOverDialog({gameStatus, score, difficulty, currentStreak, currentLevel, achievements, startGame}) {
    return (
        <Dialog open={gameStatus === 'ended'}>
            <DialogContent className="bg-[#1f2335] text-gray-200 border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Game Over!
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                            {Math.floor(
                                score *
                                    DIFFICULTY_SETTINGS[difficulty]
                                        .scoreMultiplier
                            )}
                        </div>
                        <div className="text-gray-400">Final Score</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="text-xl font-bold">
                                {currentStreak}
                            </div>
                            <div className="text-gray-400">
                                Final Streak
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {currentLevel}
                            </div>
                            <div className="text-gray-400">
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
                                    className="bg-gray-800 border-amber-400"
                                >
                                    <Trophy className="text-amber-400" />
                                    <AlertTitle>
                                        New Achievement!
                                    </AlertTitle>
                                    <AlertDescription>
                                        You've unlocked "{id}"
                                    </AlertDescription>
                                </Alert>
                            );
                        })}

                    <div className="flex gap-4">
                        <button
                            onClick={startGame}
                            className="flex-1 py-2 bg-[#7aa2f7] text-gray-900 rounded-lg font-bold hover:bg-[#5d7bc5] transition-colors"
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
                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
