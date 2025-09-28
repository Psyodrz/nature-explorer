import React, { useState, useEffect } from 'react';
import quizData from '../data/quiz.json';
import '../styles/nature-theme.css';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  
  useEffect(() => {
    // Load and shuffle quiz data
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);
  
  const handleOptionSelect = (option: string) => {
    if (answered) return;
    
    setSelectedOption(option);
    setAnswered(true);
    
    // Check if answer is correct
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };
  
  const resetQuiz = () => {
    // Reshuffle questions for a new quiz
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };
  
  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-20">
        <div className="leaf-border p-8 text-center">
          <span className="block text-4xl mb-4">🌿</span>
          <p className="font-body text-forest-dark">Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  if (showResult) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-20">
        <div className="leaf-border p-8 rounded-lg max-w-md mx-auto">
          <h1 className="text-3xl font-heading text-center text-primary mb-6">Quiz Results</h1>
          
          <div className="text-center mb-8">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-leaf-light/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-heading text-forest-dark">
                  {score}/{questions.length}
                </span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#E0E0E0" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#4CAF50" 
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - score / questions.length)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <p className="font-body text-earth-dark text-lg mb-4">
              {score === questions.length
                ? 'Perfect score! You\'re a plant expert! 🌿👑'
                : score >= questions.length / 2
                ? 'Well done! You know your plants! 🌱'
                : 'Keep learning about these amazing plants! 🍃'}
            </p>
            
            <div className="rounded-lg bg-leaf-light/20 p-4 my-6 border border-leaf-light/40">
              <p className="font-body text-forest-dark italic text-center">
                "The clearest way into the Universe is through a forest wilderness." <br/>— John Muir
              </p>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="nature-button w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="leaf-border p-0 pb-0 mb-6">
        <div className="bg-forest-dark text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-heading text-center">Plants Quiz</h1>
          <p className="text-center font-body text-xs mt-1 text-white/80">
            Test your knowledge about Indian plants!
          </p>
        </div>
        
        <div className="p-6">
          {/* Question Progress */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body text-earth-dark">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium font-body">
              Score: <span className="text-primary">{score}</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Question */}
          <div className="leaf-side-border px-6 py-4 mb-6 rounded-lg bg-leaf-light/10 border border-leaf-light/30">
            <h2 className="text-lg font-medium font-body mb-1 text-forest-dark">
              <span className="inline-block w-7 h-7 bg-forest-dark text-white rounded-full mr-2 text-center leading-7 font-bold">Q</span>
              {currentQuestion.question}
            </h2>
          </div>
          
          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border font-body transition-colors ${
                  selectedOption === option
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : answered && option === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'border-gray-300 hover:border-primary hover:bg-leaf-light/10'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full mr-3 bg-white border border-current text-center font-medium">
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                  {option}
                </div>
                {selectedOption === option && option === currentQuestion.correctAnswer && (
                  <div className="mt-2 text-green-600 flex items-center">
                    <span className="text-xl mr-2">✓</span>
                    <span className="text-sm">Correct answer!</span>
                  </div>
                )}
                {selectedOption === option && option !== currentQuestion.correctAnswer && (
                  <div className="mt-2 text-red-600 flex items-center">
                    <span className="text-xl mr-2">✗</span>
                    <span className="text-sm">Incorrect answer</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Next Button */}
          <button
            className={`nature-button w-full ${!answered ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextQuestion}
            disabled={!answered}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 