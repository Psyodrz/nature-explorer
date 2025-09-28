import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import './styles/nature-theme.css';
import leafLeft from './assets/leaf-left.svg';
import leafRight from './assets/leaf-right.svg';
import logo from './assets/nature-explorer-logo.svg';

// Pages
import Home from './components/Home';
import Quiz from './components/Quiz';
import About from './components/About';
import PlantDetail from './components/PlantDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen">
        <header className="header-nature">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center mb-2">
              <img src={logo} alt="Nature Explorer Logo" className="h-12 mr-2" />
              <h1 className="text-3xl text-center">
                <span className="inline-block mr-2">🌿</span>
                Nature Explorer
              </h1>
            </div>
            <p className="text-center text-white/90 mb-4">
              Discover the amazing plants of India
            </p>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <BottomNavigation />
      </div>
    </Router>
  );
};

function BottomNavigation() {
  const location = useLocation();
  
  return (
    <nav className="nav-nature fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-around items-center">
        <Link 
          to="/" 
          className={`btn-nature ${location.pathname === '/' ? 'bg-nature-secondary' : ''} flex flex-col items-center py-2 px-4`}
        >
          <span className="text-xl">🌿</span>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/quiz" 
          className={`btn-nature ${location.pathname === '/quiz' ? 'bg-nature-secondary' : ''} flex flex-col items-center py-2 px-4`}
        >
          <span className="text-xl">🧠</span>
          <span className="text-xs mt-1">Quiz</span>
        </Link>
        <Link 
          to="/about" 
          className={`btn-nature ${location.pathname === '/about' ? 'bg-nature-secondary' : ''} flex flex-col items-center py-2 px-4`}
        >
          <span className="text-xl">ℹ️</span>
          <span className="text-xs mt-1">About</span>
        </Link>
      </div>
    </nav>
  );
}

export default App;
