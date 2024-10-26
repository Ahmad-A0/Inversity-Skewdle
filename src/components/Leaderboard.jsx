import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/components/ui/card';
import { Trophy, Medal } from 'lucide-react';

// Placeholder leaderboard data
const LEADERBOARD_DATA = [
    { username: "SkewdleMaster", score: 15420, rank: 1 },
    { username: "NewsDetective", score: 12850, rank: 2 },
    { username: "FactChecker99", score: 11200, rank: 3 },
    { username: "TruthSeeker", score: 9750, rank: 4 },
    { username: "ArticleExpert", score: 8900, rank: 5 },
];

export function Leaderboard() {
    return (
        <Card className="bg-[#1f2335] border-gray-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-yellow-400" size={24} />
                    Global Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div role="list" className="space-y-4">
                    {LEADERBOARD_DATA.map((player) => (
                        <div
                            key={player.username}
                            role="listitem"
                            aria-label={`Rank ${player.rank}: ${player.username} - Score: ${player.score}`}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-800"
                        >
                            <div className="text-2xl font-bold text-gray-400 w-8">
                                {player.rank}
                            </div>
                            {player.rank === 1 && (
                                <Trophy className="text-yellow-400" size={20} />
                            )}
                            {player.rank === 2 && (
                                <Medal className="text-gray-300" size={20} />
                            )}
                            {player.rank === 3 && (
                                <Medal className="text-amber-700" size={20} />
                            )}
                            <div className="flex-1">
                                <div className="font-medium text-lg">
                                    {player.username}
                                </div>
                                <div className="text-sm text-gray-400">
                                    Total Score: {player.score.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
