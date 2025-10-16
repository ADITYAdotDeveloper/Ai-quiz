import React, { useState, useEffect, useRef } from 'react';
import type { QuizQuestion } from '../types';

interface QuizScreenProps {
  question: QuizQuestion;
  onSelectAnswer: (answer: string) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onSelectAnswer, currentIndex, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);

  // When the question changes, reset the selection state and focus the heading.
  // This clears the selection highlight and, crucially, removes focus from the
  // previously tapped button, which fixes the "sticky highlight" bug on mobile.
  useEffect(() => {
    setSelectedOption(null);
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [question]);

  if (!question) {
    return <div className="text-center text-xl">Loading question...</div>;
  }

  const handleOptionClick = (option: string) => {
    // Only allow one answer to be selected per question.
    if (selectedOption) {
      return;
    }
    setSelectedOption(option);
    onSelectAnswer(option);
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full">
      <div className="mb-6">
        <p className="text-sm font-semibold text-violet-400">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div
            className="bg-violet-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      <h2 
        ref={questionRef}
        tabIndex={-1}
        className="text-2xl font-semibold text-white mb-8 min-h-[6rem] focus:outline-none"
      >
        {question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isAnswered = selectedOption !== null;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={`
                w-full text-white font-medium py-4 px-4 rounded-lg text-left transition-all duration-200 ease-in-out transform
                focus:outline-none focus:ring-4 focus:ring-violet-500
                ${isSelected ? 'bg-violet-700' : 'bg-gray-700'}
                ${!isAnswered ? 'hover:bg-violet-700 hover:-translate-y-1 active:scale-95' : 'cursor-not-allowed'}
              `}
            >
              <span className={`
                rounded-md px-2.5 py-1 mr-3 font-bold
                ${isSelected ? 'bg-violet-500 text-white' : 'bg-gray-600 text-violet-300'}
              `}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizScreen;