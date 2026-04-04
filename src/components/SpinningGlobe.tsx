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

    // More detailed continent outlines
    const continents: [number, number][][] = [
      // Europe (detailed)
      [[36,-5],[37,-2],[38,0],[39,1],[40,0],[41,-1],[42,0],[43,2],[44,3],[45,5],[46,6],[47,7],[48,5],[49,3],[50,4],[51,5],[52,6],[53,7],[54,8],[55,9],[56,10],[57,12],[58,14],[59,16],[60,18],[61,19],[62,20],[63,22],[64,24],[65,25],[66,26],[68,28],[70,30],[70,32],[68,35],[66,38],[64,40],[62,42],[60,40],[58,38],[56,35],[54,32],[52,28],[50,24],[48,20],[47,16],[46,14],[44,12],[42,10],[40,8],[38,5],[37,2],[36,0],[36,-5]],
      // Africa (detailed)
      [[35,-5],[34,0],[33,5],[32,10],[30,10],[28,8],[26,10],[24,12],[22,12],[20,10],[18,8],[16,6],[14,5],[12,4],[10,5],[8,6],[6,8],[4,10],[2,10],[0,10],[-2,12],[-4,14],[-6,16],[-8,18],[-10,20],[-12,22],[-14,25],[-16,28],[-18,30],[-20,32],[-22,30],[-24,28],[-26,30],[-28,32],[-30,30],[-32,28],[-34,26],[-35,22],[-34,18],[-32,16],[-30,14],[-28,16],[-26,18],[-24,20],[-22,22],[-20,25],[-18,28],[-16,30],[-14,32],[-12,34],[-10,36],[-8,38],[-6,38],[-4,36],[-2,34],[0,32],[2,30],[5,28],[8,26],[10,28],[12,30],[14,32],[16,35],[18,36],[20,38],[22,38],[24,36],[26,34],[28,32],[30,28],[32,22],[33,15],[34,8],[35,2],[35,-5]],
      // Asia (detailed)
      [[42,30],[44,32],[46,35],[48,38],[50,42],[52,48],[54,52],[56,55],[58,58],[60,62],[62,68],[63,72],[64,78],[63,85],[62,92],[60,98],[58,105],[55,110],[52,115],[50,118],[48,120],[46,122],[44,125],[42,128],[40,130],[38,132],[36,130],[34,128],[32,125],[30,120],[28,115],[26,110],[24,105],[22,100],[20,95],[18,90],[16,85],[14,80],[12,78],[10,75],[8,72],[6,70],[5,68],[8,65],[12,60],[16,55],[20,50],[24,48],[28,45],[32,42],[36,38],[38,35],[40,32],[42,30]],
      // North America (detailed)
      [[72,-170],[70,-160],[68,-155],[66,-148],[64,-140],[62,-135],[60,-130],[58,-126],[56,-124],[54,-122],[52,-120],[50,-118],[48,-118],[46,-116],[44,-115],[42,-116],[40,-118],[38,-116],[36,-114],[34,-112],[32,-110],[30,-108],[28,-106],[26,-102],[24,-98],[26,-96],[28,-92],[30,-88],[28,-84],[26,-82],[28,-80],[30,-78],[32,-76],[34,-76],[36,-75],[38,-74],[40,-72],[42,-70],[44,-68],[46,-66],[48,-64],[50,-60],[52,-56],[54,-52],[56,-50],[58,-48],[60,-44],[62,-42],[64,-40],[66,-42],[68,-46],[70,-52],[72,-60],[74,-72],[72,-82],[70,-92],[72,-102],[74,-112],[72,-122],[70,-132],[70,-142],[72,-155],[72,-170]],
      // South America (detailed)
      [[12,-72],[10,-70],[8,-68],[6,-65],[4,-62],[2,-60],[0,-58],[-2,-56],[-4,-52],[-6,-48],[-8,-46],[-10,-44],[-12,-42],[-14,-40],[-16,-42],[-18,-44],[-20,-42],[-22,-44],[-24,-46],[-26,-48],[-28,-50],[-30,-52],[-32,-54],[-34,-56],[-36,-58],[-38,-62],[-40,-64],[-42,-66],[-44,-68],[-46,-70],[-48,-72],[-50,-74],[-52,-72],[-54,-70],[-54,-68],[-52,-66],[-50,-64],[-48,-62],[-46,-60],[-44,-58],[-42,-56],[-40,-54],[-38,-52],[-36,-50],[-34,-48],[-32,-46],[-30,-44],[-28,-42],[-26,-40],[-24,-42],[-22,-44],[-20,-46],[-18,-48],[-16,-46],[-14,-44],[-12,-42],[-10,-40],[-8,-38],[-6,-36],[-4,-38],[-2,-42],[0,-46],[2,-50],[4,-54],[6,-58],[8,-62],[10,-66],[12,-72]],
      // Australia (detailed)
      [[-12,130],[-14,128],[-16,126],[-18,124],[-20,122],[-22,120],[-24,118],[-26,116],[-28,115],[-30,116],[-32,118],[-34,120],[-36,122],[-38,126],[-38,130],[-38,134],[-38,138],[-37,142],[-36,146],[-34,148],[-32,150],[-30,152],[-28,154],[-26,154],[-24,152],[-22,150],[-20,148],[-18,146],[-16,142],[-14,138],[-12,135],[-12,130]],
      // Greenland
      [[60,-48],[62,-46],[64,-42],[66,-38],[68,-35],[70,-28],[72,-22],[74,-20],[76,-22],[78,-25],[80,-30],[82,-35],[82,-40],[80,-45],[78,-50],[76,-55],[74,-58],[72,-56],[70,-52],[68,-50],[66,-48],[64,-48],[62,-48],[60,-48]],
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
      const glow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.2);
      glow.addColorStop(0, 'hsla(38, 80%, 55%, 0.06)');
      glow.addColorStop(0.7, 'hsla(38, 80%, 55%, 0.02)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Globe circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(38, 80%, 50%, 0.18)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner gradient
      const innerGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      innerGrad.addColorStop(0, 'hsla(38, 80%, 55%, 0.03)');
      innerGrad.addColorStop(1, 'hsla(38, 80%, 55%, 0.005)');
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
        ctx.ellipse(cx, y, rx, Math.max(rx * 0.04, 1), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(38, 80%, 50%, ${Math.abs(lat) === 0 ? 0.08 : 0.04})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 15) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 1.5) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < -0.01) { started = false; continue; }
          const x = cx + x3d * r;
          const y = cy - Math.sin(latR) * r;
          if (!started) { ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'hsla(38, 80%, 50%, 0.04)';
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }

      // Continents
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
      ctx.clip();

      continents.forEach((continent) => {
        // Fill pass
        ctx.beginPath();
        let firstVisible = true;
        let hasVisible = false;
        continent.forEach(([lat, lon]) => {
          const [x, y, z] = project(lat, lon, cx, cy, r, rotation);
          if (z < -0.02) { firstVisible = true; return; }
          hasVisible = true;
          if (firstVisible) { ctx.moveTo(x, y); firstVisible = false; }
          else ctx.lineTo(x, y);
        });
        if (hasVisible) {
          ctx.fillStyle = 'hsla(38, 80%, 55%, 0.03)';
          ctx.fill();
        }

        // Stroke pass
        ctx.beginPath();
        firstVisible = true;
        continent.forEach(([lat, lon]) => {
          const [x, y, z] = project(lat, lon, cx, cy, r, rotation);
          if (z < -0.02) { firstVisible = true; return; }
          if (firstVisible) { ctx.moveTo(x, y); firstVisible = false; }
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = 'hsla(38, 80%, 55%, 0.25)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      ctx.restore();

      // Small dots at select grid intersections
      for (let lon = 0; lon < 360; lon += 45) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        for (let lat = -60; lat <= 60; lat += 30) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < 0.1) continue;
          ctx.beginPath();
          ctx.arc(cx + x3d * r, cy - Math.sin(latR) * r, 1, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(38, 80%, 55%, ${0.1 + z3d * 0.2})`;
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

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SpinningGlobe;
