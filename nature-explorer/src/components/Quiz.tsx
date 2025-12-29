import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Leaf, CheckCircle, XCircle, Trophy, Target, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import quizData from '../data/quiz.json';
import '../styles/nature-theme.css';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const Quiz: React.FC = () => {
  const { isDark } = useTheme();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  
  useEffect(() => {
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);
  
  const handleOptionSelect = (option: string) => {
    if (answered) return;
    
    setSelectedOption(option);
    setAnswered(true);
    
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
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { text: "Perfect score! You're a plant expert!", icon: <Trophy className="text-amber-500" size={32} /> };
    if (percentage >= 70) return { text: "Well done! You really know your plants!", icon: <Trophy className="text-emerald-500" size={32} /> };
    if (percentage >= 50) return { text: "Good effort! Keep learning about these amazing plants!", icon: <Target className="text-teal-500" size={32} /> };
    return { text: "Keep exploring and learning about plants!", icon: <Leaf className="text-emerald-500" size={32} /> };
  };
  
  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-20">
        <div className={`p-8 text-center rounded-2xl ${
          isDark ? 'bg-slate-800/80 border border-slate-700' : 'bg-white/90 shadow-lg'
        }`}>
          <Leaf className="mx-auto text-emerald-500 animate-spin mb-4" size={48} />
          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  if (showResult) {
    const { text, icon } = getScoreMessage();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="container mx-auto px-4 pt-8 pb-20">
        <div className={`p-8 rounded-2xl max-w-md mx-auto ${
          isDark ? 'bg-slate-800/80 border border-slate-700' : 'bg-white/90 shadow-lg border border-emerald-100'
        }`}>
          <h1 className={`text-3xl font-heading text-center mb-6 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Quiz Results
          </h1>
          
          <div className="text-center mb-8">
            {/* Score Circle */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="8"
                  className={isDark ? 'text-slate-700' : 'text-gray-200'}
                />
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-emerald-500"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / questions.length)}`}
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{percentage}%</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{score}/{questions.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              {icon}
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{text}</p>
            </div>
            
            <div className={`rounded-xl p-4 my-6 ${
              isDark ? 'bg-emerald-900/30 border border-emerald-800/50' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className={`italic text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "The clearest way into the Universe is through a forest wilderness."<br/>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>— John Muir</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className={`rounded-2xl overflow-hidden mb-6 ${
        isDark ? 'bg-slate-800/80 border border-slate-700' : 'bg-white/90 shadow-lg border border-emerald-100'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5">
          <h1 className="text-xl font-heading text-center flex items-center justify-center gap-2">
            <Sparkles size={24} className="text-amber-300" />
            Plants Quiz
          </h1>
          <p className="text-center text-xs mt-1 text-white/80">
            Test your knowledge about Indian plants!
          </p>
        </div>
        
        <div className="p-6">
          {/* Question Progress */}
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium flex items-center gap-1">
              <Trophy className="text-amber-500" size={16} />
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{score}</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className={`h-2 rounded-full overflow-hidden mb-6 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Question */}
          <div className={`px-5 py-4 mb-6 rounded-xl ${
            isDark 
              ? 'bg-emerald-900/30 border border-emerald-800/50' 
              : 'bg-emerald-50 border border-emerald-200'
          }`}>
            <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-600 text-white rounded-full mr-3 text-sm font-bold">
                Q
              </span>
              {currentQuestion.question}
            </h2>
          </div>
          
          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = answered && isCorrect;
              const showIncorrect = answered && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    showCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                      : showIncorrect
                      ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300'
                      : isDark
                      ? 'border-slate-600 hover:border-emerald-500 hover:bg-emerald-900/20 bg-slate-700/50'
                      : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 bg-white'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={answered}
                >
                  <div className="flex items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 border font-medium ${
                      showCorrect ? 'bg-emerald-500 text-white border-emerald-500' :
                      showIncorrect ? 'bg-red-500 text-white border-red-500' :
                      isDark ? 'bg-slate-600 border-slate-500 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
                    }`}>
                      {showCorrect ? <CheckCircle size={18} /> : 
                       showIncorrect ? <XCircle size={18} /> : 
                       ['A', 'B', 'C', 'D'][index]}
                    </span>
                    <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{option}</span>
                  </div>
                  {showCorrect && (
                    <div className="mt-2 text-emerald-600 dark:text-emerald-400 flex items-center text-sm ml-11">
                      <CheckCircle size={16} className="mr-1" />
                      Correct answer!
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="mt-2 text-red-600 dark:text-red-400 flex items-center text-sm ml-11">
                      <XCircle size={16} className="mr-1" />
                      Incorrect answer
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Next Button */}
          <button
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all ${
              answered
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg'
                : isDark
                ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNextQuestion}
            disabled={!answered}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;