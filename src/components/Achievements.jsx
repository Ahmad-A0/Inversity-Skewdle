import React from 'react';
import {
    PlayCircle,
    CheckCircle,
    TimerReset,
    Trophy,
    Star, 
    Medal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';

export function Achievements({achievements}) {
    return (
        <Card className="bg-ft-background border border-ft-gray/20">
            <CardHeader>
                <CardTitle className="font-serif text-ft-black">Achievements</CardTitle>
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
                                    className="text-ft-navy"
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
                                    className="text-ft-navy"
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
                                    className="text-ft-navy"
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
                                    className="text-ft-navy"
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
                                    className="text-ft-navy"
                                    size={20}
                                />
                            ),
                        },
                    ].map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                                achievements[achievement.id]
                                    ? 'bg-ft-background border-ft-navy/20'
                                    : 'bg-ft-background border-ft-gray/20 opacity-50'
                            }`}
                        >
                            {achievement.icon}
                            <div>
                                <div className="font-medium font-serif text-ft-black">
                                    {achievement.name}
                                </div>
                                <div className="text-sm text-ft-gray">
                                    {achievement.description}
                                </div>
                            </div>
                            {achievements[achievement.id] && (
                                <Medal
                                    className="ml-auto text-ft-navy"
                                    size={20}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
