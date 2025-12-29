import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sprout, Leaf, Languages, Brain, Search, 
  Globe, BookOpen, Heart, Sparkles, Shield
} from 'lucide-react';
import '../styles/nature-theme.css';

const About: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <h1 className={`text-3xl font-heading text-center mb-6 relative ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
        About Nature Explorer
        <span className="block h-1 w-24 bg-emerald-500 mx-auto mt-2 rounded-full"></span>
      </h1>
      
      {/* Mission Card */}
      <div className={`p-6 rounded-2xl mb-6 ${
        isDark 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-white/90 border border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          <Globe className="text-emerald-500" size={28} />
          Our Mission
        </h2>
        <p className={`font-body mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Nature Explorer is dedicated to promoting awareness about the rich botanical heritage of India. 
          Our mission is to help people of all ages learn about and appreciate the diverse plant life 
          that forms an integral part of Indian culture, medicine, and ecosystem.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Features */}
          <div className="flex-1">
            <h2 className={`text-xl font-heading mb-3 flex items-center gap-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              <Sparkles className="text-amber-500" size={22} />
              Features
            </h2>
            <ul className="space-y-2">
              {[
                { icon: Sprout, text: 'Explore a collection of common Indian plants', color: 'emerald' },
                { icon: Leaf, text: 'Learn about their medicinal uses and cultural significance', color: 'emerald' },
                { icon: Languages, text: 'Read descriptions in both English and Hindi', color: 'blue' },
                { icon: Brain, text: 'Test your knowledge with our plant quiz', color: 'purple' },
                { icon: Search, text: 'Search and filter plants by category', color: 'amber' },
              ].map((item, index) => (
                <li 
                  key={index}
                  className={`flex items-start p-3 rounded-xl ${
                    isDark 
                      ? 'bg-slate-700/50 border border-slate-600' 
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <item.icon className={`mr-3 mt-0.5 flex-shrink-0 text-${item.color}-500`} size={18} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Offline & Educational */}
          <div className="flex-1 space-y-4">
            <div className={`p-4 rounded-xl ${
              isDark 
                ? 'bg-blue-900/30 border border-blue-800/50' 
                : 'bg-blue-50 border border-blue-100'
            }`}>
              <h2 className={`text-lg font-heading mb-2 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                <Globe className="text-blue-500" size={20} />
                Offline App
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                This application works completely offline, making it accessible in areas with limited internet connectivity.
              </p>
            </div>
            
            <div className={`p-4 rounded-xl ${
              isDark 
                ? 'bg-indigo-900/30 border border-indigo-800/50' 
                : 'bg-indigo-50 border border-indigo-100'
            }`}>
              <h2 className={`text-lg font-heading mb-2 flex items-center gap-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                <BookOpen className="text-indigo-500" size={20} />
                Educational Purpose
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Created for educational purposes to promote knowledge about indigenous plant species and their significance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conservation Section */}
      <div className={`p-6 rounded-2xl mb-6 ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-800/50' 
          : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          <Shield className="text-emerald-500" size={28} />
          Conservation Focus
        </h2>
        <p className={`font-body leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Many of India's native plants are facing threats from habitat loss, climate change, and overexploitation. 
          By learning about these plants, we hope to inspire conservation efforts and sustainable practices.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { number: '47K+', label: 'Plant Species', color: 'emerald' },
            { number: '3K+', label: 'Medicinal Plants', color: 'amber' },
            { number: '1.7K+', label: 'Endangered', color: 'red' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl text-center ${
                isDark 
                  ? 'bg-slate-800/60 border border-slate-700' 
                  : 'bg-white/80 border border-gray-100 shadow-sm'
              }`}
            >
              <div className={`text-2xl md:text-3xl font-bold text-${stat.color}-500`}>
                {stat.number}
              </div>
              <div className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technical & Footer */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-white/90 border border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-heading mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Technical Details
        </h2>
        <p className={`font-body leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Built with React, TypeScript, and React Three Fiber for immersive 3D effects. 
          Designed mobile-first for a responsive experience across all devices.
        </p>
        
        <div className={`pt-4 border-t ${isDark ? 'border-slate-700' : 'border-emerald-100'}`}>
          <p className={`text-center font-body italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            "In every walk with nature one receives far more than he seeks." — John Muir
          </p>
          <p className={`text-center mt-3 text-sm flex items-center justify-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Nature Explorer v2.0 | Made with <Heart className="text-red-500" size={14} /> for plant enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;