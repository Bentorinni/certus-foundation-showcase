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

    // Realistic continent outlines with many more points
    const continents: [number, number][][] = [
      // North America (much more detailed)
      [[72,-130],[71,-120],[70,-115],[68,-110],[66,-105],[65,-100],[64,-97],[62,-95],[60,-90],[58,-88],[56,-85],[54,-82],[52,-80],[50,-78],[48,-76],[46,-75],[44,-74],[42,-73],[40,-72],[38,-75],[36,-78],[34,-80],[33,-82],[32,-85],[30,-88],[28,-90],[26,-92],[25,-95],[24,-98],[25,-100],[26,-102],[28,-105],[30,-108],[32,-110],[30,-112],[28,-115],[26,-118],[25,-120],[28,-118],[30,-115],[32,-112],[34,-110],[32,-108],[30,-105],[28,-102],[27,-100],[26,-98],[25,-96],[28,-94],[30,-90],[32,-88],[30,-86],[28,-84],[26,-82],[25,-80],[28,-78],[32,-76],[35,-75],[38,-74],[40,-72],[38,-70],[36,-68],[38,-66],[40,-64],[42,-62],[44,-60],[46,-58],[48,-56],[50,-55],[52,-54],[54,-56],[56,-58],[58,-60],[60,-62],[62,-64],[64,-66],[66,-68],[68,-72],[70,-78],[72,-85],[74,-92],[75,-100],[74,-108],[72,-115],[70,-120],[72,-130]],
      // South America (much bigger and more detailed)
      [[12,-70],[10,-68],[8,-65],[6,-62],[4,-60],[2,-58],[0,-55],[-2,-52],[-4,-50],[-6,-48],[-8,-46],[-10,-44],[-12,-42],[-14,-40],[-16,-38],[-18,-36],[-20,-38],[-22,-40],[-24,-42],[-26,-44],[-28,-46],[-30,-48],[-32,-50],[-34,-52],[-36,-54],[-38,-58],[-40,-62],[-42,-64],[-44,-66],[-46,-68],[-48,-70],[-50,-72],[-52,-74],[-54,-72],[-56,-70],[-56,-68],[-55,-65],[-54,-62],[-52,-60],[-50,-58],[-48,-56],[-46,-54],[-44,-52],[-42,-50],[-40,-48],[-38,-46],[-36,-44],[-34,-42],[-32,-40],[-30,-42],[-28,-44],[-26,-46],[-24,-48],[-22,-50],[-20,-48],[-18,-46],[-16,-44],[-14,-42],[-12,-40],[-10,-38],[-8,-36],[-6,-35],[-4,-38],[-2,-42],[0,-46],[2,-50],[4,-54],[6,-58],[8,-62],[10,-66],[12,-70]],
      // Africa (bigger)
      [[37,-10],[36,-5],[35,0],[34,5],[33,10],[31,12],[29,10],[27,8],[25,10],[23,12],[21,14],[19,12],[17,10],[15,8],[13,6],[11,5],[9,6],[7,8],[5,10],[3,12],[1,14],[-1,16],[-3,18],[-5,20],[-7,22],[-9,24],[-11,26],[-13,28],[-15,30],[-17,32],[-19,34],[-21,36],[-23,38],[-25,40],[-27,38],[-29,36],[-31,34],[-33,32],[-35,28],[-34,24],[-33,20],[-31,16],[-29,14],[-27,16],[-25,18],[-23,20],[-21,24],[-19,28],[-17,32],[-15,34],[-13,36],[-11,38],[-9,40],[-7,40],[-5,38],[-3,36],[-1,34],[1,32],[3,30],[5,28],[7,30],[9,32],[11,34],[13,36],[15,38],[17,40],[19,42],[21,42],[23,40],[25,38],[27,36],[29,34],[31,30],[33,24],[34,18],[35,12],[36,5],[37,0],[37,-10]],
      // Europe (detailed)
      [[36,-10],[37,-5],[38,0],[39,2],[40,0],[41,2],[42,4],[43,6],[44,8],[45,6],[46,4],[47,6],[48,8],[49,10],[50,12],[51,14],[52,12],[53,10],[54,8],[55,10],[56,12],[57,14],[58,16],[59,18],[60,20],[61,22],[62,24],[63,26],[65,28],[67,30],[69,32],[70,30],[68,35],[66,38],[64,40],[62,42],[60,40],[58,36],[56,32],[54,28],[52,24],[50,20],[48,16],[46,12],[44,10],[42,8],[40,6],[38,4],[37,0],[36,-5],[36,-10]],
      // Asia (detailed)
      [[42,30],[44,34],[46,38],[48,42],[50,46],[52,50],[54,56],[56,60],[58,65],[60,70],[62,76],[63,82],[64,90],[63,98],[62,105],[60,112],[58,118],[56,122],[54,126],[52,130],[50,134],[48,136],[46,138],[44,140],[42,142],[40,138],[38,134],[36,130],[34,126],[32,122],[30,118],[28,112],[26,108],[24,102],[22,96],[20,90],[18,85],[16,80],[14,76],[12,72],[10,68],[8,65],[10,60],[14,55],[18,50],[22,46],[26,42],[30,38],[34,35],[38,32],[42,30]],
      // Australia
      [[-12,130],[-14,126],[-16,122],[-18,118],[-20,116],[-22,114],[-24,114],[-26,116],[-28,118],[-30,120],[-32,122],[-34,126],[-36,130],[-38,134],[-38,138],[-37,142],[-36,146],[-34,150],[-32,152],[-30,154],[-28,154],[-26,152],[-24,150],[-22,148],[-20,146],[-18,142],[-16,138],[-14,134],[-12,130]],
      // Greenland
      [[60,-48],[62,-44],[64,-40],[66,-36],[68,-32],[70,-28],[72,-24],[74,-22],[76,-24],[78,-28],[80,-34],[82,-40],[82,-46],[80,-52],[78,-56],[76,-58],[74,-56],[72,-52],[70,-50],[68,-48],[66,-48],[64,-48],[62,-48],[60,-48]],
      // UK/Ireland
      [[50,-8],[51,-6],[52,-4],[53,-2],[54,0],[55,0],[56,-2],[57,-4],[58,-6],[58,-8],[57,-6],[56,-4],[55,-2],[54,-4],[53,-6],[52,-6],[51,-8],[50,-8]],
      // Japan
      [[30,130],[32,132],[34,134],[36,136],[38,138],[40,140],[42,142],[44,144],[42,146],[40,146],[38,144],[36,142],[34,140],[32,138],[30,136],[30,132],[30,130]],
      // Indonesia/Malaysia
      [[-2,100],[-4,102],[-6,106],[-8,110],[-6,114],[-4,116],[-2,118],[0,116],[2,112],[0,108],[-2,104],[-2,100]],
      // New Zealand
      [[-34,172],[-36,174],[-38,176],[-40,178],[-42,176],[-44,172],[-46,168],[-44,166],[-42,168],[-40,170],[-38,172],[-36,174],[-34,172]],
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
      const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.25);
      glow.addColorStop(0, 'hsla(38, 70%, 50%, 0.06)');
      glow.addColorStop(0.6, 'hsla(38, 70%, 50%, 0.02)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Globe circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsla(38, 70%, 50%, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner gradient
      const innerGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      innerGrad.addColorStop(0, 'hsla(38, 70%, 55%, 0.04)');
      innerGrad.addColorStop(1, 'hsla(38, 70%, 55%, 0.005)');
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
        ctx.strokeStyle = `hsla(38, 70%, 50%, ${lat === 0 ? 0.08 : 0.035})`;
        ctx.lineWidth = 0.25;
        ctx.stroke();
      }

      // Longitude lines
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
        ctx.strokeStyle = 'hsla(38, 70%, 50%, 0.035)';
        ctx.lineWidth = 0.25;
        ctx.stroke();
      }

      // Continents - clipped to globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
      ctx.clip();

      continents.forEach((continent) => {
        // Stroke
        ctx.beginPath();
        let started = false;
        let hasVisible = false;
        continent.forEach(([lat, lon]) => {
          const [x, y, z] = project(lat, lon, cx, cy, r, rotation);
          if (z < -0.02) { started = false; return; }
          hasVisible = true;
          if (!started) { ctx.moveTo(x, y); started = false; ctx.moveTo(x, y); started = true; }
          else ctx.lineTo(x, y);
        });
        if (hasVisible) {
          ctx.fillStyle = 'hsla(38, 70%, 50%, 0.04)';
          ctx.fill();
          ctx.strokeStyle = 'hsla(38, 70%, 50%, 0.3)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      ctx.restore();

      // Grid dots
      for (let lon = 0; lon < 360; lon += 45) {
        const lonR = ((lon + rotation) * Math.PI) / 180;
        for (let lat = -60; lat <= 60; lat += 30) {
          const latR = (lat * Math.PI) / 180;
          const x3d = Math.cos(latR) * Math.sin(lonR);
          const z3d = Math.cos(latR) * Math.cos(lonR);
          if (z3d < 0.1) continue;
          ctx.beginPath();
          ctx.arc(cx + x3d * r, cy - Math.sin(latR) * r, 1, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(38, 70%, 55%, ${0.1 + z3d * 0.2})`;
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
