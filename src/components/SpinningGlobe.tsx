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
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      const size = parent ? Math.min(parent.clientWidth, parent.clientHeight) : 550;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) * 0.88;

      ctx.clearRect(0, 0, w, h);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.25);
      glow.addColorStop(0, 'hsla(142, 100%, 50%, 0.06)');
      glow.addColorStop(0.6, 'hsla(142, 100%, 50%, 0.02)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Globe circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(142, 100%, 50%, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner gradient
      const innerGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      innerGrad.addColorStop(0, 'hsla(142, 100%, 55%, 0.04)');
      innerGrad.addColorStop(1, 'hsla(142, 100%, 55%, 0.005)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        const latR = (lat * Math.PI) / 180;
        const y = cy - Math.sin(latR) * r;
        const rx = Math.cos(latR) * r;
        ctx.beginPath();
        ctx.ellipse(cx, y, rx, Math.max(rx * 0.04, 0.5), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(142, 100%, 50%, ${lat === 0 ? 0.18 : 0.1})`;
        ctx.lineWidth = lat === 0 ? 0.8 : 0.5;
        ctx.stroke();
      }

      // Longitude lines (rotating)
      for (let lon = 0; lon < 360; lon += 15) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 1) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < -0.01) { started = false; continue; }
          const x = cx + x3d * r;
          const y = cy - Math.sin(latR) * r;
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'hsla(142, 100%, 50%, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Dots at intersections
      for (let lon = 0; lon < 360; lon += 30) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        for (let lat = -60; lat <= 60; lat += 30) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < 0.05) continue;
          ctx.beginPath();
          ctx.arc(cx + x3d * r, cy - Math.sin(latR) * r, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(142, 100%, 55%, ${0.12 + z3d * 0.25})`;
          ctx.fill();
        }
      }

      rotation += 0.1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" role="img" aria-label="Animowany glob technologiczny — międzynarodowy zasięg Fundus Certus" />;
};

export default SpinningGlobe;
