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
        <Card className="bg-[#1f2335] border-gray-700">
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-sm text-gray-400">Best Streak</div>
                        <div aria-label={`Best Streak: ${bestStreak}`} className="text-3xl font-bold">{bestStreak}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">Games Played</div>
                        <div aria-label={`Games Played: ${totalGamesPlayed}`} className="text-3xl font-bold">
                            {totalGamesPlayed}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm text-gray-400">High Scores</div>
                    <div className="mt-2 space-y-2">
                        {Object.entries(highScores).map(([diff, score]) => (
                            <div
                                key={diff}
                                className="flex justify-between text-lg"
                            >
                                <span className="capitalize">{diff}:</span>
                                <span aria-label={`High Score for ${diff}: ${score}`} className="font-bold">{score}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <div className="text-sm text-gray-400">Current Streak</div>
                    <div aria-label={`Current Streak: ${currentStreak}`} className="text-3xl font-bold">{currentStreak}</div>
                </div>
            </CardContent>
        </Card>
    );
}
