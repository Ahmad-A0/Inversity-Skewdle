import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    AlertCircle,
    CheckCircle,
    PlayCircle,
    TimerReset,
    Info,
    X,
    Trophy,
    Medal,
    Share2,
    BookOpen,
    Settings,
    Volume2,
    VolumeX,
    HelpCircle,
    ArrowLeftCircle,
    Star,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Game } from './components/Game';
import { GameOverDialog } from './components/GameOverDialog';
import { Stats } from './components/Stats';
import { Achievements } from './components/Achievements';
import { TutorialDialog } from './components/TutorialDialog';
import { ArticleText } from './components/ArticleText';

// Game difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: { time: 240, penaltyTime: 10, scoreMultiplier: 1 },
    medium: { time: 180, penaltyTime: 20, scoreMultiplier: 1.5 },
    hard: { time: 120, penaltyTime: 30, scoreMultiplier: 2 },
};

// Sample articles database - in real app, this would be much larger
const ARTICLES = [
    {
        id: 1,
        text: `(Last week) McDonalds corporation bought [starbucks] for ($2 million). The [CEO] of McDonalds said the purchase was [finger lickin' good].`,
        difficulty: 'easy',
        category: 'business',
    },
    {
        id: 2,
        text: `Scientists at [NASA] have discovered ($life on Venus) using their newest [quantum telescope]. The [alien bacteria] were observed [dancing] under the clouds.`,
        difficulty: 'medium',
        category: 'science',
    },
    {
        id: 3,
        text: `In sports news, [Michael Jordan] has come out of retirement to join the ($Los Angeles Lakers) for a record [billion dollar] contract. The [90-year-old] athlete says he's in peak condition.`,
        difficulty: 'hard',
        category: 'sports',
    },
];

const parseArticleText = (text) => {
    const parts = [];
    let currentIndex = 0;
    const regex = /\[.*?\]|\(.*?\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > currentIndex) {
            parts.push({
                type: 'normal',
                content: text.slice(currentIndex, match.index),
            });
        }
        parts.push({
            type: match[0].startsWith('[') ? 'incorrect' : 'maybe',
            content: match[0].slice(1, -1),
            start: match.index,
            end: regex.lastIndex,
            id: `selection-${parts.length}`,
        });
        currentIndex = regex.lastIndex;
    }

    if (currentIndex < text.length) {
        parts.push({ type: 'normal', content: text.slice(currentIndex) });
    }

    return parts;
};

export default function SkewdleGame() {
    // Game state
    const [gameStatus, setGameStatus] = useState('idle'); // idle, active, paused, ended
    const [difficulty, setDifficulty] = useState('medium');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DIFFICULTY_SETTINGS.medium.time);
    const [highScores, setHighScores] = useState(() => {
        const saved = localStorage.getItem('skewdle-highscores');
        return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
    });
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [showTutorial, setShowTutorial] = useState(true);

    // Article state
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
    const [articleParts, setArticleParts] = useState([]);
    const [selectedParts, setSelectedParts] = useState({});
    const [incorrectSelection, setIncorrectSelection] = useState(false);

    // Achievement system
    const [achievements, setAchievements] = useState(() => {
        const saved = localStorage.getItem('skewdle-achievements');
        return saved
            ? JSON.parse(saved)
            : {
                  firstGame: false,
                  perfectGame: false,
                  speedRunner: false,
                  marathoner: false,
                  sharpEye: false,
              };
    });

    // Sound effects
    const sounds = useMemo(
        () => ({
            correct: new Audio('/correct.mp3'),
            incorrect: new Audio('/incorrect.mp3'),
            gameOver: new Audio('/gameover.mp3'),
            achievement: new Audio('/achievement.mp3'),
        }),
        []
    );

    // Initialize game
    useEffect(() => {
        setArticleParts(parseArticleText(ARTICLES[currentArticleIndex].text));
    }, [currentArticleIndex]);

    // Game timer
    useEffect(() => {
        let timer;
        if (gameStatus === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            endGame();
        }
        return () => clearInterval(timer);
    }, [gameStatus, timeLeft]);

    // Save high scores
    useEffect(() => {
        localStorage.setItem('skewdle-highscores', JSON.stringify(highScores));
    }, [highScores]);

    // Save achievements
    useEffect(() => {
        localStorage.setItem(
            'skewdle-achievements',
            JSON.stringify(achievements)
        );
    }, [achievements]);

    const startGame = () => {
        const settings = DIFFICULTY_SETTINGS[difficulty];
        setGameStatus('active');
        setScore(0);
        setTimeLeft(settings.time);
        setSelectedParts({});
        setCurrentArticleIndex(0);
        setCurrentStreak(0);
        setTotalGamesPlayed((prev) => prev + 1);

        // First game achievement
        if (!achievements.firstGame) {
            unlockAchievement('firstGame');
        }
    };

    const endGame = () => {
        setGameStatus('ended');
        if (soundEnabled) sounds.gameOver.play();

        // Update high scores
        const finalScore =
            score * DIFFICULTY_SETTINGS[difficulty].scoreMultiplier;
        if (finalScore > highScores[difficulty]) {
            setHighScores((prev) => ({
                ...prev,
                [difficulty]: finalScore,
            }));
        }

        // Check achievements
        if (score > 100) unlockAchievement('marathoner');
        if (currentStreak > 10) unlockAchievement('sharpEye');
        if (timeLeft > DIFFICULTY_SETTINGS[difficulty].time / 2)
            unlockAchievement('speedRunner');
    };

    const unlockAchievement = (achievementId) => {
        if (!achievements[achievementId]) {
            setAchievements((prev) => ({
                ...prev,
                [achievementId]: true,
            }));
            if (soundEnabled) sounds.achievement.play();
        }
    };

    const handleTextSelection = useCallback(
        (part) => {
            if (gameStatus !== 'active' || selectedParts[part.id]) return;

            const isCorrect = part.type === 'incorrect';
            const settings = DIFFICULTY_SETTINGS[difficulty];

            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
                setCurrentStreak((prev) => prev + 1);
                setBestStreak((prev) => Math.max(prev, currentStreak + 1));
                if (soundEnabled) sounds.correct.play();
            } else {
                setScore((prevScore) => Math.max(0, prevScore - 1));
                setCurrentStreak(0);
                setIncorrectSelection(true);
                setTimeout(() => setIncorrectSelection(false), 1000);
                setTimeLeft((prevTime) =>
                    Math.max(0, prevTime - settings.penaltyTime)
                );
                if (soundEnabled) sounds.incorrect.play();
            }

            setSelectedParts((prev) => ({
                ...prev,
                [part.id]: isCorrect,
            }));

            // Check if all incorrect parts are found in current article
            const allFound = articleParts
                .filter((p) => p.type === 'incorrect')
                .every((p) => selectedParts[p.id]);

            if (allFound) {
                setCurrentArticleIndex((prev) => (prev + 1) % ARTICLES.length);
                setCurrentLevel((prev) => prev + 1);
            }
        },
        [
            gameStatus,
            selectedParts,
            difficulty,
            currentStreak,
            soundEnabled,
            articleParts,
        ]
    );

    const renderArticle = useMemo(() => {
        return articleParts.map((part) => {
            if (part.type === 'normal') {
                return <span key={part.id} className="text-gray-200">{part.content}</span>;
            }

            let className = `
        inline-block px-2 py-1 rounded-md transition-all duration-200 
        cursor-pointer select-none
        bg-gray-700 hover:bg-gray-600 hover:scale-105 hover:z-10 text-gray-200
      `;

            if (part.id in selectedParts) {
                className += selectedParts[part.id]
                    ? ' bg-green-900 hover:bg-green-800'
                    : ' bg-red-900 hover:bg-red-800';
            }

            return (
                <span
                    key={part.id}
                    className={`${className} mb-1`}
                    onClick={() => handleTextSelection(part)}
                    role="button"
                    aria-pressed={part.id in selectedParts}
                    tabIndex={0}
                >
                    {part.content}
                    {part.id in selectedParts &&
                        (selectedParts[part.id] ? (
                            <CheckCircle
                                className="inline-block ml-1 text-green-400"
                                size={16}
                            />
                        ) : (
                            <X
                                className="inline-block ml-1 text-red-400"
                                size={16}
                            />
                        ))}
                </span>
            );
        });
    }, [articleParts, selectedParts, handleTextSelection]);

    return (
        <div
            className={`min-h-screen bg-[#1a1b26] text-gray-200 p-6 font-sans ${
                incorrectSelection ? 'animate-shake' : ''
            }`}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-6xl font-bold text-[#7aa2f7] font-serif">
                        Skewdle
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            {soundEnabled ? (
                                <Volume2 size={24} />
                            ) : (
                                <VolumeX size={24} />
                            )}
                        </button>
                        <Dialog>
                            <DialogTrigger>
                                <HelpCircle size={24} />
                            </DialogTrigger>
                            <DialogContent className="bg-[#1f2335] text-gray-200 border-gray-700">
                                <DialogHeader>
                                    <DialogTitle>How to Play</DialogTitle>
                                </DialogHeader>
                                <TutorialDialog showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Main Game Container */}
                <Game
                    gameStatus={gameStatus}
                    currentLevel={currentLevel}
                    score={score}
                    timeLeft={timeLeft}
                    difficulty={difficulty}
                    startGame={startGame}
                    handleTextSelection={handleTextSelection}
                    renderArticle={<ArticleText articleParts={articleParts} selectedParts={selectedParts} handleTextSelection={handleTextSelection} />}
                />

                {/* Stats & Achievements */}
                <div className="grid grid-cols-2 gap-6">
                    <Stats bestStreak={bestStreak} totalGamesPlayed={totalGamesPlayed} highScores={highScores} currentStreak={currentStreak} />
                    <Achievements achievements={achievements} />
                </div>

                {/* Game Over Dialog */}
                <GameOverDialog gameStatus={gameStatus} score={score} difficulty={difficulty} currentStreak={currentStreak} currentLevel={currentLevel} achievements={achievements} startGame={startGame} />

                {/* Tutorial Dialog */}
                <TutorialDialog showTutorial={showTutorial && gameStatus === 'idle'} setShowTutorial={setShowTutorial} />
            </div>
        </div>
    );
}
