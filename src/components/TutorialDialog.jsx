import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export function TutorialDialog({showTutorial, setShowTutorial}) {
    return (
        <Dialog open={showTutorial}>
            <DialogContent className="bg-[#1f2335] text-gray-200 border-gray-700">
                <DialogHeader>
                    <DialogTitle>Welcome to Skewdle!</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>
                        Train your fact-checking skills by identifying
                        inaccurate information in news articles.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-700 px-2 py-1 rounded">
                                [text]
                            </span>
                            <span>
                                Might be incorrect - click to identify
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-700 px-2 py-1 rounded">
                                (text)
                            </span>
                            <span>
                                Needs verification - be careful!
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold">Tips:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Wrong guesses cost time and points</li>
                            <li>Build streaks for higher scores</li>
                            <li>
                                Complete levels to unlock achievements
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setShowTutorial(false)}
                        className="w-full py-2 bg-[#7aa2f7] text-gray-900 rounded-lg font-bold hover:bg-[#5d7bc5] transition-colors"
                    >
                        Got it!
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
