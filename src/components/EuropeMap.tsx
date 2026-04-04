import React from 'react';
import europeMapImg from '@/assets/europe-map.png';

const EuropeMap: React.FC = () => {
  return (
    <div className="relative w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="6"
            y1={10 + i * 11.5}
            x2="94"
            y2={10 + i * 11.5}
            stroke="hsla(38,80%,55%,0.03)"
            strokeWidth="0.15"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={10 + i * 11.5}
            y1="6"
            x2={10 + i * 11.5}
            y2="94"
            stroke="hsla(38,80%,55%,0.03)"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      <img
        src={europeMapImg}
        alt="Konturowa mapa Europy"
        className="relative z-10 w-[92%] h-[92%] object-contain select-none pointer-events-none"
        style={{
          opacity: 0.24,
          filter: 'invert(1) sepia(1) saturate(2.2) hue-rotate(8deg) brightness(0.88) contrast(1.05)',
          mixBlendMode: 'screen',
        }}
        loading="lazy"
      />
    </div>
  );
};

export default EuropeMap;
