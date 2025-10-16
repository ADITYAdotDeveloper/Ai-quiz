import React, { useState } from 'react';
import type { Participant } from '../types';

interface DetailsScreenProps {
  onSubmit: (details: Participant) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    
    setError('');
    onSubmit({ name, department });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Enter Your Details</h1>
        <p className="text-gray-400 mt-2">We need some information before you start</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter your department"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-required="true"
          />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-400/50"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default DetailsScreen;
