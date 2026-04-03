import React, { useEffect, useRef } from 'react';

const SpinningGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.85;
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) * 0.85;

      ctx.clearRect(0, 0, w, h);

      // Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(38, 100%, 50%, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = cy - Math.sin(latRad) * r;
        const rx = Math.cos(latRad) * r;
        ctx.beginPath();
        ctx.ellipse(cx, y, rx, rx * 0.08, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(38, 100%, 50%, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitude lines (rotating)
      for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 2) {
          const latRad = (lat * Math.PI) / 180;
          const x3d = Math.cos(latRad) * Math.sin(lonRad);
          const z3d = Math.cos(latRad) * Math.cos(lonRad);
          if (z3d < -0.05) continue; // behind globe
          const x = cx + x3d * r;
          const y = cy - Math.sin(latRad) * r;
          if (lat === -90 || z3d < 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `hsla(38, 100%, 50%, ${0.12 + 0.08})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Dots on intersections
      for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        for (let lat = -60; lat <= 60; lat += 30) {
          const latRad = (lat * Math.PI) / 180;
          const x3d = Math.cos(latRad) * Math.sin(lonRad);
          const z3d = Math.cos(latRad) * Math.cos(lonRad);
          if (z3d < 0) continue;
          const x = cx + x3d * r;
          const y = cy - Math.sin(latRad) * r;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(38, 100%, 55%, ${0.3 + z3d * 0.4})`;
          ctx.fill();
        }
      }

      rotation += 0.15;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-[700px] max-h-[700px]"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default SpinningGlobe;
