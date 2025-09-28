import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import plantsData from '../data/plants.json';
import '../styles/nature-theme.css';

type PlantParams = {
  id: string;
};

type Use = {
  type: string;
  description: {
    english: string;
    hindi: string;
  };
};

type Plant = {
  id: number;
  name: string;
  scientificName: string;
  type: string;
  image: string;
  nativeRegion: string;
  habitat: string;
  shortDescription: string;
  description: {
    english: string;
    hindi: string;
  };
  uses: string[];
};

const PlantDetail: React.FC = () => {
  const { id } = useParams<PlantParams>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the plant by ID
    const plantById = plantsData.find((p) => p.id === Number(id));
    
    if (plantById) {
      // Cast the plant data to ensure it has all required properties
      setPlant(plantById as Plant);
    }
    setLoading(false);
  }, [id]);
  
  // Helper function to determine plant icon
  const getPlantIcon = (type: string) => {
    switch(type) {
      case 'Tree': return '🌳';
      case 'Medicinal': return '🌿';
      case 'Flower': return '🌸';
      default: return '🌱';
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  // Translation function (simplified)
  const t = (key: string) => {
    const translations: {[key: string]: string} = {
      'back': 'Back',
      'type': 'Type',
      'native': 'Native Region',
      'grows': 'Habitat',
      'uses': 'Uses & Benefits',
      'cultivation': 'Cultivation Tips',
      'water': 'Water Needs',
      'sunlight': 'Sunlight',
      'climate': 'Climate',
      'not_found': 'Plant Not Found',
      'not_found_desc': 'We couldn\'t find the plant you\'re looking for.',
      'explore': 'Explore Other Plants'
    };
    return translations[key] || key;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="loader"></div>
      </div>
    );
  }
  
  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="leaf-border p-8">
          <p className="text-forest-dark font-body mb-6">Plant not found.</p>
          <button 
            onClick={() => navigate('/')}
            className="nature-button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="leaf-border p-0 pb-0 overflow-hidden">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-white/80 backdrop-blur-sm text-primary font-body p-2 rounded-full shadow-md hover:bg-white transition-all"
          >
            <span>←</span>
          </button>
        </div>
        
        {/* Plant Image */}
        <div className="w-full h-64 md:h-80 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10"></div>
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <span className="px-3 py-1 bg-leaf-dark text-white rounded-full text-sm font-body inline-flex items-center shadow-md">
              {getPlantIcon(plant.type)} <span className="ml-1">{plant.type}</span>
            </span>
            <h1 className="text-3xl font-heading text-white mt-2 drop-shadow-md">{plant.name}</h1>
            <p className="text-sm italic font-serif text-white/90 drop-shadow-md">{plant.scientificName}</p>
          </div>
        </div>
        
        {/* Plant Info */}
        <div className="p-6">
          {/* Language Switcher */}
          <div className="flex gap-3 mb-6">
            <button
              className={`px-4 py-2 text-sm border rounded-full font-body transition-colors ${
                language === 'english' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-earth-dark border-earth-light hover:bg-leaf-light/20'
              }`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
            <button
              className={`px-4 py-2 text-sm border rounded-full font-body transition-colors ${
                language === 'hindi' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-earth-dark border-earth-light hover:bg-leaf-light/20'
              }`}
              onClick={() => setLanguage('hindi')}
            >
              हिंदी
            </button>
          </div>
          
          {/* Description */}
          <div className="mb-6 leaf-side-border px-4 pt-4 pb-1 rounded-lg bg-leaf-light/10 border border-leaf-light/30">
            <h2 className="text-2xl font-heading text-forest-dark mb-3">Description</h2>
            <p className="font-body text-earth-dark leading-relaxed">
              {plant.description[language]}
            </p>
          </div>
          
          {/* Uses */}
          <div className="leaf-corner p-6 bg-white">
            <h2 className="text-2xl font-heading text-forest-dark mb-3">Uses</h2>
            <ul className="space-y-3">
              {plant.uses.map((use, index) => (
                <li key={index} className="flex items-start bg-leaf-light/10 p-3 rounded-lg border border-leaf-light/20">
                  <span className="mr-3 text-xl text-forest">{getPlantIcon(plant.type)}</span>
                  <span className="font-body text-earth-dark">{use}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quote */}
          <div className="mt-6 italic text-center font-serif text-forest-dark text-sm px-6 py-4 border-t border-leaf-light/30">
            "In nature's economy the currency is not money, it is life." — Vandana Shiva
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail; 