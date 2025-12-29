import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Home as HomeIcon, Brain, Info, Leaf, Sparkles } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import Scene3D from './components/3d/Scene3D';
import './App.css';
import './styles/nature-theme.css';

// Pages
import Home from './components/Home';
import Quiz from './components/Quiz';
import About from './components/About';
import PlantDetail from './components/PlantDetail';

const HeroSection: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <header className={`hero-section ${isDark ? 'dark' : 'light'}`}>
      <Scene3D />
      <div className="hero-content">
        <div className="hero-top-bar">
          <div className="hero-logo">
            <Leaf className="hero-leaf-icon" size={32} />
            <span className="hero-title">Nature Explorer</span>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="hero-center">
          <h1 className="hero-main-title">
            <Sparkles className="hero-sparkle" size={28} />
            Discover India's Green Heritage
          </h1>
          <p className="hero-subtitle">
            Explore the amazing plants of India — their medicinal uses, cultural significance, and natural beauty
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">47K+</span>
              <span className="stat-label">Plant Species</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">3K+</span>
              <span className="stat-label">Medicinal Plants</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">In Our Guide</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-wave"></div>
    </header>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <HeroSection />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

function BottomNavigation() {
  const location = useLocation();
  const { isDark } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`bottom-nav ${isDark ? 'dark' : ''}`}>
      <Link 
        to="/" 
        className={`nav-link ${isActive('/') ? 'active' : ''}`}
      >
        <HomeIcon size={24} />
        <span>Home</span>
      </Link>
      <Link 
        to="/quiz" 
        className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
      >
        <Brain size={24} />
        <span>Quiz</span>
      </Link>
      <Link 
        to="/about" 
        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
      >
        <Info size={24} />
        <span>About</span>
      </Link>
    </nav>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
