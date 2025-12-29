import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Sparkles, ArrowRight, Leaf, TreeDeciduous, Flower2, Pill } from 'lucide-react';
import plantsData from '../data/plants.json';

// Fun facts for the "Did You Know?" section
const funFacts = [
  "India is home to over 47,000 species of plants, representing about 11% of the world's flora.",
  "The Banyan tree can spread over several acres and live for hundreds of years.",
  "Tulsi is called 'The Queen of Herbs' in Ayurvedic medicine.",
  "Neem has been called 'Nature's Drugstore' due to its numerous medicinal properties.",
  "The Indian Lotus can regulate its temperature like warm-blooded animals."
];

const Home: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(factInterval);
  }, []);

  const plantTypes = Array.from(new Set(plantsData.map(plant => plant.type)));

  const filteredPlants = plantsData.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || plant.type === selectedType;
    return matchesSearch && matchesType;
  });

  const featuredPlants = plantsData.slice(0, 3);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Tree': return <TreeDeciduous size={16} />;
      case 'Medicinal': return <Pill size={16} />;
      case 'Flower': return <Flower2 size={16} />;
      default: return <Leaf size={16} />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-white/90 border border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          <Leaf className="text-emerald-500" size={28} />
          Welcome to Nature Explorer
        </h2>
        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          Explore the beauty and wisdom of Indian plants through our comprehensive guide.
        </p>
      </div>

      {/* Did You Know Section */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-800/50' 
          : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-lg'
      }`}>
        <h3 className={`text-lg font-heading mb-3 flex items-center gap-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
          <Sparkles className="text-amber-500" size={20} />
          Did You Know?
        </h3>
        <p className={`italic transition-opacity duration-500 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {funFacts[currentFact]}
        </p>
        <div className="flex gap-1 mt-3">
          {funFacts.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentFact 
                  ? 'w-6 bg-emerald-500' 
                  : `w-1.5 ${isDark ? 'bg-emerald-700' : 'bg-emerald-200'}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Plants */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-white/90 border border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Featured Plants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {featuredPlants.map(plant => (
            <Link
              key={plant.id}
              to={`/plant/${plant.id}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-2">
                  {getTypeIcon(plant.type)}
                  {plant.type}
                </span>
                <h3 className="text-lg font-semibold text-white">{plant.name}</h3>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-white bg-white/20 backdrop-blur-sm rounded-full p-1" size={24} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Discover Plants Section */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-800/80 border border-slate-700' 
          : 'bg-white/90 border border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Discover Plants
        </h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
            <input
              type="text"
              placeholder="Search plants..."
              className={`w-full p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                isDark 
                  ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-400' 
                  : 'bg-white border border-emerald-200 text-gray-800'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48 relative">
            <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
            <select
              className={`w-full p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer transition-all ${
                isDark 
                  ? 'bg-slate-700 border border-slate-600 text-white' 
                  : 'bg-white border border-emerald-200 text-gray-800'
              }`}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {plantTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2">
              <Leaf className="animate-spin text-emerald-500" size={24} />
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Loading plants...</p>
            </div>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-8">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>No plants found matching your search.</p>
          </div>
        ) : (
          /* Plants Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map(plant => (
              <Link
                key={plant.id}
                to={`/plant/${plant.id}`}
                className={`block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-slate-700/80 border border-slate-600' : 'bg-white border border-gray-100'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/placeholder.jpg';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full shadow-sm ${
                      isDark ? 'bg-slate-800/90 text-emerald-400' : 'bg-white/90 text-emerald-600'
                    }`}>
                      {getTypeIcon(plant.type)}
                      {plant.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {plant.name}
                  </h3>
                  <p className={`text-sm italic mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plant.scientificName}
                  </p>
                  <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plant.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quiz CTA */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-800/50' 
          : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-heading mb-4 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
          Test Your Knowledge
        </h2>
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Put your plant knowledge to the test with our interactive quiz!
        </p>
        <Link 
          to="/quiz" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl"
        >
          Take the Quiz
          <ArrowRight size={18} />
        </Link>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;