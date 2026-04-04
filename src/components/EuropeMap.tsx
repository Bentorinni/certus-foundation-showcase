import React from 'react';
import europeMapImg from '@/assets/europe-map.png';

const EuropeMap: React.FC = () => {
  // Katowice approximate position on the map image (percentage)
  const katowice = { x: 55, y: 42 };

  const cities = [
    { x: 38, y: 48, label: "" },   // Paris
    { x: 44, y: 40, label: "" },   // Berlin
    { x: 28, y: 60, label: "" },   // Madrid
    { x: 48, y: 62, label: "" },   // Rome
    { x: 62, y: 68, label: "" },   // Athens
    { x: 30, y: 30, label: "" },   // London
    { x: 48, y: 18, label: "" },   // Stockholm
    { x: 60, y: 20, label: "" },   // Helsinki
    { x: 72, y: 38, label: "" },   // Kyiv
  ];

  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="5" y1={10 + i * 12} x2="95" y2={10 + i * 12}
            stroke="hsla(38,80%,55%,0.03)" strokeWidth="0.15" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={10 + i * 12} y1="5" x2={10 + i * 12} y2="95"
            stroke="hsla(38,80%,55%,0.03)" strokeWidth="0.15" />
        ))}
      </svg>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {cities.map((city, i) => (
          <line key={`conn${i}`}
            x1={katowice.x} y1={katowice.y}
            x2={city.x} y2={city.y}
            stroke="hsla(38,80%,55%,0.1)"
            strokeWidth="0.2"
            strokeDasharray="1.5 1.5"
          />
        ))}
      </svg>

      {/* Europe map image with gold tint */}
      <img
        src={europeMapImg}
        alt="Europe map"
        className="w-[90%] h-[90%] object-contain"
        style={{
          opacity: 0.2,
          filter: 'invert(1) sepia(1) saturate(3) hue-rotate(10deg) brightness(0.85)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Dots and animations overlay */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Poland glow */}
        <circle cx={katowice.x} cy={katowice.y} r="4" fill="hsla(38,80%,55%,0.06)">
          <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Katowice dot */}
        <circle cx={katowice.x} cy={katowice.y} r="1" fill="hsla(38,80%,55%,0.85)" />
        <text x={katowice.x + 2} y={katowice.y + 0.8} fill="hsla(38,80%,55%,0.6)" fontSize="2.5" fontFamily="Inter, sans-serif" fontWeight="500">
          Katowice
        </text>

        {/* City dots */}
        {cities.map((city, i) => (
          <circle key={i} cx={city.x} cy={city.y} r="0.5" fill="hsla(38,80%,55%,0.3)" />
        ))}

        {/* Animated pulse dots */}
        {cities.map((city, i) => (
          <circle key={`p${i}`} r="0.4" fill="hsla(38,80%,55%,0.5)">
            <animateMotion
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M${katowice.x},${katowice.y} L${city.x},${city.y}`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default EuropeMap;
