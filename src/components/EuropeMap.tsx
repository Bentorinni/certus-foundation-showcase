import React, { useEffect, useRef } from 'react';

const EuropeMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = 600;
      canvas.height = 600;
    };
    resize();

    // Simplified Europe country outlines (normalized 0-1 coordinates)
    const countries = [
      // Poland (highlighted)
      { points: [[0.52,0.35],[0.58,0.33],[0.63,0.35],[0.65,0.38],[0.63,0.42],[0.58,0.44],[0.53,0.42],[0.50,0.39]], highlight: true },
      // Germany
      { points: [[0.42,0.33],[0.48,0.30],[0.52,0.33],[0.52,0.40],[0.48,0.43],[0.42,0.40],[0.40,0.36]], highlight: false },
      // France
      { points: [[0.30,0.40],[0.38,0.38],[0.42,0.42],[0.42,0.52],[0.38,0.56],[0.30,0.54],[0.28,0.46]], highlight: false },
      // Spain
      { points: [[0.22,0.56],[0.32,0.54],[0.36,0.58],[0.34,0.66],[0.26,0.68],[0.20,0.64],[0.20,0.58]], highlight: false },
      // Italy
      { points: [[0.46,0.48],[0.50,0.46],[0.52,0.50],[0.50,0.58],[0.48,0.64],[0.46,0.60],[0.44,0.52]], highlight: false },
      // UK
      { points: [[0.30,0.26],[0.34,0.24],[0.36,0.28],[0.35,0.36],[0.32,0.38],[0.28,0.34],[0.28,0.28]], highlight: false },
      // Scandinavia
      { points: [[0.46,0.10],[0.50,0.08],[0.54,0.12],[0.52,0.22],[0.48,0.28],[0.44,0.24],[0.44,0.16]], highlight: false },
      // Eastern Europe
      { points: [[0.62,0.28],[0.70,0.26],[0.74,0.32],[0.72,0.42],[0.66,0.44],[0.62,0.40]], highlight: false },
      // Balkans
      { points: [[0.54,0.46],[0.60,0.44],[0.64,0.48],[0.62,0.56],[0.56,0.58],[0.52,0.52]], highlight: false },
      // Greece
      { points: [[0.56,0.58],[0.62,0.56],[0.64,0.62],[0.60,0.68],[0.56,0.66],[0.54,0.62]], highlight: false },
    ];

    // Connection lines from Poland to other countries
    const connections = countries.filter(c => !c.highlight).map(c => {
      const cx = c.points.reduce((s, p) => s + p[0], 0) / c.points.length;
      const cy = c.points.reduce((s, p) => s + p[1], 0) / c.points.length;
      return [cx, cy];
    });

    const polandCenter = [0.57, 0.38];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw connection lines with animated pulses
      connections.forEach((target, i) => {
        const progress = (Math.sin(time * 0.02 + i * 0.7) + 1) / 2;
        
        ctx.beginPath();
        ctx.moveTo(polandCenter[0] * w, polandCenter[1] * h);
        ctx.lineTo(target[0] * w, target[1] * h);
        ctx.strokeStyle = `hsla(38, 100%, 55%, ${0.1 + progress * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated dot along the line
        const dotX = polandCenter[0] * w + (target[0] * w - polandCenter[0] * w) * progress;
        const dotY = polandCenter[1] * h + (target[1] * h - polandCenter[1] * h) * progress;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(38, 100%, 55%, ${0.5 + progress * 0.5})`;
        ctx.fill();
      });

      // Draw countries
      countries.forEach((country) => {
        ctx.beginPath();
        country.points.forEach((p, j) => {
          const x = p[0] * w;
          const y = p[1] * h;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();

        if (country.highlight) {
          ctx.fillStyle = `hsla(38, 100%, 55%, ${0.2 + Math.sin(time * 0.03) * 0.1})`;
          ctx.strokeStyle = 'hsla(38, 100%, 55%, 0.8)';
          ctx.lineWidth = 2;
        } else {
          ctx.fillStyle = 'hsla(38, 100%, 55%, 0.05)';
          ctx.strokeStyle = 'hsla(38, 100%, 55%, 0.25)';
          ctx.lineWidth = 1;
        }
        ctx.fill();
        ctx.stroke();
      });

      // Draw dots at country centers
      countries.forEach((country) => {
        const cx = country.points.reduce((s, p) => s + p[0], 0) / country.points.length;
        const cy = country.points.reduce((s, p) => s + p[1], 0) / country.points.length;
        
        ctx.beginPath();
        ctx.arc(cx * w, cy * h, country.highlight ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = country.highlight
          ? `hsla(38, 100%, 55%, ${0.8 + Math.sin(time * 0.05) * 0.2})`
          : 'hsla(38, 100%, 55%, 0.4)';
        ctx.fill();

        // Glow for Poland
        if (country.highlight) {
          ctx.beginPath();
          ctx.arc(cx * w, cy * h, 12 + Math.sin(time * 0.04) * 4, 0, Math.PI * 2);
          ctx.fillStyle = 'hsla(38, 100%, 55%, 0.1)';
          ctx.fill();
        }
      });

      // Grid lines (latitude/longitude style)
      for (let i = 0; i < 8; i++) {
        const y = (0.05 + i * 0.12) * h;
        ctx.beginPath();
        ctx.moveTo(0.15 * w, y);
        ctx.lineTo(0.85 * w, y);
        ctx.strokeStyle = 'hsla(38, 100%, 55%, 0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const x = (0.15 + i * 0.10) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0.05 * h);
        ctx.lineTo(x, 0.85 * h);
        ctx.strokeStyle = 'hsla(38, 100%, 55%, 0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[600px] max-h-[600px]"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EuropeMap;
