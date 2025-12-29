import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TreeDeciduous, Flower2, Pill, Leaf, Sprout,
  Globe, MapPin, Sparkles
} from 'lucide-react';
import plantsData from '../data/plants.json';
import '../styles/nature-theme.css';

type PlantParams = {
  id: string;
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
    const plantById = plantsData.find((p) => p.id === Number(id));
    if (plantById) {
      setPlant(plantById as Plant);
    }
    setLoading(false);
  }, [id]);
  
  // Helper function to get plant icon
  const getPlantIcon = (type: string, size: number = 20) => {
    const iconProps = { size, className: "flex-shrink-0" };
    switch(type) {
      case 'Tree': return <TreeDeciduous {...iconProps} />;
      case 'Medicinal': return <Pill {...iconProps} />;
      case 'Flower': return <Flower2 {...iconProps} />;
      case 'Sacred': return <Sparkles {...iconProps} />;
      default: return <Sprout {...iconProps} />;
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <Leaf className="animate-spin text-emerald-500" size={32} />
          <span className="text-earth-dark dark:text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="nature-card glass-card p-8 rounded-xl">
          <Leaf className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-forest-dark dark:text-gray-300 font-body mb-6">Plant not found.</p>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <div className="nature-card glass-card p-0 pb-0 overflow-hidden rounded-xl">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-primary p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        
        {/* Plant Image */}
        <div className="w-full h-64 md:h-80 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
              {getPlantIcon(plant.type, 16)}
              <span>{plant.type}</span>
            </span>
            <h1 className="text-3xl font-heading text-white mt-3 drop-shadow-lg">{plant.name}</h1>
            <p className="text-sm italic font-serif text-white/90 drop-shadow-md">{plant.scientificName}</p>
          </div>
        </div>
        
        {/* Plant Info */}
        <div className="p-6">
          {/* Language Switcher */}
          <div className="flex gap-3 mb-6">
            <button
              className={`flex-1 px-4 py-3 text-sm border rounded-xl font-medium transition-all ${
                language === 'english' 
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' 
                  : 'bg-white/50 dark:bg-slate-800/50 text-earth-dark dark:text-gray-300 border-emerald-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-700'
              }`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm border rounded-xl font-medium transition-all ${
                language === 'hindi' 
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' 
                  : 'bg-white/50 dark:bg-slate-800/50 text-earth-dark dark:text-gray-300 border-emerald-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-slate-700'
              }`}
              onClick={() => setLanguage('hindi')}
            >
              हिंदी
            </button>
          </div>
          
          {/* Quick Info */}
          {(plant.nativeRegion || plant.habitat) && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {plant.nativeRegion && (
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                    <Globe size={16} />
                    <span className="text-xs font-medium uppercase">Native Region</span>
                  </div>
                  <p className="text-sm text-earth-dark dark:text-gray-300">{plant.nativeRegion}</p>
                </div>
              )}
              {plant.habitat && (
                <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                    <MapPin size={16} />
                    <span className="text-xs font-medium uppercase">Habitat</span>
                  </div>
                  <p className="text-sm text-earth-dark dark:text-gray-300">{plant.habitat}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Description */}
          <div className="mb-6 p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
            <h2 className="text-xl font-heading text-forest-dark dark:text-emerald-300 mb-3 flex items-center gap-2">
              <Leaf className="text-emerald-500" size={22} />
              Description
            </h2>
            <p className="font-body text-earth-dark dark:text-gray-300 leading-relaxed">
              {plant.description[language]}
            </p>
          </div>
          
          {/* Uses */}
          <div className="p-5 rounded-xl bg-white/50 dark:bg-slate-800/50">
            <h2 className="text-xl font-heading text-forest-dark dark:text-emerald-300 mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={22} />
              Uses & Benefits
            </h2>
            <ul className="space-y-3">
              {plant.uses.map((use, index) => (
                <li key={index} className="flex items-start p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100/50 dark:border-emerald-800/20">
                  <span className="mr-3 mt-0.5 text-emerald-500">
                    {getPlantIcon(plant.type, 18)}
                  </span>
                  <span className="font-body text-earth-dark dark:text-gray-300">{use}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quote */}
          <div className="mt-6 italic text-center font-serif text-forest-dark dark:text-gray-400 text-sm px-6 py-4 border-t border-emerald-100 dark:border-slate-700">
            "In nature's economy the currency is not money, it is life." — Vandana Shiva
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;