import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import DetailsScreen from './components/DetailsScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { getRandomQuestions } from './data/quizData';
import type { QuizQuestion, Participant } from './types';

type GameState = 'start' | 'details' | 'quiz' | 'results';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleProceedToDetails = useCallback(() => {
    setGameState('details');
  }, []);

  const handleStartQuiz = useCallback((participantDetails: Participant) => {
    setParticipant(participantDetails);
    const newQuestions = getRandomQuestions(3);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setGameState('quiz');
  }, []);

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    // Prevent adding more answers than there are questions, which can happen with rapid clicks.
    if (userAnswers.length > currentQuestionIndex) {
      return;
    }

    const updatedAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameState('results');
      }
    }, 300); // Small delay to show feedback if any
  }, [currentQuestionIndex, questions.length, userAnswers]);

  const renderGameState = () => {
    switch (gameState) {
      case 'details':
        return <DetailsScreen onSubmit={handleStartQuiz} />;
      case 'quiz':
        return (
          <QuizScreen
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            onSelectAnswer={handleSelectAnswer}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            participant={participant}
            questions={questions}
            userAnswers={userAnswers}
          />
        );
      case 'start':
      default:
        return <StartScreen onStart={handleProceedToDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto">
        <div key={gameState} className="animate-fade-in-up">
          {renderGameState()}
        </div>
      </main>
    </div>
  );
};

export default App;