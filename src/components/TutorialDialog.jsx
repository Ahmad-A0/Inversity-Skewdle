import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'src/components/ui/dialog';

export function TutorialDialog({showTutorial, setShowTutorial}) {
    return (
        <Dialog open={showTutorial}>
            <DialogContent className="bg-ft-background text-ft-text border border-ft-gray/20">
                <DialogHeader>
                    <DialogTitle className="font-serif text-ft-black text-2xl">Welcome to Skewdle!</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="font-serif">
                        Train your fact-checking skills by identifying
                        inaccurate information in news articles.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="bg-ft-background border border-ft-gray/20 px-3 py-1.5 rounded font-serif">
                                [text]
                            </span>
                            <span className="text-ft-gray">
                                Might be incorrect - click to identify
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-ft-background border border-ft-gray/20 px-3 py-1.5 rounded font-serif">
                                (text)
                            </span>
                            <span className="text-ft-gray">
                                Needs verification - be careful!
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3 border-t border-ft-gray/20 pt-4">
                        <p className="font-bold font-serif text-ft-black">Tips:</p>
                        <ul className="list-disc list-inside space-y-2 text-ft-gray">
                            <li>Wrong guesses cost time and points</li>
                            <li>Build streaks for higher scores</li>
                            <li>
                                Complete levels to unlock achievements
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setShowTutorial(false)}
                        className="w-full py-3 bg-ft-navy text-ft-white rounded-lg font-bold hover:bg-ft-navy/90 transition-colors font-serif"
                    >
                        Got it!
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
