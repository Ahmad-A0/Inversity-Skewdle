import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Stats({bestStreak, totalGamesPlayed, highScores, currentStreak}) {
    return (
        <Card className="bg-[#1f2335] border-gray-700">
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-400">
                            Best Streak
                        </div>
                        <div className="text-2xl font-bold">
                            {bestStreak}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">
                            Games Played
                        </div>
                        <div className="text-2xl font-bold">
                            {totalGamesPlayed}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">
                            High Scores
                        </div>
                        <div className="space-y-1">
                            {Object.entries(highScores).map(
                                ([diff, score]) => (
                                    <div
                                        key={diff}
                                        className="flex justify-between"
                                    >
                                        <span className="capitalize">
                                            {diff}:
                                        </span>
                                        <span className="font-bold">
                                            {score}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400">
                            Current Streak
                        </div>
                        <div className="text-2xl font-bold">
                            {currentStreak}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
