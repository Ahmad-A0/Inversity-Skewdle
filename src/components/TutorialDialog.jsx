import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

export function TutorialDialog({ showTutorial, setShowTutorial }) {
    return (
        <Dialog open={showTutorial}>
            <DialogContent className="bg-[#1f2335] text-gray-200 border-gray-700">
                <DialogHeader>
                    <DialogTitle aria-label="Tutorial Dialog" className="text-2xl">
                        Welcome to{' '}
                        <span className="text-3xl font-bold text-[#7aa2f7] font-serif transition duration-500 hover:transform rotate-12">
                            Skewdle!
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>
                        Train your fact-checking skills by identifying
                        inaccurate information in news articles.
                    </p>
                    <div className="space-y-2">
                        <ul className="list-disc list-inside space-y-1">
                            <li className="items-center gap-2">
                                <span>Items that look like</span>
                                <span className="bg-gray-700 px-2 py-1 mx-1 rounded">
                                    this
                                </span>
                                <span>
                                    Might be incorrect - If they are, click on
                                    them!
                                </span>
                            </li>
                            <li className="items-center gap-2">
                                <span>The</span>
                                <span className="bg-red-400 px-2 py-1 mx-1 rounded">
                                    mistakes
                                </span>
                                <span>
                                    you make look like this, and will cost you
                                    points and time
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold">Tips:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Wrong guesses cost time and points</li>
                            <li>Build streaks for higher scores</li>
                            <li>Complete levels to unlock achievements</li>
                        </ul>
                    </div>
                    <button
                        aria-label="Close Tutorial"
                        onClick={() => setShowTutorial(false)}
                        className="w-full py-2 bg-[#7aa2f7] text-gray-900 rounded-lg font-bold hover:bg-[#5d7bc5] transition-colors"
                    >
                        Got it!
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
