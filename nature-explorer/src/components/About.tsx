import React from 'react';
import '../styles/nature-theme.css';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-4 pb-20">
      <h1 className="text-3xl font-heading text-center text-primary mb-6 relative">
        About Nature Explorer
        <span className="block h-1 w-24 bg-accent mx-auto mt-2 rounded-full"></span>
      </h1>
      
      <div className="leaf-border p-8 rounded-lg mb-8 relative">
        <h2 className="text-2xl font-heading text-forest-dark mb-4">Our Mission</h2>
        <p className="font-body text-earth-dark mb-6 leading-relaxed">
          Nature Explorer is dedicated to promoting awareness about the rich botanical heritage of India. 
          Our mission is to help people of all ages learn about and appreciate the diverse plant life 
          that forms an integral part of Indian culture, medicine, and ecosystem.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-heading text-forest-dark mb-3">Features</h2>
            <ul className="list-none font-body text-earth-dark space-y-2 mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-lg">🌱</span>
                <span>Explore a collection of common Indian plants</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🌿</span>
                <span>Learn about their medicinal uses and cultural significance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🍃</span>
                <span>Read descriptions in both English and Hindi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🧠</span>
                <span>Test your knowledge with our plant quiz</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🔍</span>
                <span>Search and filter plants by category</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-heading text-forest-dark mb-3">Offline App</h2>
            <p className="font-body text-earth-dark mb-6 leading-relaxed">
              This application is designed to work completely offline, making it accessible to users in areas 
              with limited internet connectivity. All plant information and images are stored locally on your device.
            </p>
            
            <h2 className="text-2xl font-heading text-forest-dark mb-3">Educational Purpose</h2>
            <p className="font-body text-earth-dark leading-relaxed">
              Nature Explorer is created for educational purposes to promote knowledge about indigenous plant 
              species, their properties, and their significance in Indian traditional knowledge systems.
            </p>
          </div>
        </div>
      </div>
      
      <div className="leaf-corner p-8 rounded-lg shadow-natural">
        <h2 className="text-2xl font-heading text-forest-dark mb-3">Technical Details</h2>
        <p className="font-body text-earth-dark mb-6 leading-relaxed">
          This app is built using React and TypeScript with a mobile-first approach. We've used 
          modern web technologies to create a responsive and user-friendly experience that works well 
          on all devices, especially on mobile phones.
        </p>
        
        <div className="mt-8 pt-6 border-t border-leaf-light">
          <p className="text-center font-body text-earth-dark italic">
            "In every walk with nature one receives far more than he seeks." — John Muir
          </p>
          <div className="text-center mt-4">
            <p className="font-body text-sm text-forest-dark">
              Nature Explorer v1.0 | Developed with <span className="text-red-500">❤</span> for plant enthusiasts
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .leaf-border {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 14px 0 rgba(0, 77, 0, 0.07);
        }
        
        .leaf-border::before,
        .leaf-border::after {
          content: '';
          position: absolute;
          background-size: 90px 90px;
          background-repeat: repeat-x;
          z-index: 1;
        }
        
        .leaf-border::before {
          left: 0;
          top: 0;
          width: 100%;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50' preserveAspectRatio='none'%3E%3Cpath fill='%2366BB6A' d='M0,0 C25,20 75,20 100,0 L100,20 L0,20 Z'/%3E%3C/svg%3E");
        }
        
        .leaf-border::after {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50' preserveAspectRatio='none'%3E%3Cpath fill='%2366BB6A' d='M0,20 C25,0 75,0 100,20 L100,0 L0,0 Z'/%3E%3C/svg%3E");
        }
        
        .leaf-corner {
          position: relative;
          background-color: rgba(255, 255, 255, 0.85);
          border-radius: 12px;
          box-shadow: 0 4px 14px 0 rgba(0, 77, 0, 0.07);
        }
        
        .leaf-corner::before,
        .leaf-corner::after {
          content: '🍃';
          position: absolute;
          font-size: 1.5rem;
        }
        
        .leaf-corner::before {
          top: -5px;
          left: -5px;
          transform: rotate(-45deg);
        }
        
        .leaf-corner::after {
          top: -5px;
          right: -5px;
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
};

export default About; 