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

    const continents: [number, number][][] = [
      // Europe
      [[35,-10],[38,-8],[40,-5],[42,0],[43,3],[46,5],[48,2],[50,3],[52,5],[54,8],[55,10],[56,12],[57,15],[60,18],[63,20],[65,25],[68,28],[70,30],[68,35],[65,38],[60,40],[55,35],[52,30],[50,25],[48,20],[46,15],[44,12],[42,10],[40,8],[38,5],[36,2],[35,-5],[35,-10]],
      // Africa
      [[35,-5],[33,0],[30,5],[25,10],[20,12],[15,10],[10,8],[5,5],[0,8],[-5,12],[-10,15],[-15,18],[-20,22],[-25,25],[-30,28],[-33,30],[-35,28],[-34,22],[-30,18],[-25,15],[-20,18],[-15,22],[-10,25],[-5,28],[0,30],[5,32],[10,35],[15,38],[20,40],[25,38],[28,35],[30,30],[32,25],[33,18],[35,10],[35,-5]],
      // Asia
      [[42,30],[45,35],[48,40],[50,45],[52,50],[55,55],[58,60],[60,65],[62,70],[63,80],[62,90],[60,100],[55,105],[50,110],[48,115],[45,120],[42,125],[40,128],[38,130],[35,128],[32,125],[30,120],[28,115],[25,110],[22,105],[20,100],[18,95],[15,90],[12,85],[10,80],[8,75],[10,70],[15,65],[20,60],[25,55],[30,50],[35,45],[38,40],[40,35],[42,30]],
      // North America
      [[70,-160],[68,-150],[65,-140],[60,-130],[55,-125],[50,-120],[48,-122],[45,-120],[40,-118],[35,-115],[30,-110],[28,-105],[25,-100],[28,-95],[30,-90],[28,-85],[25,-82],[30,-80],[35,-78],[40,-75],[42,-72],[45,-68],[48,-65],[50,-62],[52,-58],[55,-55],[58,-50],[60,-45],[62,-42],[65,-40],[68,-45],[70,-50],[72,-60],[74,-70],[72,-80],[70,-90],[72,-100],[74,-110],[72,-120],[70,-130],[70,-140],[70,-160]],
      // South America
      [[10,-75],[8,-72],[5,-68],[2,-65],[0,-60],[-3,-58],[-5,-55],[-8,-52],[-10,-48],[-15,-45],[-20,-42],[-25,-48],[-30,-52],[-35,-55],[-38,-58],[-42,-62],[-45,-65],[-48,-68],[-50,-72],[-52,-75],[-50,-70],[-45,-65],[-40,-62],[-35,-58],[-30,-55],[-25,-52],[-20,-48],[-15,-45],[-10,-42],[-5,-40],[0,-45],[5,-50],[8,-55],[10,-60],[12,-65],[10,-72],[10,-75]],
      // Australia
      [[-15,125],[-18,128],[-22,132],[-25,135],[-28,138],[-32,140],[-35,142],[-38,145],[-38,148],[-35,150],[-32,152],[-28,153],[-25,150],[-22,148],[-18,145],[-15,140],[-12,135],[-10,130],[-12,128],[-15,125]],
    ];

    const project = (lat: number, lon: number, cx: number, cy: number, r: number, rot: number): [number, number, number] => {
      const latR = (lat * Math.PI) / 180;
      const lonR = ((lon + rot) * Math.PI) / 180;
      const x3d = Math.cos(latR) * Math.sin(lonR);
      const y3d = -Math.sin(latR);
      const z3d = Math.cos(latR) * Math.cos(lonR);
      return [cx + x3d * r, cy + y3d * r, z3d];
    };

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) * 0.88;

      ctx.clearRect(0, 0, w, h);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.15);
      glow.addColorStop(0, 'hsla(38, 80%, 55%, 0.05)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Globe circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(38, 80%, 50%, 0.2)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Inner fill
      const innerGrad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
      innerGrad.addColorStop(0, 'hsla(38, 80%, 55%, 0.03)');
      innerGrad.addColorStop(1, 'hsla(38, 80%, 55%, 0.005)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latR = (lat * Math.PI) / 180;
        const y = cy - Math.sin(latR) * r;
        const rx = Math.cos(latR) * r;
        ctx.beginPath();
        ctx.ellipse(cx, y, rx, rx * 0.05, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsla(38, 80%, 50%, 0.07)';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < -0.02) { started = false; continue; }
          const x = cx + x3d * r;
          const y = cy - Math.sin(latR) * r;
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'hsla(38, 80%, 50%, 0.07)';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Continents
      continents.forEach((continent) => {
        ctx.beginPath();
        let started = false;
        continent.forEach(([lat, lon]) => {
          const [x, y, z] = project(lat, lon, cx, cy, r, rotation);
          if (z < -0.05) { started = false; return; }
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = 'hsla(38, 80%, 55%, 0.3)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.fillStyle = 'hsla(38, 80%, 55%, 0.03)';
        ctx.fill();
      });

      // Grid dots
      for (let lon = 0; lon < 360; lon += 60) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        for (let lat = -60; lat <= 60; lat += 30) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < 0) continue;
          ctx.beginPath();
          ctx.arc(cx + x3d * r, cy - Math.sin(latR) * r, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(38, 80%, 55%, ${0.15 + z3d * 0.25})`;
          ctx.fill();
        }
      }

      rotation += 0.12;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SpinningGlobe;
