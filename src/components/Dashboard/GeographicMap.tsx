import React from 'react';
import { MapPin, Globe, TrendingUp } from 'lucide-react';
import { LeakLocation } from '../../types';

interface GeographicMapProps {
  locations: LeakLocation[];
}

const GeographicMap: React.FC<GeographicMapProps> = ({ locations }) => {
  const getMarkerSize = (count: number) => {
    if (count >= 8) return 'w-4 h-4';
    if (count >= 5) return 'w-3.5 h-3.5';
    if (count >= 3) return 'w-3 h-3';
    return 'w-2.5 h-2.5';
  };

  const getMarkerColor = (count: number) => {
    if (count >= 8) return 'bg-red-500 shadow-red-500/50';
    if (count >= 5) return 'bg-orange-500 shadow-orange-500/50';
    if (count >= 3) return 'bg-yellow-500 shadow-yellow-500/50';
    return 'bg-green-500 shadow-green-500/50';
  };

  const getPulseIntensity = (count: number) => {
    if (count >= 8) return 'animate-ping';
    if (count >= 5) return 'animate-pulse';
    return '';
  };

  // Coordenadas aproximadas para posicionamento no mapa
  const getMapPosition = (location: LeakLocation) => {
    const positions: { [key: string]: { x: number; y: number } } = {
      'USA': { x: 25, y: 45 },
      'UK': { x: 50, y: 35 },
      'Germany': { x: 55, y: 38 },
      'Brazil': { x: 35, y: 70 },
      'Japan': { x: 85, y: 42 }
    };
    
    return positions[location.country] || { x: 50, y: 50 };
  };

  const totalLeaks = locations.reduce((sum, location) => sum + location.count, 0);

  return (
    <div className="bg-secondary rounded-xl p-6 border border-tertiary">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Distribuição Geográfica</h3>
          <p className="text-gray-400">Localizações de fugas de dados em todo o mundo</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{totalLeaks}</p>
            <p className="text-xs text-gray-400">Total de Fugas</p>
          </div>
          <Globe className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* World Map Container */}
      <div className="relative bg-gradient-to-br from-tertiary via-tertiary to-background rounded-xl p-6 h-80 overflow-hidden border border-gray-700">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-600/30"></div>
            ))}
          </div>
        </div>

        {/* Continents Silhouettes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          {/* North America */}
          <path
            d="M50 80 Q80 70 120 85 Q140 95 130 120 Q110 140 80 135 Q60 125 50 100 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* Europe */}
          <path
            d="M180 70 Q200 65 220 75 Q230 85 225 100 Q215 110 200 105 Q185 95 180 80 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* Asia */}
          <path
            d="M240 60 Q300 55 350 70 Q370 85 360 110 Q340 125 300 120 Q260 110 240 85 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* South America */}
          <path
            d="M100 160 Q120 150 130 170 Q135 200 125 220 Q115 235 105 225 Q95 200 100 180 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* Africa */}
          <path
            d="M170 120 Q190 115 200 135 Q205 160 195 180 Q185 195 175 185 Q165 160 170 140 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* Australia */}
          <path
            d="M300 200 Q320 195 330 205 Q335 215 325 220 Q315 225 305 220 Q295 210 300 205 Z"
            fill="rgba(216, 61, 255, 0.1)"
            stroke="rgba(216, 61, 255, 0.3)"
            strokeWidth="1"
          />
        </svg>

        {/* Location Markers */}
        {locations.map((location) => {
          const position = getMapPosition(location);
          return (
            <div
              key={location.id}
              className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              {/* Pulse Effect */}
              <div className={`absolute inset-0 rounded-full ${getMarkerColor(location.count)} ${getPulseIntensity(location.count)} opacity-75`}></div>
              
              {/* Main Marker */}
              <div className={`relative ${getMarkerSize(location.count)} ${getMarkerColor(location.count)} rounded-full flex items-center justify-center shadow-lg border-2 border-white/20`}>
                <MapPin className="w-2 h-2 text-white" />
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg py-3 px-4 whitespace-nowrap border border-primary/20 shadow-xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getMarkerColor(location.count).split(' ')[0]}`}></div>
                    <p className="font-semibold">{location.city}, {location.country}</p>
                  </div>
                  <p className="text-gray-300">{location.count} fuga{location.count !== 1 ? 's' : ''} detetada{location.count !== 1 ? 's' : ''}</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
          {locations.map((location, index) => {
            if (index === 0) return null;
            const currentPos = getMapPosition(location);
            const prevPos = getMapPosition(locations[index - 1]);
            
            return (
              <line
                key={`line-${location.id}`}
                x1={`${prevPos.x * 4}%`}
                y1={`${prevPos.y * 3}%`}
                x2={`${currentPos.x * 4}%`}
                y2={`${currentPos.y * 3}%`}
                stroke="rgba(216, 61, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-primary/30">
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Tempo Real</span>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-tertiary rounded-lg p-4 hover:bg-tertiary/80 transition-colors duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getMarkerColor(location.count).split(' ')[0]}`}></div>
                <span className="text-white font-medium text-sm">{location.city}</span>
              </div>
              <TrendingUp className="w-3 h-3 text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{location.country}</span>
              <span className="text-primary font-bold text-lg">{location.count}</span>
            </div>
            <div className="mt-2 bg-background rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(location.count / Math.max(...locations.map(l => l.count))) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Baixo (1-2)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-400">Médio (3-4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-400">Alto (5-7)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-400">Crítico (8+)</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicMap;