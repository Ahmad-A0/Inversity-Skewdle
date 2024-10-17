import React from 'react';
import { PlayCircle } from 'lucide-react';

const StartModal = ({ onStart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Skewdle</h2>
        <p className="text-gray-600 mb-6">Identify inaccuracies in news articles to score points!</p>
        <button
          className="w-full px-4 py-2 text-white font-bold text-lg rounded-lg shadow-md bg-[#0A5E66] hover:bg-[#0A5E66] focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={onStart}
        >
          <PlayCircle className="inline-block mr-2" size={24} />
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartModal;
