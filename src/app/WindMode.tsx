'use client';

import { useEffect, useRef, useState } from 'react';

type WindPoint = {
  lat: number;
  lon: number;
  speedMph: number;
  directionDegrees: number;
};

type WindPayload = {
  source: string;
  attribution: string;
  fetchedAt: string;
  points: WindPoint[];
};

type Particle = {
  x: number;
  y: number;
  age: number;
  maxAge: number;
};

const EXTENT = {
  minLon: -146,
  maxLon: -106,
  minLat: 25,
  maxLat: 54,
};

const COAST = [
  [-132, 54],
  [-129, 52],
  [-126.8, 50.2],
  [-125.2, 49.1],
  [-124.5, 47.2],
  [-124.1, 45.4],
  [-124.4, 43.6],
  [-123.1, 41.9],
  [-124.0, 40.6],
  [-123.1, 39.2],
  [-122.4, 37.8],
  [-121.4, 36.6],
  [-120.1, 35.5],
  [-118.7, 34.4],
  [-117.2, 32.8],
  [-115.8, 31.6],
  [-113.7, 30.2],
  [-111.8, 28.7],
];

const LAND_POLYGON = [
  [-106, 54],
  [-132, 54],
  ...COAST,
  [-106, 25],
];

const SAMPLE_FALLBACK: WindPoint[] = [
  { lat: 52, lon: -136, speedMph: 17, directionDegrees: 260 },
  { lat: 48, lon: -122, speedMph: 12, directionDegrees: 285 },
  { lat: 43, lon: -130, speedMph: 24, directionDegrees: 250 },
  { lat: 39, lon: -124, speedMph: 19, directionDegrees: 275 },
  { lat: 34, lon: -128, speedMph: 14, directionDegrees: 240 },
  { lat: 30, lon: -121, speedMph: 10, directionDegrees: 300 },
];

function project(lon: number, lat: number, width: number, height: number) {
  const x = ((lon - EXTENT.minLon) / (EXTENT.maxLon - EXTENT.minLon)) * width;
  const y = ((EXTENT.maxLat - lat) / (EXTENT.maxLat - EXTENT.minLat)) * height;
  return { x, y };
}

function unproject(x: number, y: number, width: number, height: number) {
  const lon = EXTENT.minLon + (x / width) * (EXTENT.maxLon - EXTENT.minLon);
  const lat = EXTENT.maxLat - (y / height) * (EXTENT.maxLat - EXTENT.minLat);
  return { lon, lat };
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  points: number[][],
  width: number,
  height: number,
) {
  points.forEach(([lon, lat], index) => {
    const point = project(lon, lat, width, height);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
}

function drawBaseMap(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#020711');
  gradient.addColorStop(0.45, '#071625');
  gradient.addColorStop(1, '#05070c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = 'rgba(122, 161, 186, 0.18)';
  ctx.lineWidth = 1;

  for (let lon = -145; lon <= -110; lon += 5) {
    const a = project(lon, EXTENT.minLat, width, height);
    const b = project(lon, EXTENT.maxLat, width, height);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  for (let lat = 30; lat <= 50; lat += 5) {
    const a = project(EXTENT.minLon, lat, width, height);
    const b = project(EXTENT.maxLon, lat, width, height);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  drawPath(ctx, LAND_POLYGON, width, height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(232, 238, 228, 0.07)';
  ctx.fill();

  ctx.beginPath();
  drawPath(ctx, COAST, width, height);
  ctx.strokeStyle = 'rgba(173, 214, 232, 0.38)';
  ctx.lineWidth = 1.3;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(236, 248, 255, 0.22)';
  ctx.font = `${Math.max(11, width / 120)}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillText('Pacific wind field', width * 0.07, height * 0.17);
  ctx.fillText('Western North America', width * 0.62, height * 0.28);
  ctx.restore();
}

function nearestWind(points: WindPoint[], lon: number, lat: number) {
  let weightedX = 0;
  let weightedY = 0;
  let totalWeight = 0;

  points.forEach((point) => {
    const dx = lon - point.lon;
    const dy = lat - point.lat;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const weight = 1 / Math.max(0.8, distance * distance);
    const radians = (point.directionDegrees * Math.PI) / 180;
    const speed = Math.max(2, point.speedMph);

    weightedX += -Math.sin(radians) * speed * weight;
    weightedY += Math.cos(radians) * speed * weight;
    totalWeight += weight;
  });

  return {
    x: weightedX / totalWeight,
    y: weightedY / totalWeight,
  };
}

function resetParticle(particle: Particle, width: number, height: number) {
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.age = 0;
  particle.maxAge = 80 + Math.floor(Math.random() * 90);
}

function drawStaticWind(
  ctx: CanvasRenderingContext2D,
  points: WindPoint[],
  width: number,
  height: number,
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(143, 211, 255, 0.52)';
  ctx.fillStyle = 'rgba(143, 211, 255, 0.65)';
  ctx.lineWidth = 1.4;

  points.forEach((point) => {
    const start = project(point.lon, point.lat, width, height);
    const radians = (point.directionDegrees * Math.PI) / 180;
    const length = 12 + Math.min(26, point.speedMph);
    const dx = -Math.sin(radians) * length;
    const dy = Math.cos(radians) * length;

    ctx.beginPath();
    ctx.moveTo(start.x - dx * 0.5, start.y - dy * 0.5);
    ctx.lineTo(start.x + dx * 0.5, start.y + dy * 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(start.x + dx * 0.5, start.y + dy * 0.5, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    const timer = window.setTimeout(update, 0);
    const listener = () => setReduced(query.matches);

    query.addEventListener('change', listener);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener('change', listener);
    };
  }, []);

  return reduced;
}

function WindCanvas({ points }: { points: WindPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawBaseMap(context, width, height);

      const count = Math.min(190, Math.max(90, Math.floor((width * height) / 9000)));
      particlesRef.current = Array.from({ length: count }, () => {
        const particle = { x: 0, y: 0, age: 0, maxAge: 120 };
        resetParticle(particle, width, height);
        return particle;
      });
    };

    const animate = () => {
      if (reducedMotion) {
        drawBaseMap(context, width, height);
        drawStaticWind(context, points, width, height);
        return;
      }

      frame += 1;
      if (frame % 180 === 1) {
        drawBaseMap(context, width, height);
      }

      context.fillStyle = 'rgba(2, 7, 17, 0.055)';
      context.fillRect(0, 0, width, height);

      context.lineWidth = 1;
      context.strokeStyle = 'rgba(142, 210, 255, 0.46)';

      particlesRef.current.forEach((particle) => {
        const previousX = particle.x;
        const previousY = particle.y;
        const location = unproject(particle.x, particle.y, width, height);
        const wind = nearestWind(points, location.lon, location.lat);
        const factor = 0.23;

        particle.x += wind.x * factor;
        particle.y += wind.y * factor;
        particle.age += 1;

        if (
          particle.age > particle.maxAge ||
          particle.x < -20 ||
          particle.x > width + 20 ||
          particle.y < -20 ||
          particle.y > height + 20
        ) {
          resetParticle(particle, width, height);
          return;
        }

        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      });

      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [points, reducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default function WindMode() {
  const [enabled, setEnabled] = useState(false);
  const [loadedPreference, setLoadedPreference] = useState(false);
  const [payload, setPayload] = useState<WindPayload | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const requested = new URLSearchParams(window.location.search).get('wind');
      const saved = window.localStorage.getItem('taborlin-wind-mode');
      setEnabled(requested === '1' || requested === 'true' || saved === 'true');
      setLoadedPreference(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadedPreference) return;

    window.localStorage.setItem('taborlin-wind-mode', String(enabled));

    if (!enabled || payload) return;

    let cancelled = false;
    fetch('/api/wind')
      .then((response) => response.json() as Promise<WindPayload>)
      .then((data) => {
        if (!cancelled) {
          setPayload(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPayload({
            source: 'fallback',
            attribution: 'Wind field fallback while Open-Meteo is unavailable',
            fetchedAt: new Date().toISOString(),
            points: SAMPLE_FALLBACK,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, loadedPreference, payload]);

  const points = payload?.points.length ? payload.points : SAMPLE_FALLBACK;
  const attribution =
    payload?.source === 'Open-Meteo'
      ? 'Wind data: Open-Meteo'
      : 'Wind mode preview';

  return (
    <>
      {enabled ? (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020711]">
          <WindCanvas points={points} />
          <div className="absolute inset-0 bg-[#05060b]/70" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(49,133,184,0.24),transparent_32%),radial-gradient(circle_at_68%_42%,rgba(8,27,42,0.64),transparent_38%)]"
            aria-hidden="true"
          />
          <p className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.18em] text-[#d6edf8]/35">
            {payload?.source === 'Open-Meteo' ? (
              <>
                Wind data:{' '}
                <a href="https://open-meteo.com/" target="_blank" rel="noopener" className="underline-offset-2 hover:underline">
                  Open-Meteo
                </a>
              </>
            ) : (
              attribution
            )}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        aria-pressed={enabled}
        aria-label={enabled ? 'Disable Wind Mode' : 'Enable Wind Mode'}
        title="Name the wind"
        onClick={() => setEnabled((value) => !value)}
        className={`fixed right-4 top-[4.25rem] z-[60] rounded-md border px-3 py-2 text-xs font-semibold tracking-[0.08em] backdrop-blur-md transition-colors sm:top-3 ${
          enabled
            ? 'border-sky-300/45 bg-sky-300/12 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.22)]'
            : 'border-[#2a2a35] bg-[#06060B]/72 text-[#a1a1aa] hover:border-[#3a3a45] hover:text-[#fafafa]'
        }`}
      >
        Wind
      </button>
    </>
  );
}
