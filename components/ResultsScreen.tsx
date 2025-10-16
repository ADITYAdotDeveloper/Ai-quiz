import React, { useMemo, useEffect, useState } from 'react';
import type { QuizQuestion, Participant, AnswerDetail } from '../types';
import { GOOGLE_SHEET_API_URL } from '../google-sheets-api';


const motivationalQuotes = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
];

// FIX: Added missing ResultsScreenProps interface.
interface ResultsScreenProps {
  questions: QuizQuestion[];
  userAnswers: string[];
  participant: Participant | null;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, userAnswers, participant }) => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const score = useMemo(() => userAnswers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].answer ? 1 : 0);
  }, 0), [userAnswers, questions]);

  const scorePercentage = useMemo(() => (score / questions.length) * 100, [score, questions.length]);

  const detailedAnswers: AnswerDetail[] = useMemo(() => {
    return questions.map((q, index) => ({
      question: q.question,
      selected_option: userAnswers[index] || 'No answer',
      correct: userAnswers[index] === q.answer,
    }));
  }, [questions, userAnswers]);

  const randomQuote = useMemo(() => 
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
    []
  );

  useEffect(() => {
    const submitResults = async () => {
      if (!participant || !GOOGLE_SHEET_API_URL) return;
      
      setSubmissionStatus('submitting');

      try {
        const payload = {
          name: participant.name,
          department: participant.department,
          score: scorePercentage,
          answers: detailedAnswers,
        };

        await fetch(GOOGLE_SHEET_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload),
        });
        
        setSubmissionStatus('success');
      } catch (error) {
        console.error("Failed to submit results:", error);
        setSubmissionStatus('error');
      }
    };

    submitResults();
  }, [participant, scorePercentage, detailedAnswers]);

  const renderSubmissionStatus = () => {
    switch (submissionStatus) {
      case 'submitting':
        return <p className="text-sm text-gray-400 mt-1">Saving results...</p>;
      case 'success':
        return null;
      case 'error':
        return <p className="text-sm text-red-400 mt-1">Failed to save results.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-violet-400">Quiz Complete!</h2>
        <p className="text-gray-200 text-xl mt-2">Well done{participant ? `, ${participant.name}` : ''}!</p>
        <p className="text-5xl font-bold my-4">
          {Math.round(scorePercentage)}%
        </p>
        <p className="text-xl text-gray-300">You got {score} out of {questions.length} questions correct.</p>
        <div className="h-6">{renderSubmissionStatus()}</div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <blockquote className="max-w-xl mx-auto mb-8">
          <p className="text-lg italic text-gray-300">"{randomQuote.quote}"</p>
          <footer className="mt-4 text-md text-violet-400 font-semibold">- {randomQuote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ResultsScreen;