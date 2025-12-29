import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${theme}`}>
          {theme === 'light' ? (
            <Sun size={16} className="icon sun" />
          ) : (
            <Moon size={16} className="icon moon" />
          )}
        </div>
        <div className="toggle-icons">
          <Sun size={12} className="track-icon sun-icon" />
          <Moon size={12} className="track-icon moon-icon" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
