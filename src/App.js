import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertCircle, CheckCircle, PlayCircle, TimerReset, Info, X } from 'lucide-react';

const sampleText = `(Last week) McDonalds corporation bought [starbucks] for ($2 million). The [CEO] of McDonalds said the purchase was [finger lickin' good].`;

const parseArticleText = (text) => {
  const parts = [];
  let currentIndex = 0;
  const regex = /\[.*?\]|\(.*?\)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push({ type: 'normal', content: text.slice(currentIndex, match.index) });
    }
    parts.push({
      type: match[0].startsWith('[') ? 'incorrect' : 'maybe',
      content: match[0].slice(1, -1),
      start: match.index,
      end: regex.lastIndex,
      id: `selection-${parts.length}`
    });
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push({ type: 'normal', content: text.slice(currentIndex) });
  }

  return parts;
};

export default function SkewdleGame() {
  const [articleParts, setArticleParts] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [gameStatus, setGameStatus] = useState('idle');
  const [selectedParts, setSelectedParts] = useState({});

  useEffect(() => {
    setArticleParts(parseArticleText(sampleText));
  }, []);

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

  const startGame = () => {
    setGameStatus('active');
    setScore(0);
    setTimeLeft(180);
    setSelectedParts({});
  };

  const endGame = () => {
    setGameStatus('ended');
  };

  const handleTextSelection = useCallback((part) => {
    if (gameStatus !== 'active' || selectedParts[part.id]) return;

    const isCorrect = part.type === 'incorrect';
    setScore(prevScore => prevScore + (isCorrect ? 1 : -1));
    setSelectedParts(prev => ({
      ...prev,
      [part.id]: isCorrect
    }));
  }, [gameStatus, selectedParts]);

  const renderArticle = useMemo(() => {
    return articleParts.map((part) => {
      if (part.type === 'normal') {
        return <span key={part.id}>{part.content}</span>;
      }

      let className = 'inline-block px-1 py-0.5 rounded-md transition-all duration-200 ';
      className += 'bg-gray-100 hover:bg-gray-200 hover:scale-105 hover:z-10 ';

      if (part.id in selectedParts) {
        className += selectedParts[part.id] 
          ? 'bg-green-100 hover:bg-green-200 ' 
          : 'bg-red-100 hover:bg-red-200 ';
      }

      return (
        <span
          key={part.id}
          className={className}
          onClick={() => handleTextSelection(part)}
          role="button"
          aria-pressed={part.id in selectedParts}
          tabIndex={0}
        >
          {part.content}
          {part.id in selectedParts && (
            selectedParts[part.id] 
              ? <CheckCircle className="inline-block ml-1 text-[#005f56]" size={16} />
              : <X className="inline-block ml-1 text-[#ff5c5c]" size={16} />
          )}
        </span>
      );
    });
  }, [articleParts, selectedParts, handleTextSelection]);

  return (
    <div className="min-h-screen bg-[#f7ede2] p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2 text-black font-serif">Skewdle</h1>
        <p className="text-lg text-gray-600 mb-6">Identify inaccuracies in news articles</p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Click on text you believe to be inaccurate. Score points for correct identifications!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-[#005f56]">
            Score: {score}
          </div>
          <div className="text-lg font-semibold text-[#0A5E66]">
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>

        {/* Article Container */}
        <div className="mb-6">
          <div className="text-xl leading-relaxed text-[#1f1f1f]">
            {renderArticle}
          </div>
        </div>

        <button
          className={`w-full px-4 py-2 text-white font-bold text-lg rounded-lg shadow-md
            ${gameStatus === 'idle' ? 'bg-[#0A5E66]' : 'bg-gray-500'} 
            hover:bg-[#0A5E66] focus:outline-none focus:ring-2 focus:ring-offset-2`}
          onClick={startGame}
          disabled={gameStatus !== 'idle'}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

