import React from 'react';

const EuropeMap: React.FC = () => {
  // Realistic Europe contour outline path
  const europeOutline = `
    M 168,52 C 165,48 160,45 158,42 C 155,38 152,35 150,32
    C 148,28 150,25 155,22 C 160,18 168,15 175,14
    C 182,12 190,10 198,8 C 206,6 215,5 222,8
    C 228,10 232,15 238,18 C 242,20 248,22 252,18
    C 256,14 260,10 265,8 C 270,6 276,5 282,8
    C 288,12 292,18 295,25 C 298,32 300,38 305,42
    C 310,46 315,48 318,52 C 322,56 325,60 328,65
    C 332,70 335,75 338,80 C 340,85 342,90 340,95
    C 338,100 335,105 330,108 C 325,112 320,115 315,118
    C 310,120 305,118 302,115 C 298,112 295,108 292,112
    C 288,116 285,120 282,125 C 278,130 275,135 270,138
    C 265,142 260,145 255,148 C 250,150 245,152 240,155
    C 235,158 230,160 225,158 C 220,155 218,150 215,148
    C 212,145 208,142 205,140 C 200,138 195,140 192,145
    C 188,150 185,155 182,160 C 178,165 175,170 170,172
    C 165,175 160,178 155,180 C 150,182 145,180 142,175
    C 138,170 135,165 130,162 C 125,158 120,155 115,158
    C 110,160 108,165 105,170 C 102,175 100,180 95,182
    C 90,185 85,185 80,182 C 75,178 72,172 70,168
    C 68,162 70,155 72,150 C 75,145 78,140 82,135
    C 85,130 88,125 90,120
  `;

  // UK outline
  const ukOutline = `
    M 108,105 C 105,100 102,95 100,90 C 98,85 96,80 98,75
    C 100,70 105,68 110,65 C 115,62 120,60 125,62
    C 130,65 132,70 135,75 C 138,80 140,85 138,90
    C 135,95 130,100 125,105 C 120,108 115,110 110,108 Z
  `;

  // Ireland
  const irelandOutline = `
    M 82,82 C 78,78 76,72 78,68 C 80,64 85,62 90,62
    C 95,62 98,65 100,70 C 102,75 100,80 96,84
    C 92,88 86,86 82,82 Z
  `;

  // Scandinavia
  const scandinaviaOutline = `
    M 220,8 C 225,12 228,18 230,25 C 232,32 230,40 228,48
    C 225,55 222,62 218,68 C 215,72 212,78 208,82
    C 205,85 200,88 196,85 C 192,82 190,78 188,72
    C 185,65 182,58 180,50 C 178,42 180,35 182,28
    C 185,22 190,18 195,15 C 200,12 205,10 210,8 C 215,6 218,6 220,8
  `;

  // Italy boot
  const italyOutline = `
    M 222,165 C 225,170 228,175 230,180 C 232,185 234,190 236,196
    C 238,202 240,208 242,215 C 244,222 245,228 244,235
    C 242,240 238,245 234,248 C 230,252 226,255 222,252
    C 218,248 216,242 215,236 C 214,228 212,220 210,212
    C 208,205 206,198 208,192 C 210,186 214,180 218,175
    C 220,172 222,168 222,165
  `;

  // Sicily
  const sicilyOutline = `
    M 228,258 C 232,256 236,258 240,260 C 244,262 242,268 238,270
    C 234,272 230,270 228,266 C 226,262 226,260 228,258 Z
  `;

  // Iberian peninsula
  const iberiaOutline = `
    M 90,120 C 85,125 80,130 75,138 C 70,145 65,152 62,160
    C 58,168 55,175 55,185 C 55,192 58,200 62,205
    C 68,210 75,215 82,218 C 90,220 98,222 105,220
    C 112,218 118,215 125,210 C 130,205 135,200 138,195
    C 142,188 145,180 142,175 C 140,170 135,165 130,162
  `;

  // Greece/Balkans
  const greeceOutline = `
    M 290,178 C 292,185 295,192 298,200 C 300,208 302,215 300,222
    C 298,228 294,232 290,235 C 286,238 282,240 278,238
    C 274,235 272,230 270,225 C 268,218 270,210 272,202
    C 275,195 278,188 282,182 C 285,178 288,175 290,178
  `;

  // Poland area (highlighted)
  const polandOutline = `
    M 242,85 C 248,82 255,80 262,82 C 268,84 274,88 278,92
    C 282,98 284,105 282,112 C 280,118 276,122 270,125
    C 264,128 258,128 252,126 C 246,124 240,120 238,114
    C 235,108 234,100 236,94 C 238,90 240,88 242,85 Z
  `;

  const polandCenter = { x: 260, y: 104 };

  // Cities
  const cities = [
    { x: 260, y: 104, highlight: true, label: "Katowice" },
    { x: 188, y: 108, highlight: false },
    { x: 115, y: 82, highlight: false },
    { x: 82, y: 178, highlight: false },
    { x: 230, y: 215, highlight: false },
    { x: 288, y: 208, highlight: false },
    { x: 212, y: 48, highlight: false },
    { x: 320, y: 85, highlight: false },
  ];

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full max-w-[500px] max-h-[500px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Subtle grid lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={20 + i * 28} x2="380" y2={20 + i * 28}
          stroke="hsla(38,80%,55%,0.03)" strokeWidth="0.3" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={20 + i * 32} y1="0" x2={20 + i * 32} y2="300"
          stroke="hsla(38,80%,55%,0.03)" strokeWidth="0.3" />
      ))}

      {/* Connection lines from Poland */}
      {cities.filter(c => !c.highlight).map((city, i) => (
        <line key={`conn${i}`}
          x1={polandCenter.x} y1={polandCenter.y}
          x2={city.x} y2={city.y}
          stroke="hsla(38,80%,55%,0.1)"
          strokeWidth="0.4"
          strokeDasharray="3 3"
        />
      ))}

      {/* Europe main outline */}
      <path d={europeOutline} stroke="hsla(38,80%,55%,0.3)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* UK */}
      <path d={ukOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Ireland */}
      <path d={irelandOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Scandinavia */}
      <path d={scandinaviaOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Iberian peninsula */}
      <path d={iberiaOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Italy */}
      <path d={italyOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d={sicilyOutline} stroke="hsla(38,80%,55%,0.2)" strokeWidth="0.6" fill="none" />

      {/* Greece */}
      <path d={greeceOutline} stroke="hsla(38,80%,55%,0.25)" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Poland highlighted */}
      <path d={polandOutline} stroke="hsla(38,80%,55%,0.6)" strokeWidth="1" strokeLinecap="round" fill="hsla(38,80%,55%,0.08)" />

      {/* Poland glow */}
      <circle cx={polandCenter.x} cy={polandCenter.y} r="16" fill="hsla(38,80%,55%,0.05)">
        <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* City dots */}
      {cities.map((city, i) => (
        <g key={i}>
          <circle cx={city.x} cy={city.y} r={city.highlight ? 3 : 1.5}
            fill={city.highlight ? "hsla(38,80%,55%,0.85)" : "hsla(38,80%,55%,0.35)"} />
          {city.highlight && city.label && (
            <text x={city.x + 6} y={city.y + 3} fill="hsla(38,80%,55%,0.6)" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500">
              {city.label}
            </text>
          )}
        </g>
      ))}

      {/* Animated dots along connections */}
      {cities.filter(c => !c.highlight).map((city, i) => (
        <circle key={`p${i}`} r="1" fill="hsla(38,80%,55%,0.5)">
          <animateMotion
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
            path={`M${polandCenter.x},${polandCenter.y} L${city.x},${city.y}`}
          />
        </circle>
      ))}
    </svg>
  );
};

export default EuropeMap;
