import React from 'react';

const EuropeMap: React.FC = () => {
  // Realistic Europe outline paths (simplified but recognizable)
  const europePath = `
    M 245,28 L 255,25 262,30 268,28 275,35 280,32 288,38 295,35 300,42 308,40 
    315,48 320,52 325,48 330,55 335,52 340,58 338,65 342,72 340,78 335,82 
    338,88 342,95 340,102 335,108 330,105 325,110 320,108 315,112 310,108 
    305,115 300,112 295,118 290,115 285,120 280,118 275,122 270,125 265,128 
    260,132 255,128 250,135 248,140 252,145 248,150 242,148 238,155 235,160 
    240,165 238,172 235,178 230,175 225,180 220,178 215,182 210,178 205,185 
    200,182 195,188 190,185 185,190 180,188 175,192 170,195 165,198 160,202 
    155,205 150,210 148,218 152,225 148,232 142,228 138,235 135,240 130,238 
    125,242 120,245 115,250 118,258 122,265 118,272 112,268 108,275 105,280 
    110,285 108,292 105,298 100,295 95,300 92,308 88,315 92,322 88,328 
    82,325 78,332 82,338 88,342 95,345 102,348 108,352 115,355 122,352 
    128,358 135,362 142,365 148,368 155,372 162,375 168,378 175,375 182,372 
    188,368 195,372 202,375 208,378 215,382 222,385 228,382 235,378 242,382 
    248,385 255,388 262,392 268,395 275,398 282,395 288,398 295,402 302,398 
    308,395 312,400 318,405 325,408 332,412 338,408 342,415 348,418 355,415 
    362,418 368,422 375,425 382,428 388,425 395,422
  `;

  // Country borders (internal lines)
  const borders = [
    // Scandinavia division
    "M 280,32 L 285,55 290,78 288,95 282,108",
    // UK outline
    "M 155,120 Q 148,115 145,108 Q 142,98 148,88 Q 155,80 162,78 Q 170,75 175,80 Q 180,88 178,98 Q 175,108 168,115 Q 162,120 155,120",
    // Ireland
    "M 128,95 Q 122,90 122,82 Q 125,75 132,72 Q 138,72 142,78 Q 145,85 142,92 Q 138,98 132,98 Z",
    // France-Germany border area
    "M 215,182 L 228,172 238,155 248,140 255,128",
    // Italy boot
    "M 262,265 Q 265,272 270,280 Q 275,290 278,300 Q 280,310 278,320 Q 275,328 270,335 Q 265,340 260,342 Q 255,338 258,328 Q 260,318 258,308 Q 255,298 252,290 Q 248,282 250,272 Q 252,268 262,265",
    // Sicily
    "M 255,348 Q 260,345 268,348 Q 272,352 268,358 Q 262,360 255,358 Q 252,355 255,348",
    // Iberian peninsula division
    "M 135,240 L 142,248 148,258 152,268",
    // Poland area
    "M 275,155 L 285,152 298,155 308,162 315,172 312,182 305,188 295,185 285,182 278,175 275,165 275,155",
    // Greece
    "M 335,328 Q 340,335 342,345 Q 340,355 335,362 Q 330,365 325,360 Q 322,352 325,342 Q 328,335 335,328",
    // Balkans lines
    "M 305,265 L 315,275 325,285 332,298 335,312",
  ];

  // Poland highlight polygon
  const polandPath = "M 275,155 L 285,148 298,152 310,158 318,168 315,180 308,188 298,192 285,188 278,178 272,168 Z";
  
  // City dots
  const cities = [
    { x: 295, y: 170, label: "Katowice", highlight: true },
    { x: 230, y: 165, label: "", highlight: false },
    { x: 165, y: 95, label: "", highlight: false },
    { x: 195, y: 252, label: "", highlight: false },
    { x: 120, y: 268, label: "", highlight: false },
    { x: 265, y: 305, label: "", highlight: false },
    { x: 340, y: 345, label: "", highlight: false },
    { x: 290, y: 55, label: "", highlight: false },
    { x: 350, y: 195, label: "", highlight: false },
  ];

  // Connection lines from Poland center
  const polandCenter = { x: 295, y: 170 };

  return (
    <svg
      viewBox="0 0 500 450"
      className="w-full h-full max-w-[500px] max-h-[500px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Subtle grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h${i}`} x1="50" y1={30 + i * 38} x2="450" y2={30 + i * 38}
          stroke="hsla(38,80%,55%,0.04)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={50 + i * 38} y1="20" x2={50 + i * 38} y2="440"
          stroke="hsla(38,80%,55%,0.04)" strokeWidth="0.5" />
      ))}

      {/* Connection lines */}
      {cities.filter(c => !c.highlight).map((city, i) => (
        <line key={`conn${i}`}
          x1={polandCenter.x} y1={polandCenter.y}
          x2={city.x} y2={city.y}
          stroke="hsla(38,80%,55%,0.12)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      ))}

      {/* Europe outline */}
      <path d={europePath} stroke="hsla(38,80%,55%,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Internal borders */}
      {borders.map((d, i) => (
        <path key={i} d={d} stroke="hsla(38,80%,55%,0.15)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
      ))}

      {/* Poland highlight */}
      <path d={polandPath} fill="hsla(38,80%,55%,0.12)" stroke="hsla(38,80%,55%,0.6)" strokeWidth="1.5" strokeLinejoin="round">
        <animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Poland glow */}
      <circle cx={polandCenter.x} cy={polandCenter.y} r="20" fill="hsla(38,80%,55%,0.06)">
        <animate attributeName="r" values="18;25;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* City dots */}
      {cities.map((city, i) => (
        <g key={i}>
          <circle cx={city.x} cy={city.y} r={city.highlight ? 4 : 2}
            fill={city.highlight ? "hsla(38,80%,55%,0.9)" : "hsla(38,80%,55%,0.4)"} />
          {city.highlight && (
            <>
              <circle cx={city.x} cy={city.y} r="8" fill="none" stroke="hsla(38,80%,55%,0.3)" strokeWidth="0.5">
                <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x={city.x + 8} y={city.y + 4} fill="hsla(38,80%,55%,0.7)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500">
                {city.label}
              </text>
            </>
          )}
        </g>
      ))}

      {/* Animated pulse dots on connections */}
      {cities.filter(c => !c.highlight).map((city, i) => (
        <circle key={`pulse${i}`} r="1.5" fill="hsla(38,80%,55%,0.6)">
          <animateMotion
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite"
            path={`M${polandCenter.x},${polandCenter.y} L${city.x},${city.y}`}
          />
        </circle>
      ))}
    </svg>
  );
};

export default EuropeMap;
