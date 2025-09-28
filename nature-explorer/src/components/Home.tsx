import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import plantsData from '../data/plants.json';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Plants Data:', plantsData);
    console.log('Plant Types:', plantTypes);
    setIsLoading(false);
  }, []);

  // Get unique plant types for filter
  const plantTypes = Array.from(new Set(plantsData.map(plant => plant.type)));

  // Filter plants based on search and type
  const filteredPlants = plantsData.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || plant.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="nature-card p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-heading text-forest-dark mb-4">Welcome to Nature Explorer</h2>
        <p className="text-earth-dark">
          Explore the beauty and wisdom of Indian plants through our comprehensive guide.
        </p>
      </div>

      <div className="nature-card p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-heading text-forest-dark mb-4">Discover Plants</h2>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full p-2 border border-leaf-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full p-2 border border-leaf-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90"
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
            <p className="text-earth-dark">Loading plants...</p>
          </div>
        ) : filteredPlants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-earth-dark">No plants found matching your search.</p>
          </div>
        ) : (
          /* Plants Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map(plant => (
              <Link
                key={plant.id}
                to={`/plant/${plant.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => console.log('Clicked plant:', plant)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', plant.image);
                      e.currentTarget.src = '/assets/placeholder.jpg';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-3 py-1 text-sm bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      {plant.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-forest-dark">{plant.name}</h3>
                  <p className="text-sm italic text-earth-dark/80 mb-2">{plant.scientificName}</p>
                  <p className="text-sm text-earth-dark line-clamp-2">{plant.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="nature-card p-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
        <h2 className="text-2xl font-heading text-forest-dark mb-4">Learn About Nature</h2>
        <p className="text-earth-dark mb-4">
          Test your knowledge about Indian plants and their properties.
        </p>
        <Link to="/quiz" className="btn-nature inline-block">
          Take a Quiz
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