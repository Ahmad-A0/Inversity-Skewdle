import React from 'react';
import {
    PlayCircle,
    CheckCircle,
    TimerReset,
    Trophy,
    Star, Medal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Achievements({achievements}) {
    return (
        <Card className="bg-[#1f2335] border-gray-700">
            <CardHeader>
                <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        {
                            id: 'firstGame',
                            name: 'First Steps',
                            description: 'Complete your first game',
                            icon: (
                                <PlayCircle
                                    className="text-blue-400"
                                    size={20}
                                />
                            ),
                        },
                        {
                            id: 'perfectGame',
                            name: 'Perfect Eye',
                            description:
                                'Complete a game without any mistakes',
                            icon: (
                                <CheckCircle
                                    className="text-green-400"
                                    size={20}
                                />
                            ),
                        },
                        {
                            id: 'speedRunner',
                            name: 'Speed Reader',
                            description:
                                'Complete a game with over 50% time remaining',
                            icon: (
                                <TimerReset
                                    className="text-yellow-400"
                                    size={20}
                                />
                            ),
                        },
                        {
                            id: 'marathoner',
                            name: 'Marathoner',
                            description:
                                'Score over 100 points in a single game',
                            icon: (
                                <Trophy
                                    className="text-purple-400"
                                    size={20}
                                />
                            ),
                        },
                        {
                            id: 'sharpEye',
                            name: 'Sharp Eye',
                            description:
                                'Achieve a streak of 10 correct identifications',
                            icon: (
                                <Star
                                    className="text-amber-400"
                                    size={20}
                                />
                            ),
                        },
                    ].map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                                achievements[achievement.id]
                                    ? 'bg-gray-800'
                                    : 'bg-gray-900 opacity-50'
                            }`}
                        >
                            {achievement.icon}
                            <div>
                                <div className="font-medium">
                                    {achievement.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {achievement.description}
                                </div>
                            </div>
                            {achievements[achievement.id] && (
                                <Medal
                                    className="ml-auto text-amber-400"
                                    size={20}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
