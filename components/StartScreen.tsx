import React from 'react';
import { StarIcon, DocumentChartBarIcon } from './Icons';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-md mx-auto text-center p-4 sm:p-0">
      <h1 className="text-5xl font-bold text-violet-400 mb-4">
        AI Knowledge Quiz
      </h1>
      <p className="text-gray-300 mb-10 text-lg">
        Test your ai implementation in textile knowledge with our interactive quiz
      </p>

      <div className="space-y-4 mb-10 text-left">
        <div className="bg-black/30 rounded-xl p-4 flex items-center space-x-4">
          <div className="bg-violet-500/20 p-2 rounded-full flex items-center justify-center">
            <StarIcon />
          </div>
          <div>
            <h2 className="font-semibold text-white">Quick & Easy</h2>
            <p className="text-gray-400 text-sm">3 questions, 2-3 minutes</p>
          </div>
        </div>
        <div className="bg-black/30 rounded-xl p-4 flex items-center space-x-4">
          <div className="bg-violet-500/20 p-2 rounded-full flex items-center justify-center">
            <DocumentChartBarIcon />
          </div>
          <div>
            <h2 className="font-semibold text-white">Instant Results</h2>
            <p className="text-gray-400 text-sm">Get your score and correct answers</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-400/50 shadow-lg shadow-violet-500/20"
      >
        Start Free Quiz
      </button>
    </div>
  );
};

export default StartScreen;