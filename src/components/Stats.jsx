import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card';

export function Stats({
    bestStreak,
    totalGamesPlayed,
    highScores,
    currentStreak,
}) {
    return (
        <Card className="bg-ft-background border border-ft-gray/20">
            <CardHeader>
                <CardTitle className="font-serif text-ft-black">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-sm text-ft-gray font-serif">Best Streak</div>
                        <div className="text-3xl font-bold text-ft-black font-serif">{bestStreak}</div>
                    </div>
                    <div>
                        <div className="text-sm text-ft-gray font-serif">Games Played</div>
                        <div className="text-3xl font-bold text-ft-black font-serif">
                            {totalGamesPlayed}
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-ft-gray/20 pt-6">
                    <div className="text-sm text-ft-gray font-serif">High Scores</div>
                    <div className="mt-3 space-y-3">
                        {Object.entries(highScores).map(([diff, score]) => (
                            <div
                                key={diff}
                                className="flex justify-between text-lg font-serif"
                            >
                                <span className="capitalize text-ft-text">{diff}:</span>
                                <span className="font-bold text-ft-black">{score}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 border-t border-ft-gray/20 pt-6">
                    <div className="text-sm text-ft-gray font-serif">Current Streak</div>
                    <div className="text-3xl font-bold text-ft-black font-serif">{currentStreak}</div>
                </div>
            </CardContent>
        </Card>
    );
}
